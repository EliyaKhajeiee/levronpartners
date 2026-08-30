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
 * The entire header nav (IndustriesMenu + Work/Process/Contact) is
 * `hidden sm:flex` — deliberately, since a hover panel makes no sense on
 * touch. But nothing replaced it below `sm`, which meant a phone visitor had
 * no way to reach Industries, Work, Process, or Contact from the header at
 * all — only the logo and "Get Started." This is the replacement: a
 * full-screen drawer, `sm:hidden`, with the same links plus the Industries
 * tree flattened out (a hover fly-out has no touch equivalent, so the whole
 * tree is just laid out in place).
 */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The header has `backdrop-blur-md` (a `backdrop-filter`), which per spec
  // makes it a containing block for `position: fixed` descendants — so a
  // `fixed inset-0` drawer nested inside it sizes against the header's own
  // small box, not the viewport, and renders as a ~136px sliver instead of
  // a full-screen sheet. Portaling to `document.body` escapes that
  // containing block entirely. `mounted` guards the portal to a
  // client-only render so SSR doesn't choke on a missing `document`.
  const mounted = useMounted();

  // Close on route change, so a tapped link doesn't leave the drawer open
  // behind the new page. Adjusting state during render (not in an effect)
  // per React's guidance on resetting state from a prop change — avoids the
  // extra render pass an effect would cost, and this project's lint config
  // flags setState-in-effect as an error anyway.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Lock body scroll while the drawer covers the screen, and let Escape
  // close it like the desktop hover panel does.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const drawer = (
    <div
      className={`bg-paper fixed inset-0 z-40 flex flex-col overflow-y-auto pt-24 pb-10 transition-opacity duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <nav className="flex flex-1 flex-col gap-1 px-6">
        <Link
          href="/industries"
          onClick={() => setOpen(false)}
          className="border-line display-md flex items-center justify-between border-b py-4 text-[1.375rem]"
        >
          Industries
          <span className="text-teal">→</span>
        </Link>

        <div className="flex flex-col gap-5 py-5">
          {industries.map((group) => (
            <div key={group.slug}>
              <Link
                href={group.href}
                onClick={() => setOpen(false)}
                className="text-ink text-[0.9375rem] font-semibold"
              >
                {group.label}
              </Link>
              <div className="border-line mt-2 flex flex-col gap-2.5 border-l pl-4">
                {group.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="text-muted text-[0.875rem]"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="border-line display-md flex items-center justify-between border-b py-4 text-[1.375rem] first:border-t"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-4 px-6 pt-8">
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="bg-ink pill inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[0.9375rem] font-semibold text-white"
        >
          Get Started
          <span aria-hidden="true">→</span>
        </a>
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
