import { site } from "./site";

/**
 * Schema.org builders for the JSON-LD blocks rendered by `JsonLd`.
 *
 * Kept intentionally thin — only the fields we can state as fact. No
 * `aggregateRating`, no invented `areaServed`, no review markup pulled from
 * copy that was never structured as a review. Same "real or absent" rule the
 * rest of the site holds content to.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    slogan: site.promise,
  };
}

/**
 * One service offering — a construction/home-service industry page or one of
 * its trade sub-pages. `url` should be the page's own canonical path.
 */
export function serviceSchema({
  name,
  description,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    name,
    description,
    url: `${site.url}${url}`,
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
    },
    areaServed: "US",
  };
}

/** A page's position in the Industries hierarchy, oldest ancestor first. */
export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}
