"use client";

import { useEffect, useRef } from "react";

/**
 * The warm light sitting behind the page. It drifts toward the cursor on a
 * lerp so it always feels like it's easing rather than tracking, and idles in a
 * slow figure-eight when the pointer hasn't moved. Pointer-coarse devices get
 * the idle drift only.
 */
export function Ambient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fine = window.matchMedia("(pointer: fine)").matches;

    // Current and target position, in viewport percentages.
    let x = 45;
    let y = 18;
    let tx = x;
    let ty = y;
    let idle = true;
    let raf = 0;
    const start = performance.now();

    const onMove = (e: PointerEvent) => {
      idle = false;
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
    };

    const tick = (now: number) => {
      if (idle) {
        const t = (now - start) / 1000;
        tx = 45 + Math.sin(t * 0.16) * 14;
        ty = 20 + Math.sin(t * 0.23) * 9;
      }

      x += (tx - x) * 0.035;
      y += (ty - y) * 0.035;

      el.style.setProperty("--mx", `${x.toFixed(2)}%`);
      el.style.setProperty("--my", `${y.toFixed(2)}%`);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={ref} className="ambient" aria-hidden="true" />;
}
