import Link from "next/link";
import { site } from "@/lib/site";
import { industries } from "@/lib/industries";
import { Wordmark } from "./Wordmark";

const links = [
  { href: "/work", label: "Work" },
  { href: "/resources", label: "Resources" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
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

/** Shared look for every link in the deck — quiet on the ink, full paper on hover. */
const linkClass = "text-paper/65 hover:text-paper transition-colors duration-300";

/** Shared look for the small caps labels ("Industries", the four values). */
const labelClass = "text-paper/45 text-[0.75rem] font-medium tracking-[0.1em] uppercase";

/**
 * The closing block — one dark plate rather than three light rows, so the
 * page ends on a clear stop instead of trailing off in more small text.
 */
export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1500px] px-6 py-10 md:px-10">
        {/* The deck's value bar, set as a ruled row rather than a slogan. */}
        <div className="border-paper/15 flex flex-wrap items-center gap-x-10 gap-y-3 border-b pb-8 md:gap-x-14">
          {values.map((v) => (
            <span key={v} className={labelClass}>
              {v}
            </span>
          ))}
          <span className="text-paper/45 w-full text-[0.8125rem] tracking-[-0.01em] md:ml-auto md:w-auto">
            {site.line}
          </span>
        </div>

        <div className="border-paper/15 flex flex-wrap items-center gap-x-7 gap-y-3 border-b py-8 text-[0.8125rem]">
          <span className={labelClass}>Industries</span>
          {industryLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-6 pt-8 text-[0.8125rem] md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-[1rem]" aria-label={site.name}>
            <Wordmark className="[&_img]:brightness-0 [&_img]:invert" />
          </Link>

          <div className="text-paper/55 flex flex-wrap items-center gap-x-7 gap-y-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
            {/* Plain <a>: /llms.txt is a text Route Handler, not an app page. */}
            <a href="/llms.txt" className={linkClass}>
              llms.txt
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
