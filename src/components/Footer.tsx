import Link from "next/link";
import { site } from "@/lib/site";
import { industries } from "@/lib/industries";
import { Wordmark } from "./Wordmark";

const links = [
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

// Flattened for the footer, since mobile has no nav dropdown to reach these
// from — this row is how a phone visitor finds a sub-industry page at all.
const industryLinks = [
  { href: "/industries", label: "Industries" },
  ...industries.flatMap((group) => [
    { href: group.href, label: group.label },
    ...group.children.map((c) => ({ href: c.href, label: c.label })),
  ]),
];

/** The four words along the bottom of the brand deck. */
const values = ["Clarity", "Precision", "Momentum", "Leverage"];

export function Footer() {
  return (
    <footer className="px-6 pb-10 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        {/* The deck's value bar, set as a ruled row rather than a slogan. */}
        <div className="border-line flex flex-wrap items-center gap-x-8 gap-y-3 border-t py-7 md:gap-x-14">
          {values.map((v) => (
            <span key={v} className="label">
              {v}
            </span>
          ))}
          <span className="text-muted w-full text-[0.8125rem] tracking-[-0.01em] md:ml-auto md:w-auto">
            {site.line}
          </span>
        </div>

        <div className="border-line flex flex-wrap items-center gap-x-7 gap-y-3 border-t py-8 text-[0.8125rem]">
          <span className="label">Industries</span>
          {industryLinks.map((l) => (
            <Link key={l.href} href={l.href} className="link-quiet">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="border-line flex flex-col gap-6 border-t pt-8 text-[0.8125rem] md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-[1rem]" aria-label={site.name}>
            <Wordmark />
          </Link>

          <div className="text-muted flex flex-wrap items-center gap-x-7 gap-y-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="link-quiet">
                {l.label}
              </Link>
            ))}
            <a href={`mailto:${site.email}`} className="link-quiet">
              {site.email}
            </a>
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
