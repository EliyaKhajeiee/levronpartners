"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Split } from "./Split";

type HeroLink = { label: string; href: string };
type Chip = { value: string; label: string };
type Breadcrumb = { parentHref: string; parentLabel: string; label: string };

/**
 * A full-bleed, cinematic hero — video behind the nav, copy sitting low
 * against a bottom-heavy scrim. Same beats the old `IndustryHero` had
 * (eyebrow, headline, body, next-step links) plus an optional stat "chip" in
 * the corner, but everything renders in white over motion instead of ink over
 * paper, so it can't reuse `.label` / `.text-muted` — those colours are
 * pinned by an un-layered rule in globals.css and would always win over a
 * `text-white` utility from Tailwind's `@layer utilities`.
 *
 * Optional `breadcrumb` mirrors `ImageHero` so trade pages can keep the
 * parent / page trail inside the same full-bleed section.
 *
 * `chip` takes either one stat or an array — pass an array to stack a
 * second (or third) pill underneath the first, same pill styling each time.
 *
 * `poster` always renders behind the `<video>`, so it's what a visitor sees
 * before the clip buffers, if it fails to load at all, and — since the
 * effect below pauses playback on mount — for anyone with
 * prefers-reduced-motion set. Same rule `Reveal`/`ScrollText`/`Magnetic`
 * already apply elsewhere on this site: autoplay motion isn't optional for
 * the vestibular-disorder crowd, it's a WCAG 2.3.3 miss.
 */
export function VideoHero({
  breadcrumb,
  eyebrow,
  headline,
  headlineClassName = "max-w-[20ch]",
  body,
  links,
  videoSrc,
  poster,
  chip,
}: {
  breadcrumb?: Breadcrumb;
  eyebrow: string;
  headline: string;
  headlineClassName?: string;
  /** A second string renders as its own, more emphasized closing line —
   *  for a short punchline that shouldn't read as more of the same
   *  paragraph. */
  body: string | string[];
  links: HeroLink[];
  videoSrc: string;
  poster?: string;
  chip?: Chip | Chip[];
}) {
  const paragraphs = Array.isArray(body) ? body : [body];
  const chips = chip ? (Array.isArray(chip) ? chip : [chip]) : [];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    // Mobile browsers (notably Chrome on Android with Data Saver, and
    // WebKit after the tab was backgrounded) can silently drop the
    // `autoplay` attribute — the clip stalls on the poster frame with a
    // native play affordance instead of looping. Setting `muted` via the
    // property (not just the attribute) and calling `play()` ourselves is
    // the belt-and-suspenders fix recommended for autoplay-blocked video;
    // the rejected promise is expected and safe to ignore.
    video.muted = true;
    const attemptPlay = () => {
      video.play().catch(() => {});
    };
    attemptPlay();

    // If it still isn't rolling once data has actually loaded, try again —
    // covers the case where autoplay was attempted before the browser had
    // enough of the clip buffered to honour it.
    video.addEventListener("loadeddata", attemptPlay);
    return () => video.removeEventListener("loadeddata", attemptPlay);
  }, []);

  return (
    <section
      className={`relative isolate flex flex-col overflow-hidden ${
        breadcrumb
          ? "min-h-[100svh] justify-between"
          : // Taller than one screen on mobile only — bottom-anchored copy on
            // a page with two body paragraphs, links, and a chip barely
            // clears the fixed nav inside a plain 100svh box on a phone.
            // Extra height plus a smaller bottom pad give it room to settle
            // lower, away from the nav, without touching desktop at all.
            "min-h-[118svh] justify-end px-6 pb-10 md:min-h-[100svh] md:px-10 md:pb-[12vh]"
      }`}
    >
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

      {breadcrumb && (
        <div className="relative px-6 pt-[max(11rem,14vh)] md:px-10 md:pt-[16vh]">
          <div className="mx-auto flex max-w-[1500px] items-center gap-2 text-[0.8125rem]">
            <Link
              href={breadcrumb.parentHref}
              className="text-white/70 transition-colors duration-500 hover:text-white"
            >
              {breadcrumb.parentLabel}
            </Link>
            <span className="text-white/40" aria-hidden="true">
              /
            </span>
            <span className="text-white/90">{breadcrumb.label}</span>
          </div>
        </div>
      )}

      <div
        className={`relative mx-auto w-full max-w-[1500px] ${
          breadcrumb ? "px-6 pb-[10vh] md:px-10 md:pb-[12vh]" : ""
        }`}
      >
        <p
          data-fade
          className="mb-5 text-[0.75rem] font-medium tracking-[0.1em] text-white/70 uppercase md:mb-8"
        >
          {eyebrow}
        </p>
        <h1
          data-split
          className={`display optical text-[clamp(2.5rem,7.4vw,6.5rem)] text-white ${headlineClassName}`}
        >
          <Split text={headline} />
        </h1>
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            data-fade
            style={{ "--group-delay": `${320 + i * 140}ms` } as React.CSSProperties}
            className={`max-w-[52ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.5] tracking-[-0.015em] ${
              i === 0 ? "mt-5 md:mt-8" : "mt-3 md:mt-4"
            } ${
              paragraphs.length > 1 && i === paragraphs.length - 1
                ? "font-medium text-white/95"
                : "text-white/75"
            }`}
          >
            {paragraph}
          </p>
        ))}

        <div
          data-fade
          style={
            { "--group-delay": `${460 + (paragraphs.length - 1) * 140}ms` } as React.CSSProperties
          }
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 md:mt-10"
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

        {chips.length > 0 && (
          <div className="mt-6 flex flex-col items-start gap-3 md:mt-12">
            {chips.map((c, i) => (
              <div
                key={c.value}
                data-fade
                style={
                  {
                    "--group-delay": `${680 + (paragraphs.length - 1) * 140 + i * 140}ms`,
                  } as React.CSSProperties
                }
                className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-[0.8125rem] text-white backdrop-blur-md"
              >
                <span
                  className="bg-teal size-1.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                <span className="font-medium">{c.value}</span>
                <span className="text-white/60">{c.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
