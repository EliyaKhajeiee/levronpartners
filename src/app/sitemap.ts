import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { industries } from "@/lib/industries";
import { caseStudies } from "@/lib/caseStudies";
import { resources } from "@/lib/resources";

// Build timestamp — every route here is generated from code, not dated
// content, so a real signal beats leaving lastModified out entirely.
const BUILT = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
      { url: `${site.url}/industries`, changeFrequency: "weekly", priority: 0.95 },
      { url: `${site.url}/work`, changeFrequency: "weekly", priority: 0.85 },
      { url: `${site.url}/resources`, changeFrequency: "weekly", priority: 0.85 },
      { url: `${site.url}/process`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.65 },
      { url: `${site.url}/contact`, changeFrequency: "monthly", priority: 0.9 },
    ] satisfies MetadataRoute.Sitemap
  ).map((r) => ({ ...r, lastModified: BUILT }));

  // Industry hubs and their trade sub-pages are the primary commercial
  // landing pages — highest priority after the homepage and contact.
  const industryRoutes: MetadataRoute.Sitemap = industries.flatMap((group) => [
    {
      url: `${site.url}${group.href}`,
      lastModified: BUILT,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    ...group.children.map((child) => ({
      url: `${site.url}${child.href}`,
      lastModified: BUILT,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ]);

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${site.url}/work/${cs.slug}`,
    lastModified: BUILT,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Resources carry their own dates — unlike the rest of the site, these are
  // real publish dates, so `lastModified` should reflect the post itself
  // rather than the build.
  const resourceRoutes: MetadataRoute.Sitemap = resources.map((r) => ({
    url: `${site.url}/resources/${r.slug}`,
    lastModified: new Date(r.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...industryRoutes, ...caseStudyRoutes, ...resourceRoutes];
}
