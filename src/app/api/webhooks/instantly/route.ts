import { createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/webhooks/instantly
 *
 * Receives Instantly.ai campaign events (reply received, lead interested,
 * meeting booked, bounces, etc.) and does two things independently, same
 * split as `/api/lead`: writes the raw event to `instantly_events` as the
 * durable copy, and — for events actually worth a human looking at —
 * emails `site.notifyEmails` as the "come look at this now" nudge. Either
 * one failing doesn't block the other.
 *
 * Auth: Instantly's outbound webhook has no built-in signing, so this
 * checks INSTANTLY_WEBHOOK_SECRET against (in order) the
 * `x-instantly-secret` header, `Authorization: Bearer <secret>`, or a
 * `?secret=` query param — set whichever Instantly's webhook UI supports.
 * With no secret configured, requests are allowed through outside
 * production only, so local testing doesn't need one.
 */

const NOISY_EVENTS = new Set([
  "email_sent",
  "email_opened",
  "link_clicked",
  "lead_neutral",
  "campaign_completed",
  "auto_reply_received",
]);

const LEAD_EVENTS = new Set(["reply_received", "lead_interested", "lead_meeting_booked"]);

type InstantlyPayload = Record<string, unknown>;

function secretsEqual(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.INSTANTLY_WEBHOOK_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";

  const headerSecret =
    request.headers.get("x-instantly-secret") ?? request.headers.get("x-webhook-secret");
  if (headerSecret && secretsEqual(headerSecret, secret)) return true;

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice("Bearer ".length).trim();
    if (token && secretsEqual(token, secret)) return true;
  }

  const querySecret = request.nextUrl.searchParams.get("secret");
  return Boolean(querySecret && secretsEqual(querySecret, secret));
}

function readString(body: InstantlyPayload, ...keys: string[]): string | null {
  for (const key of keys) {
    const value = body[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function readNumber(body: InstantlyPayload, key: string): number | null {
  const value = body[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return null;
}

function normalizeEventType(raw: string | null): string {
  if (!raw) return "unknown";
  return raw.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

function fingerprintFor(body: InstantlyPayload, eventType: string): string {
  const parts = [
    eventType,
    readString(body, "timestamp") ?? "",
    readString(body, "lead_email", "email", "leadEmail") ?? "",
    readString(body, "campaign_id", "campaignId") ?? "",
    readString(body, "email_id", "emailId") ?? "",
    readString(body, "reply_text", "reply_text_snippet", "replyText") ?? "",
  ].join("|");
  return createHash("sha256").update(parts).digest("hex");
}

function shouldNotify(eventType: string): boolean {
  return !NOISY_EVENTS.has(eventType) && eventType !== "unknown";
}

function shouldFlagAsLead(eventType: string): boolean {
  return (
    LEAD_EVENTS.has(eventType) ||
    eventType.includes("interested") ||
    eventType.includes("meeting_booked") ||
    eventType.includes("reply_received")
  );
}

function displayName(body: InstantlyPayload): string {
  const first = readString(body, "firstName", "first_name");
  const last = readString(body, "lastName", "last_name");
  return [first, last].filter(Boolean).join(" ").trim();
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: InstantlyPayload;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }
    body = parsed as InstantlyPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = normalizeEventType(readString(body, "event_type", "eventType", "type"));
  const leadEmail = readString(body, "lead_email", "email", "leadEmail");
  const campaignName = readString(body, "campaign_name", "campaignName");
  const campaignId = readString(body, "campaign_id", "campaignId");
  const workspace = readString(body, "workspace");
  const emailAccount = readString(body, "email_account", "emailAccount");
  const uniboxUrl = readString(body, "unibox_url", "uniboxUrl");
  const replySubject = readString(body, "reply_subject", "replySubject", "email_subject");
  const replyText = readString(
    body,
    "reply_text",
    "reply_text_snippet",
    "replyText",
    "email_text",
  );
  const occurredAtRaw = readString(body, "timestamp");
  const occurredAt =
    occurredAtRaw && !Number.isNaN(Date.parse(occurredAtRaw)) ? occurredAtRaw : null;
  const step = readNumber(body, "step");
  const fingerprint = fingerprintFor(body, eventType);
  const name = displayName(body);
  const company = readString(body, "companyName", "company_name", "company");

  let stored = false;
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("instantly_events").insert({
      event_type: eventType,
      occurred_at: occurredAt,
      workspace,
      campaign_id: campaignId,
      campaign_name: campaignName,
      lead_email: leadEmail,
      email_account: emailAccount,
      unibox_url: uniboxUrl,
      step,
      reply_subject: replySubject,
      reply_text: replyText,
      fingerprint,
      payload: body,
    });
    if (error) {
      // Unique violation on fingerprint = Instantly retried a delivery we
      // already recorded. Not an error worth logging or re-notifying about.
      if (error.code !== "23505") console.error("[instantly] Supabase insert failed:", error.message);
    } else {
      stored = true;
    }
  } else {
    console.error("[instantly] Supabase not configured — event not persisted.");
  }

  let emailed = false;
  if (shouldNotify(eventType)) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[instantly] RESEND_API_KEY is not set — notification not sent.");
    } else {
      const resend = new Resend(apiKey);
      const label = eventType.replace(/_/g, " ");
      const flagged = shouldFlagAsLead(eventType) ? "🔥 " : "";
      const lines = [
        `Lead: ${leadEmail ?? "—"}`,
        name && `Name: ${name}`,
        company && `Company: ${company}`,
        campaignName && `Campaign: ${campaignName}`,
        emailAccount && `Sending account: ${emailAccount}`,
        replySubject && `Subject: ${replySubject}`,
        replyText && `Reply:\n${replyText}`,
        uniboxUrl && `Unibox: ${uniboxUrl}`,
      ].filter(Boolean);

      const { error } = await resend.emails.send({
        from: `${site.name} <${site.email}>`,
        to: [...site.notifyEmails],
        subject: `${flagged}Instantly ${label} — ${leadEmail ?? "no email"}`,
        text: lines.join("\n"),
      });
      if (error) console.error("[instantly] Resend error:", error);
      else emailed = true;
    }
  }

  if (!stored && !emailed && shouldNotify(eventType)) {
    return NextResponse.json({ ok: false, error: "Failed to persist or notify." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, stored, notified: emailed });
}
