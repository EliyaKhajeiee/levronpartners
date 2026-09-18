import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { Artifact } from "@/components/Artifact";
import { ContactCta } from "@/components/ContactCta";
import { IndustryBreadcrumb } from "@/components/IndustryBreadcrumb";
import { ResourceCard } from "@/components/ResourceCard";
import { JsonLd } from "@/components/JsonLd";
import { resources, resourceBySlug, formatResourceDate } from "@/lib/resources";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = resourceBySlug(slug);
  if (!r) return {};

  const url = `/resources/${r.slug}`;

  return {
    title: r.seoTitle,
    description: r.metaDescription,
    keywords: r.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: r.seoTitle,
      description: r.metaDescription,
      url,
      publishedTime: r.date,
      authors: [r.author],
    },
    twitter: {
      card: "summary_large_image",
      title: r.seoTitle,
      description: r.metaDescription,
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = resourceBySlug(slug);
  if (!r) notFound();

  const more = resources.filter((x) => x.slug !== r.slug).slice(0, 3);

  return (
    <>
      <Reveal />
      <JsonLd
        data={articleSchema({
          headline: r.title,
          description: r.metaDescription,
          url: `/resources/${r.slug}`,
          datePublished: r.date,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Resources", url: "/resources" },
          { name: r.title, url: `/resources/${r.slug}` },
        ])}
      />

      <main id="top" className="flex-1">
        <IndustryBreadcrumb
          parentHref="/resources"
          parentLabel="Resources"
          label={r.title}
        />

        <section className="px-6 pb-[7vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-8">
              {r.contentType === "case-study" ? "Case Study" : "Guide"}
            </p>
            <h1
              data-split
              className="display optical max-w-[20ch] text-[clamp(2.125rem,5.4vw,4.25rem)]"
            >
              <Split text={r.title} />
            </h1>
            <p
              data-fade
              style={{ "--group-delay": "320ms" } as React.CSSProperties}
              className="text-muted mt-9 max-w-[58ch] text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.5] tracking-[-0.012em]"
            >
              {r.dek}
            </p>

            <div
              data-fade
              style={{ "--group-delay": "440ms" } as React.CSSProperties}
              className="text-muted mt-9 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem]"
            >
              <time dateTime={r.date}>{formatResourceDate(r.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{r.readingTime} read</span>
              <span aria-hidden="true">·</span>
              <span>{site.name}</span>
            </div>
          </div>
        </section>

        <section className="px-6 pb-[10vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <Artifact
              label={r.contentType === "case-study" ? "Case Study" : "Article"}
              title={`${r.slug}.md`}
            >
              <div className="mx-auto max-w-[68ch]">
                <div
                  className="resource-prose"
                  // Body is our own Markdown, compiled at build time — not
                  // third-party or user-submitted content.
                  dangerouslySetInnerHTML={{ __html: r.html }}
                />
              </div>
            </Artifact>
          </div>
        </section>

        {more.length > 0 && (
          <section className="border-line border-t px-6 py-[12vh] md:px-10">
            <div className="mx-auto max-w-[1500px]">
              <p data-fade className="label mb-4">
                Keep reading
              </p>
              {more.map((res, i) => (
                <ResourceCard key={res.slug} resource={res} delayMs={i * 80} />
              ))}
            </div>
          </section>
        )}

        <ContactCta />
      </main>
    </>
  );
}
