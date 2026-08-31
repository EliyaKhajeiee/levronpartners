import { NextResponse } from "next/server";
import { getStore } from "@/lib/assessment/store";
import { computeScores } from "@/lib/assessment/scoring";
import { computeLeakage } from "@/lib/assessment/leakage";
import {
  sendInitialBookedEmail,
  sendInitialUnbookedEmail,
  sendInternalLeadNotification,
} from "@/lib/assessment/emails";
import type { AssessmentContact, Track } from "@/lib/assessment/types";

export const runtime = "nodejs";

const VALID_TRACKS: Track[] = ["construction", "home_services"];

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const submission = await getStore().get(id);
  if (!submission) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json(submission);
}

function isValidContact(value: unknown): value is AssessmentContact {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  return (
    typeof c.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email) &&
    typeof c.firstName === "string" &&
    c.firstName.trim().length > 0 &&
    typeof c.lastName === "string" &&
    c.lastName.trim().length > 0
  );
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const store = getStore();
  const existing = await store.get(id);
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const patch = (body ?? {}) as Record<string, unknown>;

  // ── Finalize: email gate submitted, track is fully known, compute results ──
  if (patch.finalize) {
    const mergedAnswers = { ...existing.answers, ...((patch.answers as Record<string, string>) ?? {}) };
    const track = (mergedAnswers.industry as Track) ?? existing.track;

    if (!track || !VALID_TRACKS.includes(track)) {
      return NextResponse.json({ error: "Missing or invalid industry answer." }, { status: 400 });
    }
    if (!isValidContact(patch.contact)) {
      return NextResponse.json({ error: "A valid email, first name, and last name are required." }, { status: 400 });
    }

    const scores = computeScores(track, mergedAnswers);
    const leakage = computeLeakage(track, mergedAnswers);

    const updated = await store.update(id, {
      track,
      answers: mergedAnswers,
      scores,
      leakage,
      status: "completed",
      contact: patch.contact as AssessmentContact,
    });
    if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });

    await sendInternalLeadNotification(updated);
    return NextResponse.json(updated);
  }

  // ── Book a session ──
  if (typeof patch.requestedDatetime === "string") {
    const updated = await store.update(id, {
      requestedDatetime: patch.requestedDatetime,
      requestedTimezone: typeof patch.requestedTimezone === "string" ? patch.requestedTimezone : undefined,
      requestedNote: typeof patch.requestedNote === "string" ? patch.requestedNote : undefined,
    });
    if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });

    if (!updated.initialEmailSentAt) {
      await sendInitialBookedEmail(updated);
      await store.update(id, {
        initialEmailSentAt: new Date().toISOString(),
        initialEmailVariant: "booked",
      });
    }
    return NextResponse.json(await store.get(id));
  }

  // ── Skip the session (explicit skip link, or client-side idle timeout) ──
  if (patch.skippedSession === true) {
    const updated = await store.update(id, { skippedSession: true });
    if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });

    if (!updated.initialEmailSentAt) {
      await sendInitialUnbookedEmail(updated);
      await store.update(id, {
        initialEmailSentAt: new Date().toISOString(),
        initialEmailVariant: "unbooked",
      });
    }
    return NextResponse.json(await store.get(id));
  }

  // ── Plain progress save (Q3–Q8): merge answers, no recompute ──
  if (patch.answers && typeof patch.answers === "object") {
    const track = ((patch.answers as Record<string, string>).industry as Track) ?? existing.track;
    const updated = await store.update(id, {
      track: VALID_TRACKS.includes(track) ? track : existing.track,
      answers: patch.answers as Record<string, string>,
    });
    if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
}
