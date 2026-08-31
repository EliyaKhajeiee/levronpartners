import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import os from "os";
import type { AssessmentSubmission } from "./types";

/**
 * Storage for assessment submissions, kept behind one small interface so
 * swapping the backing store is a one-file change.
 *
 * **Placeholder, not production storage.** There's no database wired up
 * for Levron Partners yet — this writes a JSON file to disk, which works
 * for local dev but is *not* durable on a serverless deploy (Vercel's
 * filesystem outside `/tmp` is read-only, and `/tmp` doesn't survive
 * between invocations or across instances).
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
 *    `AssessmentStore` interface below and swap it in inside `getStore()`.
 *    Nothing else in this codebase needs to change.
 */
export interface AssessmentStore {
  create(input: Pick<AssessmentSubmission, "track" | "answers">): Promise<AssessmentSubmission>;
  get(id: string): Promise<AssessmentSubmission | null>;
  update(id: string, patch: Partial<AssessmentSubmission>): Promise<AssessmentSubmission | null>;
  listAll(): Promise<AssessmentSubmission[]>;
}

function storeFilePath(): string {
  if (process.env.ASSESSMENT_STORE_FILE) return process.env.ASSESSMENT_STORE_FILE;
  // Local dev: keep it in the repo (gitignored) so it survives restarts.
  // Any serverless deploy (Vercel sets VERCEL=1): fall back to /tmp. This
  // is still not durable across invocations — it's here so the funnel
  // doesn't hard-crash before the real store is wired up.
  if (!process.env.VERCEL) {
    return path.join(/* turbopackIgnore: true */ process.cwd(), ".data", "assessments.json");
  }
  return path.join(os.tmpdir(), "levron-partners-assessments.json");
}

class FileAssessmentStore implements AssessmentStore {
  private async readAll(): Promise<AssessmentSubmission[]> {
    try {
      const raw = await readFile(storeFilePath(), "utf-8");
      return JSON.parse(raw) as AssessmentSubmission[];
    } catch {
      return [];
    }
  }

  private async writeAll(rows: AssessmentSubmission[]): Promise<void> {
    const file = storeFilePath();
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(rows, null, 2), "utf-8");
  }

  async create(input: Pick<AssessmentSubmission, "track" | "answers">): Promise<AssessmentSubmission> {
    const now = new Date().toISOString();
    const row: AssessmentSubmission = {
      id: randomUUID(),
      track: input.track,
      answers: input.answers,
      status: "started",
      createdAt: now,
      updatedAt: now,
    };
    const rows = await this.readAll();
    rows.push(row);
    await this.writeAll(rows);
    return row;
  }

  async get(id: string): Promise<AssessmentSubmission | null> {
    const rows = await this.readAll();
    return rows.find((r) => r.id === id) ?? null;
  }

  async update(id: string, patch: Partial<AssessmentSubmission>): Promise<AssessmentSubmission | null> {
    const rows = await this.readAll();
    const index = rows.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const merged: AssessmentSubmission = {
      ...rows[index],
      ...patch,
      answers: { ...rows[index].answers, ...(patch.answers ?? {}) },
      updatedAt: new Date().toISOString(),
    };
    rows[index] = merged;
    await this.writeAll(rows);
    return merged;
  }

  async listAll(): Promise<AssessmentSubmission[]> {
    return this.readAll();
  }
}

let instance: AssessmentStore | null = null;

export function getStore(): AssessmentStore {
  if (!instance) instance = new FileAssessmentStore();
  return instance;
}
