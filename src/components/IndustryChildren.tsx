import Link from "next/link";
import type { IndustryGroup } from "@/lib/industries";

/**
 * Cross-links a group hub (Construction, Home Services) down to its tighter
 * sub-pages — same card pattern as the "onward" links closing the homepage.
 * Only rendered where a group actually has children.
 */
export function IndustryChildren({ group }: { group: IndustryGroup }) {
  if (group.children.length === 0) return null;

  return (
    <section className="px-6 pb-[14vh] md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <p data-fade className="label mb-12">
          More specific to your trade
        </p>
        <div className="grid gap-x-12 md:grid-cols-2">
          {group.children.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              data-fade
              style={{ "--group-delay": `${i * 120}ms` } as React.CSSProperties}
              className="group border-line block border-t py-10 md:pr-12"
            >
              <div className="label">{group.label}</div>
              <h3 className="display-md mt-5 flex items-center gap-4 text-[clamp(1.5rem,2.6vw,2.25rem)]">
                {card.label}
                <span className="arrow-shift text-teal">→</span>
              </h3>
              <p className="text-ink/70 mt-3 max-w-[40ch] text-[0.9375rem] leading-[1.6]">
                {card.eyebrow}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
