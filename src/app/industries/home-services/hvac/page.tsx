import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ScrollText } from "@/components/ScrollText";
import { ContactCta } from "@/components/ContactCta";
import { ImageHero } from "@/components/ImageHero";
import { PointsGrid } from "@/components/PointsGrid";
import { StatStrip } from "@/components/StatStrip";
import { CaseStudyCallout } from "@/components/CaseStudyCallout";
import { JsonLd } from "@/components/JsonLd";
import { industries } from "@/lib/industries";
import { caseStudyBySlug } from "@/lib/caseStudies";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

const caseStudy = caseStudyBySlug("kung-fu-air-service")!;

export const metadata: Metadata = {
  title: "HVAC",
  description:
    "The repetitive scope on install quotes fills itself in — removal, flare connections, warranty language, standard inclusions — while pricing and exceptions stay with your people.",
};

const group = industries.find((g) => g.slug === "home-services")!;
const page = group.children.find((c) => c.slug === "hvac")!;

const walkthrough = [
  {
    title: "Tech captures the job",
    body: "Talk it out, dictate it, or use the information you already collect.",
  },
  {
    title: "The standard work assembles itself",
    body: "Scope language, standard inclusions, warranty terms, and repeatable work are pulled in automatically.",
  },
  {
    title: "Your team handles the judgment",
    body: "Pricing, exceptions, and anything the customer will see stay human-controlled.",
  },
];

const stats = [
  { value: "15 hrs/week → under 5", label: "Quoting" },
  { value: "3–4 hrs/day → under 1", label: "Coordination" },
];

export default function HvacPage() {
  return (
    <>
      <Reveal />
      <JsonLd
        data={serviceSchema({
          name: "Quoting Automation for HVAC Contractors",
          description: metadata.description as string,
          url: page.href,
          serviceType: "HVAC field service software",
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
          headline="Every install quote is mostly the last one."
          headlineClassName="max-w-[18ch]"
          body="Removal and disposal. Flare connections. Warranty language. Standard scope. A lot of the same work gets typed again after every walkthrough. We build around the way your techs and estimators already work, so the repetitive scope fills itself in and the judgment — especially the pricing — stays with your people."
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
          imageSrc="/photos/industries/hvac.jpg"
          chip={{ value: "15 hrs/week → under 5", label: "weekly quoting time" }}
        />

        <PointsGrid
          heading="One walkthrough. Less rebuilding."
          items={walkthrough}
        />

        <StatStrip stats={stats} />

        <CaseStudyCallout caseStudy={caseStudy} />

        <section className="px-6 py-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ScrollText
              text="That lead went to four other shops the same second it hit your phone."
              className="display-md mx-auto max-w-[22ch] text-center text-[clamp(1.75rem,4.4vw,3.5rem)]"
            />
          </div>
        </section>

        <section className="border-line border-t px-6 py-[11vh] md:px-10">
          <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2
                data-split
                className="display-md max-w-[16ch] text-[clamp(1.5rem,2.6vw,2.25rem)]"
              >
                <Split text="The quote isn’t the only place time matters." />
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p
                data-fade
                className="text-ink/75 max-w-[56ch] text-[0.9375rem] leading-[1.7]"
              >
                A homeowner fills out Yelp, Google, Angi, or your website
                after five. Your office is gone. By morning they’ve already
                talked to somebody else.
              </p>
              <p
                data-fade
                style={{ "--group-delay": "140ms" } as React.CSSProperties}
                className="text-muted mt-6 max-w-[56ch] text-[0.9375rem] leading-[1.7]"
              >
                We build the first layer of response around the information
                they actually submitted — immediate enough to keep the
                conversation alive, with your team taking over when judgment
                is required.
              </p>
            </div>
          </div>
        </section>

        <section className="border-line border-t px-6 py-[11vh] md:px-10">
          <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2
                data-split
                className="display-md max-w-[16ch] text-[clamp(1.5rem,2.6vw,2.25rem)]"
              >
                <Split text="And everything between the trucks and the office." />
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p
                data-fade
                className="text-ink/75 max-w-[56ch] text-[0.9375rem] leading-[1.7]"
              >
                Dispatch updates. Materials. Customer communication.
                Warranty paperwork. Billing.
              </p>
              <p
                data-fade
                style={{ "--group-delay": "140ms" } as React.CSSProperties}
                className="text-muted mt-6 max-w-[56ch] text-[0.9375rem] leading-[1.7]"
              >
                The goal isn’t “AI everywhere.” It’s fewer things that
                require the owner or office manager to personally move them
                forward.
              </p>
            </div>
          </div>
        </section>

        <ContactCta
          heading="Show us where it breaks."
          body="We’ll map what’s manual, what should stay human, and what we’d build around it."
          cta="Walk us through it"
        />
      </main>
    </>
  );
}
