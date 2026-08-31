import { Resend } from "resend";
import { site } from "@/lib/site";
import type { AssessmentSubmission } from "./types";
import { TRACK_LABELS } from "./questions";
import { tensionLine } from "./tension";

const FROM = `${site.name} website <onboarding@resend.dev>`;

function resultsUrl(id: string): string {
  return `${site.url}/assessment/results/${id}`;
}

function resend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[assessment/emails] RESEND_API_KEY is not set — email not sent.");
    return null;
  }
  return new Resend(apiKey);
}

function formatSessionTime(iso: string, timezone?: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
    timeZoneName: "short",
  });
}

/** Fires once, right after the email gate — sales-facing, not the lead's own inbox. */
export async function sendInternalLeadNotification(submission: AssessmentSubmission): Promise<void> {
  const client = resend();
  if (!client) return;
  const contact = submission.contact;
  if (!contact) return;

  const trackLabel = submission.track ? TRACK_LABELS[submission.track] : "Unknown";
  const score = submission.scores?.adjustedTotal ?? "—";

  const { error } = await client.emails.send({
    from: FROM,
    to: [...site.notifyEmails],
    subject: `New assessment: ${contact.company ?? contact.email} (score ${score})`,
    text: [
      `${contact.firstName} ${contact.lastName} — ${contact.email}${contact.phone ? ` — ${contact.phone}` : ""}`,
      contact.company ? `Company: ${contact.company}` : null,
      `Track: ${trackLabel}`,
      `Score: ${score} (${submission.scores?.maturityLabel ?? "—"})`,
      `Estimated leakage: $${submission.leakage?.annualTotal.toLocaleString("en-US") ?? "—"}/yr`,
      `Results: ${resultsUrl(submission.id)}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
  if (error) console.error("[assessment/emails] internal notify failed:", error);
}

/** Sent the moment someone books a session. Never sent alongside the unbooked variant. */
export async function sendInitialBookedEmail(submission: AssessmentSubmission): Promise<void> {
  const client = resend();
  if (!client || !submission.contact) return;

  const sessionLine = submission.requestedDatetime
    ? formatSessionTime(submission.requestedDatetime, submission.requestedTimezone)
    : "the time you picked";

  const { error } = await client.emails.send({
    from: FROM,
    to: submission.contact.email,
    subject: "You're booked — here's what to bring",
    text: `Hi ${submission.contact.firstName},

You're on the calendar for ${sessionLine}.

Your results are ready now, if you want a look before we talk: ${resultsUrl(submission.id)}

What to bring: your last ten bids or quotes and a normal week off the schedule — not a good one. That's what we'll actually work from.

See you then,
${site.name}`,
  });
  if (error) console.error("[assessment/emails] booked email failed:", error);

  const { error: teamError } = await client.emails.send({
    from: FROM,
    to: [...site.notifyEmails],
    subject: `Session booked: ${submission.contact.company ?? submission.contact.email}`,
    text: `${submission.contact.firstName} ${submission.contact.lastName} (${submission.contact.email}) booked ${sessionLine}.\n\nResults: ${resultsUrl(submission.id)}`,
  });
  if (teamError) console.error("[assessment/emails] team booking notify failed:", teamError);
}

/** Sent when someone skips the scheduler, goes idle on it, or the safety-net cron catches a silent tab close. */
export async function sendInitialUnbookedEmail(submission: AssessmentSubmission): Promise<void> {
  const client = resend();
  if (!client || !submission.contact) return;

  const { error } = await client.emails.send({
    from: FROM,
    to: submission.contact.email,
    subject: "Your Action Plan is ready",
    text: `Hi ${submission.contact.firstName},

Your results are ready: ${resultsUrl(submission.id)}

If it's useful to talk it through, grab a free 45-minute session here: ${resultsUrl(submission.id)}#session

${site.name}`,
  });
  if (error) console.error("[assessment/emails] unbooked email failed:", error);
}

/** Day-3 safety net for people who saw the results link but never booked and never opened it. */
export async function sendFollowUpEmail(submission: AssessmentSubmission): Promise<void> {
  const client = resend();
  if (!client || !submission.contact || !submission.scores) return;

  const { error } = await client.emails.send({
    from: FROM,
    to: submission.contact.email,
    subject: "Still curious about that number?",
    text: `Hi ${submission.contact.firstName},

Following up on your assessment — most people we hear back from want to talk through ${tensionLine(submission.scores)}.

Your results are still here: ${resultsUrl(submission.id)}
Book a free session: ${resultsUrl(submission.id)}#session

${site.name}`,
  });
  if (error) console.error("[assessment/emails] follow-up email failed:", error);
}
