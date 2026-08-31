import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Catches the visitors who won't complete an external booking flow.
 * `/contact` posts here instead of only offering a mailto link + a
 * scheduling tool in a new tab.
 *
 * Writes to Supabase's `contact_leads` table and sends the internal
 * notification email independently of each other — a lead surviving only
 * requires one of the two to work. Before Supabase was wired up, an
 * unconfigured or failing `RESEND_API_KEY` meant the lead was gone the
 * moment the request finished; now the row in `contact_leads` is the
 * durable copy, and email is just the "come look at this now" nudge on top.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { company, email, message } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof company !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !company.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: "Company name, email, and a message are all required." },
      { status: 400 },
    );
  }

  // Minimal shape check — real validation (MX lookup, disposable-domain
  // blocking) isn't worth it for a low-volume contact form.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  let stored = false;
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("contact_leads").insert({ company, email, message });
    if (error) console.error("[api/lead] Supabase insert failed:", error.message);
    else stored = true;
  } else {
    console.error("[api/lead] Supabase not configured — lead not persisted.");
  }

  let emailed = false;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/lead] RESEND_API_KEY is not set — email not sent.");
  } else {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Resend requires the from address's domain to be verified with them —
      // swap this for a levronpartners.com address once that's done, and use
      // their shared onboarding domain (onboarding@resend.dev) until then.
      from: `${site.name} website <onboarding@resend.dev>`,
      to: [...site.notifyEmails],
      replyTo: email,
      subject: `New lead: ${company}`,
      text: `${company} (${email}) wrote:\n\n${message}`,
    });
    if (error) console.error("[api/lead] Resend error:", error);
    else emailed = true;
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      { error: "Something went wrong sending that. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
