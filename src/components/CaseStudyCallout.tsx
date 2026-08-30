import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";

/**
 * Attributes a trade page’s stats to the real client behind them and links
 * through to the full case study. The stats already shown elsewhere on a
 * page (StatStrip, a hero chip) are real numbers, but unattributed they read
 * as generic marketing claims — this is what turns "50+ hrs/month back" into
 * a specific business that said so.
 */
export function CaseStudyCallout({ caseStudy: cs }: { caseStudy: CaseStudy }) {
  return (
    <section className="border-line border-t px-6 py-[11vh] md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <Link
          href={`/work/${cs.slug}`}
          className="group border-line hover:border-teal/60 grid gap-8 rounded-2xl border p-8 transition-colors duration-500 md:grid-cols-12 md:items-center md:p-10"
        >
          <div className="flex items-center gap-4 md:col-span-4">
            <div className="border-line flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-2">
              <Image
                src={cs.logo}
                alt={`${cs.company} logo`}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="text-ink text-[0.9375rem] font-medium">{cs.company}</p>
              <p className="text-muted text-[0.8125rem]">{cs.sector}</p>
            </div>
          </div>

          <div className="md:col-span-8">
            <p className="display-md text-ink text-[clamp(1.125rem,1.7vw,1.4375rem)] leading-[1.4]">
              &ldquo;{cs.quote}&rdquo;
            </p>
            <p className="text-muted group-hover:text-teal mt-4 inline-flex items-center gap-2 text-[0.875rem] transition-colors duration-500">
              Read the full case study
              <span className="arrow-shift">→</span>
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
