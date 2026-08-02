import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="px-6 pb-10 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="border-line flex flex-col gap-6 border-t pt-8 text-[0.8125rem] md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="display text-[1.0625rem] tracking-[-0.04em]"
          >
            Levron Partners
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
