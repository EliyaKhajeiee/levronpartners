import Link from "next/link";
import type { Resource } from "@/lib/resources";
import { formatResourceDate } from "@/lib/resources";

/**
 * One row in the Resources index (and the "keep reading" strip at the
 * bottom of an article) — mirrors the case-study card on `/work`: label,
 * title with the arrow-on-hover, one line of excerpt, then the meta row.
 */
export function ResourceCard({
  resource,
  delayMs = 0,
}: {
  resource: Resource;
  delayMs?: number;
}) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      data-fade
      style={{ "--group-delay": `${delayMs}ms` } as React.CSSProperties}
      className="group border-line block border-t py-10 first:border-t"
    >
      <p className="label">
        {resource.contentType === "case-study" ? "Case Study" : "Guide"}
      </p>
      <h3 className="display-md mt-5 flex items-start gap-4 text-[clamp(1.1875rem,2.2vw,1.625rem)]">
        <span className="max-w-[42ch]">{resource.title}</span>
        <span className="arrow-shift text-teal mt-1 shrink-0">→</span>
      </h3>
      <p className="text-muted mt-3 max-w-[62ch] text-[0.9375rem] leading-[1.6]">
        {resource.dek}
      </p>
      <div className="text-muted mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem]">
        <time dateTime={resource.date}>
          {formatResourceDate(resource.date)}
        </time>
        <span aria-hidden="true">·</span>
        <span>{resource.readingTime} read</span>
      </div>
    </Link>
  );
}
