import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * The Resources / blog library. Source files live as plain Markdown +
 * frontmatter in `content/resources/*.md` — no CMS yet, so this is the
 * lightest thing that lets a new post ship as one new file.
 *
 * Each file's body starts at its first `##` section — the H1 title and the
 * bold "dek" paragraph live in frontmatter instead (`title`, `dek`), same
 * as every other page on the site keeping its hero copy as data, not markup.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "resources");

export type ResourceContentType = "guide" | "case-study";

export type Resource = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: string;
  contentType: ResourceContentType;
  tags: string[];
  /** ISO date (YYYY-MM-DD) — every post here is backdated to when it was
   *  actually written, not the day it happened to get wired into the site. */
  date: string;
  author: string;
  readingTime: string;
  /** The bold lead paragraph under the H1 — doubles as the hero body and the
   *  card excerpt. */
  dek: string;
  /** Rendered HTML body (everything after the dek), for `.resource-prose`. */
  html: string;
  /** Pulled out into its own card at the top of `/resources`. At most one
   *  post should carry this at a time — set it in that post's frontmatter. */
  featured: boolean;
  /** Public path used as the card preview, the image on the article, and
   *  the Open Graph image. Keep these under `/images`, not `/resources` —
   *  that URL is the article route, so a file there never gets served.
   *  Omit and the card is text-only. */
  coverImage?: string;
};

function loadResource(filename: string): Resource {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug: data.slug as string,
    title: data.title as string,
    seoTitle: (data.seoTitle as string) ?? (data.title as string),
    metaDescription: data.metaDescription as string,
    category: data.category as string,
    contentType: (data.contentType as ResourceContentType) ?? "guide",
    tags: (data.tags as string[]) ?? [],
    date: String(data.date),
    author: (data.author as string) ?? "Levron Partners",
    readingTime: data.readingTime as string,
    dek: data.dek as string,
    html: marked.parse(content, { async: false }) as string,
    featured: Boolean(data.featured),
    coverImage: (data.coverImage as string | undefined) || undefined,
  };
}

/** Sorted newest-first — the order the index page and sitemap both use. */
export const resources: Resource[] = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".md"))
  .map(loadResource)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function resourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function formatResourceDate(iso: string): string {
  // Parsed as UTC and formatted back without a timezone conversion, so a
  // post dated 2026-08-05 reads as August 5 everywhere, not August 4
  // somewhere west of the server.
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
