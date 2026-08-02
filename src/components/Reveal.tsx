"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * Scroll-reveal for every `[data-reveal]` element on the page.
 *
 * The hidden state lives behind `.reveal-ready` on <html>, and that class is
 * only added here — after hydration, before paint. So the page renders fully
 * visible if JS is off or hydration fails, and nothing is ever stranded at
 * opacity 0. Adding the class in a layout effect (not an inline script) keeps
 * React the sole owner of the <html> className, which avoids a hydration
 * mismatch.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Reveal() {
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    // Observe on the next frame so above-the-fold content animates in on load
    // rather than appearing already-revealed. Anything inside the real viewport
    // is revealed directly — the observer's negative bottom margin would
    // otherwise strand content sitting low on the first screen (the hero CTA on
    // a short laptop display) until the visitor happened to scroll.
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
        if (node.getBoundingClientRect().top < window.innerHeight) {
          node.classList.add("is-in");
        } else {
          observer.observe(node);
        }
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
