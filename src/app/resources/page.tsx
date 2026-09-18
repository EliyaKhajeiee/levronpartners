import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ContactCta } from "@/components/ContactCta";
import { ResourceCard } from "@/components/ResourceCard";
import { FeaturedResourceCard } from "@/components/FeaturedResourceCard";
import { JsonLd } from "@/components/JsonLd";
import { resources } from "@/lib/resources";
import { breadcrumbSchema } from "@/lib/schema";

// Newest first already, so falling back to `resources[0]` when nothing is
// explicitly flagged still promotes the most recent post.
const featured = resources.find((r) => r.featured) ?? resources[0];
const rest = resources.filter((r) => r.slug !== featured?.slug);

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Field notes on lead response, quoting, and job management for contractors and home service businesses — plus the real case studies behind the numbers.",
};

export default function ResourcesPage() {
  return (
    <>
      <Reveal />
      <JsonLd
        data={breadcrumbSchema([{ name: "Resources", url: "/resources" }])}
      />

      <main id="top" className="flex-1">
        <section className="px-6 pt-[22vh] pb-[8vh] md:px-10 md:pt-[26vh]">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-8">
              Resources
            </p>
            <h1
              data-split
              className="display optical max-w-[16ch] text-[clamp(2.5rem,7.4vw,6.5rem)]"
            >
              <Split text="What we’re learning from the work." />
            </h1>
            <p
              data-fade
              style={{ "--group-delay": "320ms" } as React.CSSProperties}
              className="text-muted mt-10 max-w-[52ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.45] tracking-[-0.015em]"
            >
              Here are tips and lessons from our work with contractors and
              home service businesses. These can help you save time, improve
              your operations, and apply new tools effectively.
            </p>
          </div>
        </section>

        {featured && (
          <section className="px-6 pb-[8vh] md:px-10">
            <div className="mx-auto max-w-[1500px]">
              <FeaturedResourceCard resource={featured} />
            </div>
          </section>
        )}

        <section className="px-6 pb-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            {rest.map((r, i) => (
              <ResourceCard key={r.slug} resource={r} delayMs={i * 60} />
            ))}
          </div>
        </section>

        <ContactCta />
      </main>
    </>
  );
}
