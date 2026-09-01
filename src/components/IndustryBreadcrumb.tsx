import Link from "next/link";

/**
 * A quiet trail back to the group hub, sitting above the hero eyebrow on
 * every sub-industry page — "General Contractors & Design-Build" should
 * never read as detached from "Construction".
 */
export function IndustryBreadcrumb({
  parentHref,
  parentLabel,
  label,
}: {
  parentHref: string;
  parentLabel: string;
  label: string;
}) {
  return (
    <div className="px-6 pt-[max(7.5rem,16vh)] pb-6 md:px-10 md:pt-[20vh]">
      <div className="mx-auto flex max-w-[1500px] items-center gap-2 text-[0.8125rem]">
        <Link href={parentHref} className="link-quiet">
          {parentLabel}
        </Link>
        <span className="text-muted" aria-hidden="true">
          /
        </span>
        <span className="text-muted">{label}</span>
      </div>
    </div>
  );
}
