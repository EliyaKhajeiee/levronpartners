import { randomUUID } from "crypto";
import { decodeSubmission, encodeSubmission } from "./token";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { AssessmentSubmission } from "./types";

/**
 * Storage for assessment submissions, kept behind one small interface so
 * swapping the backing store is a one-file change.
 *
 * **`SupabaseAssessmentStore` is the real store**, backed by the
 * `assessment_submissions` table (migration in this repo's history — see the
 * `git log` for this file around the Supabase wiring commit if it needs
 * re-running). RLS is on with no policies, so the only way in is the secret
 * key `getSupabaseServerClient()` holds, from API routes and server
 * components only — never from the browser.
 *
 * `TokenAssessmentStore` is the fallback used when Supabase isn't
 * configured: it "stores" a submission by encoding it into its own id (see
 * `token.ts`) instead of writing it anywhere, so every API route can decode
 * that id on its own with no shared server-side state required. The cost:
 * nothing survives longer than a single browser tab's session, and
 * `listAll()` always returns empty — the day-3 follow-up cron is a harmless
 * no-op on this path. Kept as the fallback (rather than deleted) so a
 * missing or misconfigured Supabase project degrades the funnel instead of
 * 500ing it.
 */
export interface AssessmentStore {
  create(input: Pick<AssessmentSubmission, "track" | "answers">): Promise<AssessmentSubmission>;
  get(id: string): Promise<AssessmentSubmission | null>;
  update(id: string, patch: Partial<AssessmentSubmission>): Promise<AssessmentSubmission | null>;
  listAll(): Promise<AssessmentSubmission[]>;
}

/** snake_case DB row -> camelCase AssessmentSubmission. */
function fromRow(row: Record<string, unknown>): AssessmentSubmission {
  return {
    id: row.id as string,
    track: (row.track as AssessmentSubmission["track"]) ?? undefined,
    answers: (row.answers as Record<string, string>) ?? {},
    scores: (row.scores as AssessmentSubmission["scores"]) ?? undefined,
    leakage: (row.leakage as AssessmentSubmission["leakage"]) ?? undefined,
    status: row.status as AssessmentSubmission["status"],
    contact: (row.contact as AssessmentSubmission["contact"]) ?? undefined,
    requestedDatetime: (row.requested_datetime as string) ?? undefined,
    requestedTimezone: (row.requested_timezone as string) ?? undefined,
    requestedNote: (row.requested_note as string) ?? undefined,
    skippedSession: (row.skipped_session as boolean) ?? undefined,
    initialEmailSentAt: (row.initial_email_sent_at as string) ?? undefined,
    initialEmailVariant: (row.initial_email_variant as AssessmentSubmission["initialEmailVariant"]) ?? undefined,
    resultsViewedAt: (row.results_viewed_at as string) ?? undefined,
    followupEmailSentAt: (row.followup_email_sent_at as string) ?? undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

/** camelCase patch -> snake_case columns, undefined keys omitted so a partial update doesn't null out untouched columns. */
function toRow(patch: Partial<AssessmentSubmission>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (patch.track !== undefined) row.track = patch.track;
  if (patch.answers !== undefined) row.answers = patch.answers;
  if (patch.scores !== undefined) row.scores = patch.scores;
  if (patch.leakage !== undefined) row.leakage = patch.leakage;
  if (patch.status !== undefined) row.status = patch.status;
  if (patch.contact !== undefined) row.contact = patch.contact;
  if (patch.requestedDatetime !== undefined) row.requested_datetime = patch.requestedDatetime;
  if (patch.requestedTimezone !== undefined) row.requested_timezone = patch.requestedTimezone;
  if (patch.requestedNote !== undefined) row.requested_note = patch.requestedNote;
  if (patch.skippedSession !== undefined) row.skipped_session = patch.skippedSession;
  if (patch.initialEmailSentAt !== undefined) row.initial_email_sent_at = patch.initialEmailSentAt;
  if (patch.initialEmailVariant !== undefined) row.initial_email_variant = patch.initialEmailVariant;
  if (patch.resultsViewedAt !== undefined) row.results_viewed_at = patch.resultsViewedAt;
  if (patch.followupEmailSentAt !== undefined) row.followup_email_sent_at = patch.followupEmailSentAt;
  return row;
}

class SupabaseAssessmentStore implements AssessmentStore {
  async create(input: Pick<AssessmentSubmission, "track" | "answers">): Promise<AssessmentSubmission> {
    const supabase = getSupabaseServerClient()!;
    const { data, error } = await supabase
      .from("assessment_submissions")
      .insert({ track: input.track, answers: input.answers, status: "started" })
      .select()
      .single();
    if (error) throw new Error(`[assessment/store] create failed: ${error.message}`);
    return fromRow(data);
  }

  async get(id: string): Promise<AssessmentSubmission | null> {
    const supabase = getSupabaseServerClient()!;
    const { data, error } = await supabase
      .from("assessment_submissions")
      .select()
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(`[assessment/store] get failed: ${error.message}`);
    return data ? fromRow(data) : null;
  }

  async update(id: string, patch: Partial<AssessmentSubmission>): Promise<AssessmentSubmission | null> {
    const supabase = getSupabaseServerClient()!;
    // `answers` merges with the existing row rather than replacing it (Q3–Q8
    // save one answer at a time) — same semantics the token store has
    // always had, so callers didn't need to change when this store did.
    let row = toRow(patch);
    if (patch.answers !== undefined) {
      const existing = await this.get(id);
      if (!existing) return null;
      row = { ...row, answers: { ...existing.answers, ...patch.answers } };
    }

    const { data, error } = await supabase
      .from("assessment_submissions")
      .update({ ...row, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) throw new Error(`[assessment/store] update failed: ${error.message}`);
    return data ? fromRow(data) : null;
  }

  async listAll(): Promise<AssessmentSubmission[]> {
    const supabase = getSupabaseServerClient()!;
    const { data, error } = await supabase.from("assessment_submissions").select();
    if (error) throw new Error(`[assessment/store] listAll failed: ${error.message}`);
    return (data ?? []).map(fromRow);
  }
}

/**
 * `update()` returns a submission whose `id` is a *new* token reflecting the
 * post-patch state — the old id still decodes, but to the pre-patch
 * snapshot. Callers must carry forward whatever id came back on the last
 * response (the API routes and client below all do this); reusing a stale
 * id silently discards whatever changed since it was minted.
 */
class TokenAssessmentStore implements AssessmentStore {
  async create(input: Pick<AssessmentSubmission, "track" | "answers">): Promise<AssessmentSubmission> {
    const now = new Date().toISOString();
    const row: AssessmentSubmission = {
      id: randomUUID(), // placeholder; overwritten with the real token below
      track: input.track,
      answers: input.answers,
      status: "started",
      createdAt: now,
      updatedAt: now,
    };
    return { ...row, id: encodeSubmission(row) };
  }

  async get(id: string): Promise<AssessmentSubmission | null> {
    const decoded = decodeSubmission(id);
    if (!decoded) return null;
    return { ...decoded, id };
  }

  async update(id: string, patch: Partial<AssessmentSubmission>): Promise<AssessmentSubmission | null> {
    const existing = await this.get(id);
    if (!existing) return null;

    const merged: AssessmentSubmission = {
      ...existing,
      ...patch,
      answers: { ...existing.answers, ...(patch.answers ?? {}) },
      updatedAt: new Date().toISOString(),
    };
    return { ...merged, id: encodeSubmission(merged) };
  }

  async listAll(): Promise<AssessmentSubmission[]> {
    return [];
  }
}

let instance: AssessmentStore | null = null;

export function getStore(): AssessmentStore {
  if (!instance) {
    instance = getSupabaseServerClient() ? new SupabaseAssessmentStore() : new TokenAssessmentStore();
  }
  return instance;
}
