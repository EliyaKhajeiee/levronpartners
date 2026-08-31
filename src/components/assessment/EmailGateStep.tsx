"use client";

import { useState, type FormEvent } from "react";
import type { AssessmentContact } from "@/lib/assessment/types";

export function EmailGateStep({
  onSubmit,
  submitting,
}: {
  onSubmit: (contact: AssessmentContact) => void;
  submitting: boolean;
}) {
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email address doesn't look right.");
      return;
    }
    if (!firstName || !lastName) {
      setError("First and last name are both required.");
      return;
    }

    setError("");
    onSubmit({
      email,
      firstName,
      lastName,
      phone: String(data.get("phone") ?? "").trim() || undefined,
      company: String(data.get("company") ?? "").trim() || undefined,
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="display-md text-ink max-w-[24ch] text-[clamp(1.5rem,3vw,2.25rem)]">
          Where should we send your results?
        </h2>
        <p className="text-muted mt-3 max-w-[42ch] text-[0.9375rem] leading-[1.6]">
          We&rsquo;ll email your Action Plan and follow up to schedule a free session if you want one.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-muted text-[0.75rem] font-medium tracking-[0.06em] uppercase">First name</span>
            <input
              required
              name="firstName"
              autoComplete="given-name"
              className="border-line focus:border-teal rounded-lg border bg-transparent px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-300"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-muted text-[0.75rem] font-medium tracking-[0.06em] uppercase">Last name</span>
            <input
              required
              name="lastName"
              autoComplete="family-name"
              className="border-line focus:border-teal rounded-lg border bg-transparent px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-300"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-muted text-[0.75rem] font-medium tracking-[0.06em] uppercase">Work email</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="border-line focus:border-teal rounded-lg border bg-transparent px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-300"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-muted text-[0.75rem] font-medium tracking-[0.06em] uppercase">Company</span>
            <input
              name="company"
              autoComplete="organization"
              className="border-line focus:border-teal rounded-lg border bg-transparent px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-300"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-muted text-[0.75rem] font-medium tracking-[0.06em] uppercase">Phone (optional)</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className="border-line focus:border-teal rounded-lg border bg-transparent px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-300"
            />
          </label>
        </div>

        {error && <p className="text-brick text-[0.875rem]">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-ink pill hover:bg-teal mt-2 inline-flex w-fit items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold text-white transition-colors duration-500 disabled:opacity-60"
        >
          {submitting ? "Analyzing…" : "Get my results"}
        </button>
        <p className="text-muted text-[0.8125rem]">No spam. Just your results and a follow-up about the session.</p>
      </form>
    </div>
  );
}
