import Image from "next/image";
import Link from "next/link";
import type { Resource } from "@/lib/resources";
import { formatResourceDate } from "@/lib/resources";

/**
 * One article in the Resources grid — the same shape as the Labs library:
 * cover on top when the post has one, then the type, title, excerpt, and
 * the date. Posts without a cover stay text-only rather than showing an
 * empty frame.
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
      className="group border-line flex h-full flex-col overflow-hidden rounded-[1.25rem] border bg-white/45"
    >
      {resource.coverImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/40">
          <Image
            src={resource.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <p className="label">
          {resource.contentType === "case-study" ? "Case Study" : "Guide"}
        </p>
        <h3 className="display-md mt-4 text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.2]">
          {resource.title}
        </h3>
        <p className="text-muted mt-3 line-clamp-3 flex-1 text-[0.9375rem] leading-[1.6]">
          {resource.dek}
        </p>
        <div className="text-muted border-line mt-5 flex items-center justify-between gap-3 border-t pt-4 text-[0.8125rem]">
          <span>{resource.readingTime} read</span>
          <time dateTime={resource.date}>{formatResourceDate(resource.date)}</time>
        </div>
      </div>
    </Link>
  );
}
