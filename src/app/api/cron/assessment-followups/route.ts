import { NextResponse } from "next/server";
import { getStore } from "@/lib/assessment/store";
import { sendFollowUpEmail, sendInitialUnbookedEmail } from "@/lib/assessment/emails";

export const runtime = "nodejs";

/** Nothing created before this ever gets swept — keeps a first deploy from mass-emailing test data. */
const SEQUENCE_LIVE_AT = new Date("2026-08-30T00:00:00Z").getTime();

const SAFETY_NET_AFTER_MS = 20 * 60 * 1000; // 20 minutes past completion, no email sent yet
const FOLLOW_UP_AFTER_MS = 3 * 24 * 60 * 60 * 1000; // 3 days past the initial email

/**
 * Daily sweep with two jobs:
 * 1. Safety net — catches completed submissions where the client never sent
 *    an idle-timeout or skip signal (tab closed before the 15-minute timer
 *    fired). Sends the unbooked variant.
 * 2. Day-3 follow-up — for people who got an initial email (either variant)
 *    but never opened the results and never booked.
 *
 * Both are currently a no-op: `getStore().listAll()` returns `[]` until a
 * real database backs the store (see store.ts) — there's nothing durable
 * this route could discover "three days later." Left wired up so turning
 * it on is just swapping the store, not writing this route.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const store = getStore();
  const submissions = await store.listAll();
  const now = Date.now();

  let safetyNetSent = 0;
  let followUpsSent = 0;

  for (const submission of submissions) {
    const createdAt = new Date(submission.createdAt).getTime();
    if (createdAt < SEQUENCE_LIVE_AT) continue;
    if (!submission.contact) continue;

    if (
      submission.status === "completed" &&
      !submission.initialEmailSentAt &&
      now - new Date(submission.updatedAt).getTime() > SAFETY_NET_AFTER_MS
    ) {
      await sendInitialUnbookedEmail(submission);
      await store.update(submission.id, {
        initialEmailSentAt: new Date().toISOString(),
        initialEmailVariant: "unbooked",
      });
      safetyNetSent++;
      continue;
    }

    if (
      submission.initialEmailSentAt &&
      !submission.followupEmailSentAt &&
      !submission.resultsViewedAt &&
      now - new Date(submission.initialEmailSentAt).getTime() > FOLLOW_UP_AFTER_MS
    ) {
      await sendFollowUpEmail(submission);
      await store.update(submission.id, { followupEmailSentAt: new Date().toISOString() });
      followUpsSent++;
    }
  }

  return NextResponse.json({ ok: true, safetyNetSent, followUpsSent });
}
