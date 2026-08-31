"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The on-page alternative to a booking flow. Posts to `/api/lead`, which
 * emails `site.email` via Resend — so the visitors who won’t complete an
 * external scheduling tool still reach you.
 *
 * Renders its own error state rather than a toast, since a contact form is
 * exactly the moment a visitor is deciding whether this business has its act
 * together — a swallowed failure here is worse than an ugly one shown.
 */
export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: data.get("company"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const body = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(body.error ?? "Something went wrong. Please email us directly.");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please email us directly.");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-line rounded-2xl border p-8 text-center">
        <p className="text-ink text-[1.0625rem] font-medium">Got it — we’ll reply within a day.</p>
        <p className="text-muted mt-2 text-[0.9375rem]">
          In a hurry? <a href={`mailto:${site.email}`} className="text-teal hover:underline">{site.email}</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="text-muted text-[0.75rem] font-medium tracking-[0.06em] uppercase">
          Work email
        </span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          className="border-line focus:border-teal rounded-lg border bg-transparent px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-300"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-muted text-[0.75rem] font-medium tracking-[0.06em] uppercase">
          Company name
        </span>
        <input
          required
          name="company"
          type="text"
          autoComplete="organization"
          className="border-line focus:border-teal rounded-lg border bg-transparent px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-300"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-muted text-[0.75rem] font-medium tracking-[0.06em] uppercase">
          What’s costing you time right now?
        </span>
        <textarea
          required
          name="message"
          rows={4}
          className="border-line focus:border-teal resize-none rounded-lg border bg-transparent px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-300"
        />
      </label>

      {status === "error" && (
        <p className="text-brick text-[0.875rem]">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-ink pill hover:bg-teal inline-flex w-fit items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold text-white transition-colors duration-500 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get in touch"}
      </button>

      <p className="text-muted text-[0.8125rem]">
        No spam. We&rsquo;ll only use this to follow up about working together.
      </p>
    </form>
  );
}
