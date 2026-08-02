"use client";

import { useEffect, useRef } from "react";

/**
 * A small dot that trails the pointer and swells over anything interactive.
 * Blend mode difference keeps it visible on both the near-black and the
 * full-bleed accent panels. Fine pointers only — never mounted on touch.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = -100;
    let y = -100;
    let tx = x;
    let ty = y;
    let raf = 0;

    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      const target = e.target as Element | null;
      const interactive = target?.closest("a, button, [data-cursor]");
      el.dataset.big = interactive ? "true" : "false";
    };

    el.style.opacity = "1";
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
  );
}
