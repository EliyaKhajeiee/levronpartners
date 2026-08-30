import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ContactCta } from "@/components/ContactCta";
import { ImageHero } from "@/components/ImageHero";
import { PointsGrid } from "@/components/PointsGrid";
import { StatStrip } from "@/components/StatStrip";
import { Artifact } from "@/components/Artifact";
import { JsonLd } from "@/components/JsonLd";
import { industries } from "@/lib/industries";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "General Contractors & Design-Build",
  description:
    "Turn historical pricing, takeoffs and project operations into a system the company owns — without changing how you actually price or build.",
};

const group = industries.find((g) => g.slug === "construction")!;
const page = group.children.find(
  (c) => c.slug === "general-contractors-design-build",
)!;

const methodology = [
  {
    title: "Historical pricing",
    body: "Clean and structure years of cost data so the next estimate starts with what your company already knows.",
  },
  {
    title: "Takeoff → estimate",
    body: "Use the takeoff platform you want. We build the layer that puts your pricing behind the quantities and your output format in front of them.",
  },
  {
    title: "Project operations",
    body: "Connect estimating to the work after award — project admin, job costing, billing, and the workflows required to grow without rebuilding the office.",
  },
];

const stats = [
  { value: "Another home / year", label: "Capacity without another hire" },
  { value: "Days → 10 minutes", label: "Takeoff through estimate" },
  { value: "50+ hrs / month back", label: "Coordination" },
];

export default function GeneralContractorsPage() {
  return (
    <>
      <Reveal />
      <JsonLd
        data={serviceSchema({
          name: "Estimating & Project Ops Software for General Contractors",
          description: metadata.description as string,
          url: page.href,
          serviceType: "Construction estimating software",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Industries", url: "/industries" },
          { name: group.label, url: group.href },
          { name: page.label, url: page.href },
        ])}
      />

      <main id="top" className="flex-1">
        <ImageHero
          breadcrumb={{
            parentHref: group.href,
            parentLabel: group.label,
            label: page.label,
          }}
          eyebrow={page.eyebrow}
          headline="The estimate shouldn’t start over every time."
          headlineClassName="max-w-[17ch]"
          body="Your best people already know what things cost, how you build, which assemblies work, and where projects usually go sideways. The problem is that knowledge still lives across spreadsheets, old jobs, and individual judgment. We turn it into a system the company owns — without changing how you actually price or build."
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "Read the case study", href: "#case-study" },
          ]}
          imageSrc="/photos/industries/general-contractors-design-build.jpg"
          chip={{ value: "Another home / year", label: "capacity without another hire" }}
        />

        <PointsGrid
          heading="Your methodology stays. The manual assembly doesn’t."
          items={methodology}
        />

        <section id="case-study" className="px-6 py-[10vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-8">
              Featured case study
            </p>
            <Artifact
              label="Case Study"
              title="case-study.md"
              footnote="Result: enough additional bandwidth to take on another home a year."
            >
              <div className="mx-auto max-w-[62ch]">
                <h2
                  data-split
                  className="display-md text-[clamp(1.5rem,2.8vw,2.5rem)]"
                >
                  <Split text="40 years of knowing what things cost." />
                </h2>
                <p
                  data-fade
                  style={{ "--group-delay": "120ms" } as React.CSSProperties}
                  className="text-muted mt-4 text-[1.0625rem]"
                >
                  36 spreadsheets. One estimator’s head.
                </p>
                <p
                  data-fade
                  style={{ "--group-delay": "220ms" } as React.CSSProperties}
                  className="text-ink/75 mt-8 max-w-[52ch] text-[0.9375rem] leading-[1.7]"
                >
                  Nothing about the builder’s pricing methodology changed. It
                  simply stopped depending on one person being available.
                </p>
              </div>
            </Artifact>
          </div>
        </section>

        <StatStrip stats={stats} />

        <ContactCta
          heading="Show us where it breaks."
          body="We’ll map what’s manual, what should stay human, and what we’d build around it."
          cta="Walk us through it"
        />
      </main>
    </>
  );
}
