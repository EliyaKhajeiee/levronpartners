import Image from "next/image";
import Link from "next/link";
import { Split } from "./Split";

type HeroLink = { label: string; href: string };
type Chip = { value: string; label: string };
type Breadcrumb = { parentHref: string; parentLabel: string; label: string };

/**
 * The sub-industry sibling of `VideoHero` — same full-bleed, bottom-weighted
 * cinematic treatment, but for a still photograph instead of footage, with
 * the breadcrumb folded into the same section instead of sitting above it on
 * paper. Replaces the old `IndustryBreadcrumb` + `IndustryHero` pairing on
 * pages that have a photo to put behind them.
 */
export function ImageHero({
  breadcrumb,
  eyebrow,
  headline,
  headlineClassName = "max-w-[20ch]",
  body,
  links,
  imageSrc,
  imageAlt = "",
  chip,
}: {
  breadcrumb: Breadcrumb;
  eyebrow: string;
  headline: string;
  headlineClassName?: string;
  body: string;
  links: HeroLink[];
  imageSrc: string;
  imageAlt?: string;
  chip?: Chip;
}) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden md:min-h-[88svh]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        quality={95}
        sizes="100vw"
        className="-z-20 object-cover object-[center_35%]"
      />
      {/* Darkest low, where the copy sits — lets the top of the frame read
          clearly through the translucent nav. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10"
        aria-hidden="true"
      />

      <div className="relative px-6 pt-[max(11rem,14vh)] md:px-10 md:pt-[16vh]">
        <div className="mx-auto flex max-w-[1500px] items-center gap-2 text-[0.8125rem]">
          <Link
            href={breadcrumb.parentHref}
            className="text-white/70 transition-colors duration-500 hover:text-white"
          >
            {breadcrumb.parentLabel}
          </Link>
          <span className="text-white/40" aria-hidden="true">
            /
          </span>
          <span className="text-white/90">{breadcrumb.label}</span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-6 pb-[10vh] md:px-10 md:pb-[12vh]">
        <p
          data-fade
          className="mb-8 text-[0.75rem] font-medium tracking-[0.1em] text-white/70 uppercase"
        >
          {eyebrow}
        </p>
        <h1
          data-split
          className={`display optical text-[clamp(2.5rem,7.4vw,6.5rem)] text-white ${headlineClassName}`}
        >
          <Split text={headline} />
        </h1>
        <p
          data-fade
          style={{ "--group-delay": "320ms" } as React.CSSProperties}
          className="mt-8 max-w-[52ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.5] tracking-[-0.015em] text-white/75"
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
                <span className="text-white/40" aria-hidden="true">
                  ·
                </span>
              )}
              <Link
                href={l.href}
                className="group hover:text-teal inline-flex items-center gap-2 border-b border-white/30 pb-1 text-[0.9375rem] font-medium text-white transition-colors duration-500 hover:border-teal"
              >
                {l.label}
                <span className="arrow-shift">→</span>
              </Link>
            </span>
          ))}
        </div>

        {chip && (
          <div
            data-fade
            style={{ "--group-delay": "680ms" } as React.CSSProperties}
            className="mt-12 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-[0.8125rem] text-white backdrop-blur-md"
          >
            <span
              className="bg-teal size-1.5 shrink-0 rounded-full"
              aria-hidden="true"
            />
            <span className="font-medium">{chip.value}</span>
            <span className="text-white/60">{chip.label}</span>
          </div>
        )}
      </div>
    </section>
  );
}
