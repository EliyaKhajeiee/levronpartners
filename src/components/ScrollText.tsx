"use client";

import { Fragment, useEffect, useRef } from "react";

/**
 * A statement that lights up word by word as the section scrolls past — the
 * words start faint and resolve to full contrast in reading order.
 *
 * Renders at full contrast on the server, so no-JS visitors just read it.
 */
export function ScrollText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const marks = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    const per = 1 / marks.length;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 as the block enters the lower part of the screen, 1 once it has
      // travelled most of the way up.
      const travel = vh * 0.72;
      const progress = Math.min(Math.max((vh * 0.82 - rect.top) / travel, 0), 1);

      // Each word gets its own slice of the progress, with neighbours
      // overlapping so the sweep reads as continuous rather than stepped.
      marks.forEach((mark, i) => {
        const local = (progress - i * per * 0.86) / (per * 2.2);
        const eased = Math.min(Math.max(local, 0), 1);
        mark.style.opacity = String(0.16 + eased * 0.84);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span data-word className="inline-block">
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </p>
  );
}
