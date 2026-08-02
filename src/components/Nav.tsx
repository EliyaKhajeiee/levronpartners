"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Wordmark } from "./Mark";

const links = [
  { href: "#work", label: "What we build" },
  { href: "#how", label: "How it works" },
  { href: "#proof", label: "Proof" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        stuck
          ? "bg-cream-lit/80 hairline border-b backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="shrink-0" aria-label={site.name}>
          <Wordmark />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline text-ink/65 hover:text-ink text-[0.8125rem] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink hover:bg-teal text-cream hidden rounded-full px-5 py-2.5 text-[0.8125rem] font-medium transition-colors duration-300 md:inline-flex"
          >
            Book a call
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="hairline flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
          >
            <span className="relative block h-[9px] w-[15px]">
              <span
                className={`bg-ink absolute left-0 block h-[1.5px] w-full transition-all duration-300 ${
                  open ? "top-1 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`bg-ink absolute left-0 block h-[1.5px] w-full transition-all duration-300 ${
                  open ? "top-1 -rotate-45" : "top-2"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`bg-cream-lit fixed inset-x-0 top-[68px] bottom-0 origin-top px-6 transition-all duration-400 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex flex-col pt-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hairline-soft display border-b py-5 text-[2rem]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink text-cream mt-8 rounded-full px-6 py-4 text-center text-sm font-medium"
          >
            {site.bookingLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
