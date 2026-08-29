"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { IndustriesMenu } from "./IndustriesMenu";

const links = [
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="bg-paper/80 fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <nav className="relative mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="text-[1.25rem]" aria-label={site.name}>
          <Wordmark />
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <div className="hidden items-center gap-8 sm:flex">
            <IndustriesMenu />
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
