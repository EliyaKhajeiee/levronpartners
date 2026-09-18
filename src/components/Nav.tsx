"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navBrandForPath } from "@/lib/brand";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { IndustriesMenu } from "./IndustriesMenu";
import { MobileNav } from "./MobileNav";

const links = [
  { href: "/work", label: "Work" },
  { href: "/resources", label: "Resources" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const brand = navBrandForPath(pathname);
  // Industry pages open on a full-bleed video/image hero, so the header
  // sits on top of moving imagery instead of flat paper — a solid bar reads
  // as a slapped-on label there. Drop the fill and lean on blur + saturation
  // instead, so it reads as glass over the footage rather than a UI chrome.
  const isIndustryPage = pathname === "/industries" || pathname.startsWith("/industries/");

  return (
    <header
      className={
        isIndustryPage
          ? "bg-paper/30 supports-[backdrop-filter]:bg-paper/20 fixed inset-x-0 top-0 z-50 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10"
          : "bg-paper/80 fixed inset-x-0 top-0 z-50 backdrop-blur-md"
      }
    >
      <nav className="relative mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="text-[1.25rem]" aria-label={site.name}>
          <Wordmark brand={brand} />
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <div className="hidden items-center gap-8 md:flex">
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

          {/* Hidden below `md` — four nav links plus Industries no longer
              fit beside the logo and this pill at `sm`. The drawer carries
              its own "Free Assessment" CTA instead. */}
          <Link
            href="/assessment"
            className="group bg-ink pill hover:bg-teal hidden shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[0.8125rem] font-semibold whitespace-nowrap text-white md:inline-flex"
          >
            Free Assessment
            <span className="arrow-shift">→</span>
          </Link>

          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
