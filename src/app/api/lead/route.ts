import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Catches the visitors who won't complete an external booking flow.
 * `/contact` posts here instead of only offering a mailto link + a
 * scheduling tool in a new tab.
 *
 * Needs `RESEND_API_KEY` in the environment — sign up free at resend.com,
 * verify the sending domain (or use their shared onboarding domain to start),
 * and set the key in Vercel's project settings. Until it's set, this returns
 * a clear 503 rather than silently pretending the email sent.
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/lead] RESEND_API_KEY is not set — email not sent.");
    return NextResponse.json(
      { error: "The contact form isn't wired up to send email yet. Please email us directly." },
      { status: 503 },
    );
  }

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

  if (error) {
    console.error("[api/lead] Resend error:", error);
    return NextResponse.json({ error: "Something went wrong sending that. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
