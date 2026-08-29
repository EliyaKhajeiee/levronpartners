"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { industries } from "@/lib/industries";

/**
 * The "Industries" nav item. It's a real link to /industries — Enter or a
 * tap navigates there like any other nav item — with a panel that opens on
 * hover or focus for pointer users who want to jump straight to a
 * sub-page. Closes on Escape, on blur leaving the whole group, and on
 * route change (unmount).
 */
export function IndustriesMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  const active = pathname?.startsWith("/industries") ?? false;

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href="/industries"
        aria-current={active ? "page" : undefined}
        aria-expanded={open}
        className={`nav-link inline-flex items-center gap-1.5 text-[0.875rem] font-medium ${
          active ? "is-active" : ""
        }`}
      >
        Industries
        <svg
          width="9"
          height="6"
          viewBox="0 0 9 6"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? "-scale-y-100" : ""}`}
        >
          <path
            d="M1 1L4.5 5L8 1"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div
        role="menu"
        className={`border-line bg-paper/98 absolute left-1/2 top-full mt-3 w-[26rem] -translate-x-1/2 rounded-[1.25rem] border p-2 shadow-[0_20px_50px_-12px_rgba(31,36,40,0.18)] backdrop-blur-md transition-[opacity,transform] duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-1">
          {industries.map((group) => (
            <div key={group.slug} className="p-3">
              <Link
                href={group.href}
                role="menuitem"
                className="group/head block"
              >
                <div className="text-ink group-hover/head:text-teal flex items-center gap-2 text-[0.9375rem] font-semibold transition-colors duration-300">
                  {group.label}
                  <span className="arrow-shift">→</span>
                </div>
                <div className="text-muted mt-1 text-[0.75rem] leading-[1.4]">
                  {group.eyebrow}
                </div>
              </Link>

              <div className="border-line mt-3 flex flex-col gap-1 border-t pt-3">
                {group.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    role="menuitem"
                    className="link-quiet rounded-[0.5rem] px-1 py-1 text-[0.8125rem] leading-[1.4]"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
