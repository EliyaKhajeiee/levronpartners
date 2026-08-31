import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client, authenticated with the secret key (Supabase's
 * current replacement for the legacy `service_role` JWT — same privilege
 * level: bypasses Row Level Security entirely). Never import this from a
 * "use client" component or anything that ships to the browser — the whole
 * point of RLS being on with no policies (see the migration in
 * `lib/assessment/store.ts`'s comment) is that this key is the only way in.
 *
 * Returns `null` rather than throwing when unconfigured, so every caller
 * degrades the same way the rest of this codebase does when a real backend
 * isn't wired up yet (see `media.ts`, `assessment/store.ts`) — a missing
 * table doesn't 500 the page, it just no-ops.
 */
let client: SupabaseClient | null | undefined;

export function getSupabaseServerClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    console.error("[supabase] NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY not set — Supabase disabled.");
    client = null;
    return client;
  }

  client = createClient(url, secretKey, {
    auth: { persistSession: false },
  });
  return client;
}
