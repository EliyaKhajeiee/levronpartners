"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { site } from "@/lib/site";
import { industries } from "@/lib/industries";

const subscribeNever = () => () => {};

/**
 * True once hydrated on the client, false during SSR — without the
 * setState-in-effect that a naive `useState` + `useEffect(() => setX(true))`
 * needs (and which this project's lint config treats as an error: an effect
 * whose only job is deriving state from something React already knows is
 * exactly the case React's `useSyncExternalStore` escape hatch exists for).
 */
function useMounted() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

const links = [
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

/**
 * Full-screen drawer for below-`sm`. Desktop keeps a hover Industries panel;
 * touch gets this instead. Primary links stay one clean list — Industries
 * expands in place as an accordion so the trade tree doesn't sit forever
 * between "Industries" and "Work" and break the rhythm.
 */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const mounted = useMounted();

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setIndustriesOpen(false);
  }

  function close() {
    setOpen(false);
    setIndustriesOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setIndustriesOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const drawer = (
    <div
      className={`bg-paper fixed inset-0 z-40 flex flex-col overflow-y-auto pt-[5.5rem] pb-10 transition-opacity duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <nav className="flex flex-1 flex-col px-6">
        <div className="border-line border-b">
          <div className="flex items-center justify-between gap-3 py-4">
            <Link
              href="/industries"
              onClick={close}
              className="display-md text-ink text-[1.375rem]"
            >
              Industries
            </Link>
            <button
              type="button"
              onClick={() => setIndustriesOpen((v) => !v)}
              aria-expanded={industriesOpen}
              aria-label={industriesOpen ? "Hide industries" : "Show industries"}
              className="text-muted hover:text-ink flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
            >
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-300 ${industriesOpen ? "-scale-y-100" : ""}`}
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {industriesOpen && (
            <div className="flex flex-col gap-6 pb-5">
              {industries.map((group) => (
                <div key={group.slug} className="flex flex-col gap-2.5">
                  <Link
                    href={group.href}
                    onClick={close}
                    className="text-ink text-[1rem] font-semibold"
                  >
                    {group.label}
                  </Link>
                  <div className="flex flex-col gap-2">
                    {group.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={close}
                        className="text-ink/70 hover:text-ink text-[0.9375rem] leading-snug transition-colors duration-300"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={close}
            className="border-line display-md text-ink border-b py-4 text-[1.375rem]"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4 px-6 pt-10">
        <Link
          href="/assessment"
          onClick={close}
          className="bg-ink pill hover:bg-teal inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[0.9375rem] font-semibold text-white transition-colors duration-300"
        >
          Free Assessment
          <span aria-hidden="true">→</span>
        </Link>
        <a href={`mailto:${site.email}`} className="text-muted text-center text-[0.875rem]">
          {site.email}
        </a>
      </div>
    </div>
  );

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-[60] -mr-2.5 flex h-11 w-11 shrink-0 items-center justify-center"
      >
        <span
          className={`bg-ink absolute h-[1.5px] w-5 rounded-full transition-all duration-300 ${
            open ? "rotate-45" : "-translate-y-[5px]"
          }`}
        />
        <span
          className={`bg-ink absolute h-[1.5px] w-5 rounded-full transition-all duration-300 ${
            open ? "-rotate-45" : "translate-y-[5px]"
          }`}
        />
      </button>

      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
