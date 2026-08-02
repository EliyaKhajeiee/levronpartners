"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#how", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last.current;

      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 140);
        last.current = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="from-paper pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent" />

      <nav className="relative mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10">
        <a
          href="#top"
          className="display text-[1.375rem] tracking-[-0.05em]"
          aria-label={site.name}
        >
          levron
        </a>

        <div className="flex items-center gap-7">
          <div className="hidden items-center gap-7 sm:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-quiet text-[0.875rem] font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-ink pill inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.8125rem] font-semibold text-white hover:bg-[#332f2a]"
          >
            Get started
            <span className="arrow-shift">→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
