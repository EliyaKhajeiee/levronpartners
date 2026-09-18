"use client";

import { useEffect, useRef } from "react";

export type Stat = {
  label: string;
  to: number;
  /** Omit to render a static figure — only a stat with a `from` counts up. */
  from?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

function format(n: number, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function render(stat: Stat, value: number) {
  return `${stat.prefix ?? ""}${format(value, stat.decimals ?? 0)}${stat.suffix ?? ""}`;
}

/**
 * The counting proof row directly above "Proudly partnered with" — mirrors
 * the stats bar on levronlabs.com: each number counts up from a lower start
 * the moment the row scrolls into view, once, then holds at the real figure.
 *
 * Renders the resting value on the server, so no-JS visitors (and anyone
 * with prefers-reduced-motion set) just see the real number — the count-up
 * is decoration on top of it, not the only place the figure lives. A stat
 * without `from` never animates; it renders once and stays put.
 */
export function Stats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const nodes = Array.from(
      el.querySelectorAll<HTMLElement>("[data-stat-value]"),
    );

    // Hold at each stat's start value until the row is actually on screen —
    // otherwise a visitor who opens the page already scrolled past it would
    // never see the count run at all.
    nodes.forEach((node, i) => {
      const stat = stats[i];
      if (stat.from == null) return;
      node.textContent = render(stat, stat.from);
    });

    const duration = 1800;
    let raf = 0;

    const run = () => {
      const startedAt = performance.now();
      const tick = (now: number) => {
        // Linear, not eased — every stat reaches its target at the same
        // moment regardless of how far it's counting. An eased curve looks
        // fine on its own, but rounds to its final digits early for a small
        // range (e.g. 80 → 105) while a large range (25,000 → 30,000) is
        // still visibly climbing, so the two clocks read as out of sync.
        const t = Math.min((now - startedAt) / duration, 1);

        nodes.forEach((node, i) => {
          const stat = stats[i];
          if (stat.from == null) return;
          const value = stat.from + (stat.to - stat.from) * t;
          node.textContent = render(stat, value);
        });

        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [stats]);

  return (
    <section className="px-6 pt-[6vh] pb-[3vh] md:px-10">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1500px] grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-12"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-fade
            style={{ "--group-delay": `${i * 100}ms` } as React.CSSProperties}
            // Grid tracks are fixed thirds of the row, not sized to content,
            // so a neighbor's digits changing width during the count can't
            // nudge this one sideways — only the text inside its own track
            // shifts, via alignment, to keep the row's overall spread even.
            className={
              i === 0
                ? "text-left"
                : i === stats.length - 1
                  ? "sm:text-right"
                  : "sm:text-center"
            }
          >
            <div
              data-stat-value
              className="display text-[clamp(2rem,4vw,3.25rem)] tabular-nums"
            >
              {render(s, s.to)}
            </div>
            <p className="text-teal mt-3 text-[0.9375rem] font-medium">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
