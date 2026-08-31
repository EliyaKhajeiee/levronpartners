import { randomUUID } from "crypto";
import { decodeSubmission, encodeSubmission } from "./token";
import type { AssessmentSubmission } from "./types";

/**
 * Storage for assessment submissions, kept behind one small interface so
 * swapping the backing store is a one-file change.
 *
 * **Placeholder, not a real database.** There's no Supabase project wired up
 * for Levron Partners yet, so `TokenAssessmentStore` below "stores" a
 * submission by encoding it into its own id (see `token.ts`) rather than
 * writing it anywhere — every API route can decode that id on its own, with
 * no shared server-side state required. The one real cost: nothing here
 * survives longer than a single browser tab's session. There's no way to
 * discover "everyone who completed the assessment three days ago and never
 * booked" without a database that can be queried later — so `listAll()`
 * always returns empty, and the day-3 follow-up cron is a harmless no-op
 * until a real store replaces this one.
 *
 * To wire up real persistence once a Supabase project exists:
 * 1. Create a table (roughly): `id uuid pk, track text, answers jsonb,
 *    scores jsonb, leakage jsonb, status text, contact jsonb,
 *    requested_datetime timestamptz, requested_timezone text,
 *    requested_note text, skipped_session bool, initial_email_sent_at
 *    timestamptz, initial_email_variant text, results_viewed_at
 *    timestamptz, followup_email_sent_at timestamptz, created_at
 *    timestamptz, updated_at timestamptz`.
 * 2. Enable RLS with no public `select`; add an RPC
 *    `get_assessment_submission_by_id(uuid)` for the results/print pages
 *    to read through, and do all writes from API routes with the service
 *    role key (bypasses RLS).
 * 3. Implement a `SupabaseAssessmentStore` against the same
 *    `AssessmentStore` interface below (real row ids, `update()` keeps the
 *    same id instead of minting a new one) and swap it in inside
 *    `getStore()`. Nothing else in this codebase needs to change.
 */
export interface AssessmentStore {
  create(input: Pick<AssessmentSubmission, "track" | "answers">): Promise<AssessmentSubmission>;
  get(id: string): Promise<AssessmentSubmission | null>;
  update(id: string, patch: Partial<AssessmentSubmission>): Promise<AssessmentSubmission | null>;
  listAll(): Promise<AssessmentSubmission[]>;
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
  if (!instance) instance = new TokenAssessmentStore();
  return instance;
}
