import Link from "next/link";
import { Split } from "./Split";
import type { Resource } from "@/lib/resources";
import { formatResourceDate } from "@/lib/resources";

/**
 * The one promoted post at the top of `/resources` — set via `featured:
 * true` in that post's frontmatter. Bigger type and a bordered panel so it
 * reads as the pick of the shelf, not just the first row of the list below
 * it (`ResourceCard`).
 */
export function FeaturedResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      data-fade
      className="group border-line block overflow-hidden rounded-[1.75rem] border bg-white/45 p-8 md:p-14"
    >
      <p className="label mb-7">
        Featured {resource.contentType === "case-study" ? "case study" : "guide"}
      </p>

      <h2
        data-split
        className="display-md max-w-[20ch] text-[clamp(1.75rem,4vw,3.25rem)]"
      >
        <Split text={resource.title} />
      </h2>

      <p className="text-muted mt-7 max-w-[62ch] text-[clamp(1rem,1.4vw,1.1875rem)] leading-[1.55] tracking-[-0.01em]">
        {resource.dek}
      </p>

      <div className="text-muted mt-9 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem]">
        <time dateTime={resource.date}>
          {formatResourceDate(resource.date)}
        </time>
        <span aria-hidden="true">·</span>
        <span>{resource.readingTime} read</span>
      </div>

      <div className="text-teal mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-semibold">
        Read the {resource.contentType === "case-study" ? "case study" : "guide"}
        <span className="arrow-shift">→</span>
      </div>
    </Link>
  );
}
