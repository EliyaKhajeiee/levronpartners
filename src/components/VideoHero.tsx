"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Split } from "./Split";

type HeroLink = { label: string; href: string };
type Chip = { value: string; label: string };

/**
 * A full-bleed, cinematic hero — video behind the nav, copy sitting low
 * against a bottom-heavy scrim. Same beats the old `IndustryHero` had
 * (eyebrow, headline, body, next-step links) plus an optional stat "chip" in
 * the corner, but everything renders in white over motion instead of ink over
 * paper, so it can't reuse `.label` / `.text-muted` — those colours are
 * pinned by an un-layered rule in globals.css and would always win over a
 * `text-white` utility from Tailwind's `@layer utilities`.
 *
 * `poster` always renders behind the `<video>`, so it's what a visitor sees
 * before the clip buffers, if it fails to load at all, and — since the
 * effect below pauses playback on mount — for anyone with
 * prefers-reduced-motion set. Same rule `Reveal`/`ScrollText`/`Magnetic`
 * already apply elsewhere on this site: autoplay motion isn't optional for
 * the vestibular-disorder crowd, it's a WCAG 2.3.3 miss.
 */
export function VideoHero({
  eyebrow,
  headline,
  headlineClassName = "max-w-[20ch]",
  body,
  links,
  videoSrc,
  poster,
  chip,
}: {
  eyebrow: string;
  headline: string;
  headlineClassName?: string;
  body: string;
  links: HeroLink[];
  videoSrc: string;
  poster?: string;
  chip?: Chip;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-[10vh] md:px-10 md:pb-[12vh]">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* Darkest low, where the copy sits — lets the top of the clip read
          clearly through the translucent nav. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/5"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <p
          data-fade
          className="mb-8 text-[0.75rem] font-medium tracking-[0.1em] text-white/70 uppercase"
        >
          {eyebrow}
        </p>
        <h1
          data-split
          className={`display optical text-[clamp(2.5rem,7.4vw,6.5rem)] text-white ${headlineClassName}`}
        >
          <Split text={headline} />
        </h1>
        <p
          data-fade
          style={{ "--group-delay": "320ms" } as React.CSSProperties}
          className="mt-8 max-w-[52ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.5] tracking-[-0.015em] text-white/75"
        >
          {body}
        </p>

        <div
          data-fade
          style={{ "--group-delay": "460ms" } as React.CSSProperties}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          {links.map((l, i) => (
            <span key={l.href} className="flex items-center gap-4">
              {i > 0 && (
                <span className="text-white/40" aria-hidden="true">
                  ·
                </span>
              )}
              <Link
                href={l.href}
                className="group hover:text-teal inline-flex items-center gap-2 border-b border-white/30 pb-1 text-[0.9375rem] font-medium text-white transition-colors duration-500 hover:border-teal"
              >
                {l.label}
                <span className="arrow-shift">→</span>
              </Link>
            </span>
          ))}
        </div>

        {chip && (
          <div
            data-fade
            style={{ "--group-delay": "680ms" } as React.CSSProperties}
            className="mt-12 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-[0.8125rem] text-white backdrop-blur-md"
          >
            <span
              className="bg-teal size-1.5 shrink-0 rounded-full"
              aria-hidden="true"
            />
            <span className="font-medium">{chip.value}</span>
            <span className="text-white/60">{chip.label}</span>
          </div>
        )}
      </div>
    </section>
  );
}
