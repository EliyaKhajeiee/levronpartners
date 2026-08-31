import type { AssessmentSubmission } from "./types";

/**
 * Encodes a full submission into an opaque, URL-safe token, instead of
 * storing it server-side and handing back a short id.
 *
 * Necessary because each Next.js API route on Vercel compiles to its own
 * serverless function — writing a "row" to disk in `POST /api/assessment`'s
 * function is invisible to `PATCH /api/assessment/[id]`'s function. There is
 * no shared filesystem between them, so any "create it here, look it up
 * over there" design 404s in production, not occasionally but essentially
 * always. Encoding the full state directly in the id sidesteps that: any
 * function can decode it on its own, with no shared storage required.
 *
 * This discloses nothing a server-side lookup wouldn't have: a results link
 * is already a bearer capability — anyone holding it can see everything it
 * points to either way.
 */
export function encodeSubmission(submission: AssessmentSubmission): string {
  return Buffer.from(JSON.stringify(submission), "utf-8").toString("base64url");
}

export function decodeSubmission(token: string): AssessmentSubmission | null {
  try {
    const parsed = JSON.parse(Buffer.from(token, "base64url").toString("utf-8"));
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as AssessmentSubmission;
  } catch {
    return null;
  }
}
