"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const pathname = usePathname();

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
        <Link
          href="/"
          className="display text-[1.25rem] tracking-[-0.04em]"
          aria-label={site.name}
        >
          Levron Partners
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <div className="hidden items-center gap-8 sm:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link text-[0.875rem] font-medium ${
                    active ? "is-active" : ""
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-ink pill hover:bg-teal inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.8125rem] font-semibold text-white"
          >
            Get Started
            <span className="arrow-shift">→</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
