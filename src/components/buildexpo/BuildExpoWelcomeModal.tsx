"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { BUILDEXPO_ASSESSMENT_HREF, consumeBuildExpoWelcome } from "@/lib/buildExpo";

/** Let the page paint first so the popup doesn't feel like a wall. */
const SHOW_DELAY_MS = 1200;

/** Never interrupt the assessment itself. */
const SKIP_PREFIXES = ["/assessment", "/api"];

/** The 5-minute video: one real job, plans to a priced estimate (same file as levronlabs.com). */
const VIDEO = { src: "/buildexpo/video.mp4", poster: "/buildexpo/poster.jpg", length: "5 min" };

/**
 * One-time welcome for people who found us at BuildExpo (see src/lib/buildExpo.ts).
 * Low-pressure on purpose: the video first, the free assessment second, and
 * "Just looking around" as an equal exit.
 */
export function BuildExpoWelcomeModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (SKIP_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return;
    // Consume when the timer fires, not on mount (Strict Mode runs effects twice).
    const timer = window.setTimeout(() => {
      if (!consumeBuildExpoWelcome(window.location.search)) return;
      setOpen(true);
      track("buildexpo_welcome_shown", { path: pathname });
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
    // Only on first landing, not on every client-side navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = useCallback(() => {
    track("buildexpo_welcome_dismissed");
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-ink/55 backdrop-blur-sm" onClick={dismiss} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="buildexpo-welcome-title"
        className="bg-paper border-line relative max-h-[calc(100svh-2rem)] w-full max-w-xl overflow-y-auto rounded-2xl border p-6 shadow-[0_24px_60px_rgba(31,36,40,0.25)] sm:p-8"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="text-muted absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full text-base transition hover:bg-black/5"
        >
          ✕
        </button>

        <p className="text-teal pr-10 text-xs font-semibold tracking-[0.14em] uppercase">
          Good to meet you at BuildExpo
        </p>
        <h2 id="buildexpo-welcome-title" className="text-ink mt-3 text-2xl leading-tight font-extrabold">
          Thanks for stopping by. Here&rsquo;s a quick look at what we do.
        </h2>
        <p className="text-muted mt-2 text-sm">About {VIDEO.length}. Watch now or save it for later.</p>

        <div className="mt-5">
          <video
            controls
            playsInline
            preload="metadata"
            poster={VIDEO.poster}
            aria-label="Levron at BuildExpo"
            onPlay={() => track("buildexpo_welcome_video_played")}
            className="border-line w-full rounded-xl border bg-black shadow-sm"
            style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
          >
            <source src={VIDEO.src} type="video/mp4" />
          </video>
        </div>

        <div className="border-line mt-6 border-t pt-6">
          <p className="text-ink text-sm font-semibold">Curious what this could look like for you?</p>
          <p className="text-muted mt-1 text-sm leading-relaxed">
            Our free assessment takes about 30 seconds. No call needed.
          </p>
          <div className="mt-5 space-y-2">
            <Link
              href={BUILDEXPO_ASSESSMENT_HREF}
              onClick={() => track("buildexpo_welcome_assessment_clicked")}
              className="bg-ink hover:bg-teal flex w-full items-center justify-center rounded-full px-8 py-4 text-[0.9375rem] font-semibold text-white transition"
            >
              Take the free assessment
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="text-muted min-h-11 w-full text-sm font-semibold underline underline-offset-2"
            >
              Just looking around for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
