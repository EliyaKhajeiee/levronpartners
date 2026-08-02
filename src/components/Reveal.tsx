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

// Every attribute that has a hidden state in globals.css must be listed here,
// or those elements stay invisible forever once .reveal-ready is on.
const SELECTOR = "[data-split],[data-fade],[data-rise],[data-line],[data-grow]";

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

    // Deferred by one beat so the opening screen animates in rather than
    // appearing already-revealed. Anything inside the first viewport is
    // revealed directly: the observer's negative bottom margin would otherwise
    // strand content sitting low on the opening screen until the visitor
    // happened to scroll.
    //
    // A frame callback alone is not safe here. Browsers stop issuing frames to
    // pages that are not being presented — a link opened in a background tab —
    // so a page gated purely on rAF can stay blank indefinitely. The timer is
    // the guarantee; the frame is just the nicer timing when one arrives.
    let started = false;

    const start = () => {
      if (started) return;
      started = true;

      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((node) => {
        if (node.getBoundingClientRect().top < window.innerHeight) {
          node.classList.add("is-in");
        } else {
          observer.observe(node);
        }
      });
    };

    const frame = requestAnimationFrame(start);
    const timer = window.setTimeout(start, 200);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
