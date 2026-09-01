import Link from "next/link";
import { Split } from "./Split";

type HeroLink = { label: string; href: string };

/**
 * The opening section shared by every industry page — group hubs and the
 * tighter sub-pages underneath them. Mirrors the hero rhythm on /work,
 * /process and /contact: label, split headline, one paragraph, then the
 * page's own pair of next-steps instead of a single CTA.
 */
export function IndustryHero({
  eyebrow,
  headline,
  headlineClassName = "max-w-[18ch]",
  body,
  links,
  topPadding = "pt-[max(9rem,22vh)] md:pt-[26vh]",
}: {
  eyebrow: string;
  headline: string;
  headlineClassName?: string;
  body: string;
  links: HeroLink[];
  /** Override when an `IndustryBreadcrumb` above has already claimed the
   *  nav-clearance space. */
  topPadding?: string;
}) {
  return (
    <section className={`px-6 pb-[10vh] md:px-10 ${topPadding}`}>
      <div className="mx-auto max-w-[1500px]">
        <p data-fade className="label mb-8">
          {eyebrow}
        </p>
        <h1
          data-split
          className={`display optical text-[clamp(2.5rem,7.4vw,6.5rem)] ${headlineClassName}`}
        >
          <Split text={headline} />
        </h1>
        <p
          data-fade
          style={{ "--group-delay": "320ms" } as React.CSSProperties}
          className="text-muted mt-10 max-w-[54ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.45] tracking-[-0.015em]"
        >
          {body}
        </p>

        <div
          data-fade
          style={{ "--group-delay": "460ms" } as React.CSSProperties}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          {links.map((l, i) => (
            <span key={l.href} className="flex items-center gap-4">
              {i > 0 && (
                <span className="text-muted" aria-hidden="true">
                  ·
                </span>
              )}
              <Link
                href={l.href}
                className="group border-ink/25 hover:border-teal hover:text-teal inline-flex items-center gap-2 border-b pb-1 text-[0.9375rem] font-medium transition-colors duration-500"
              >
                {l.label}
                <span className="arrow-shift">→</span>
              </Link>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
