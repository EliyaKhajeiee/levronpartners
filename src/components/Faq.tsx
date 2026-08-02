"use client";

import { useState } from "react";

export type QA = { q: string; a: string };

export function Faq({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="hairline border-t">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="hairline border-b">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-8 py-6 text-left md:py-7"
            >
              <span
                className={`display text-[1.35rem] transition-colors duration-300 md:text-[1.6rem] ${
                  isOpen ? "text-teal" : "group-hover:text-teal"
                }`}
              >
                {item.q}
              </span>
              <span className="relative mt-2 block h-3 w-3 shrink-0">
                <span
                  className={`absolute top-1/2 left-0 block h-[1.5px] w-full -translate-y-1/2 transition-colors duration-300 ${
                    isOpen ? "bg-teal" : "bg-ink/45"
                  }`}
                />
                <span
                  className={`absolute top-0 left-1/2 block h-full w-[1.5px] -translate-x-1/2 transition-all duration-400 ${
                    isOpen ? "bg-teal rotate-90 opacity-0" : "bg-ink/45"
                  }`}
                />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-ink/70 max-w-[60ch] pr-10 pb-7 text-[0.95rem] leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
