"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/** Slim bar that gets out of the way going down and returns coming back up. */
export function Nav() {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last.current;

      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 120);
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
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-7 py-7 md:px-14">
        <a
          href="#top"
          className="text-[0.9375rem] font-medium tracking-[-0.01em]"
        >
          Levron <span className="text-muted">Partners</span>
        </a>

        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet text-[0.8125rem]"
        >
          Get started
        </a>
      </nav>
    </header>
  );
}
