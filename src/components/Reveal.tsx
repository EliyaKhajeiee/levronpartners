"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * Drives every reveal on the page: word masks (`[data-split]`), fades
 * (`[data-fade]`) and rules (`[data-line]`).
 *
 * The hidden/offset state lives behind `.reveal-ready` on <html>, added here
 * after hydration but before paint. With JS off — or if hydration fails — the
 * page renders fully visible instead of blank. Keeping the class change in a
 * layout effect (rather than an inline script) leaves React the sole owner of
 * the <html> className, which avoids a hydration mismatch.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const SELECTOR = "[data-split],[data-fade],[data-line]";

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    // Next frame, so the hero animates in on load rather than appearing
    // already-revealed. Anything inside the first screen is revealed directly:
    // the observer's negative bottom margin would otherwise strand content
    // sitting low on the opening viewport until the visitor happened to scroll.
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((node) => {
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
