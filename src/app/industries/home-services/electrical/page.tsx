import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ScrollText } from "@/components/ScrollText";
import { ContactCta } from "@/components/ContactCta";
import { IndustryHero } from "@/components/IndustryHero";
import { IndustryBreadcrumb } from "@/components/IndustryBreadcrumb";
import { PointsGrid } from "@/components/PointsGrid";
import { JsonLd } from "@/components/JsonLd";
import { industries } from "@/lib/industries";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Electrical",
  description:
    "Templated estimating for electrical contractors — panel upgrades, rewires, and inspection-ready bids that pull your standard pricing and code requirements automatically.",
};

const group = industries.find((g) => g.slug === "home-services")!;
const page = group.children.find((c) => c.slug === "electrical")!;

const slow = [
  {
    title: "Every bid starts from scratch",
    body: "Panel upgrades, rewires, and inspection-ready estimates get typed out again for every job, even the ones your team could price from memory.",
  },
  {
    title: "Code requirements get double-checked by hand",
    body: "Permit and code requirements vary by jurisdiction and job type, so estimating turns into a manual lookup every time instead of something the system already knows.",
  },
  {
    title: "Callback work goes untracked",
    body: "Without a record of what came back and why, repeat issues on the same panel or circuit quietly eat margin job after job.",
  },
];

const build = [
  {
    title: "Templated estimating",
    body: "Your standard pricing, panel specs, and code requirements fill themselves in, so a bid goes out while it’s still fresh instead of a day later.",
  },
  {
    title: "Code and permit lookups built in",
    body: "Jurisdiction-specific requirements get pulled automatically instead of double-checked by hand on every job.",
  },
  {
    title: "Callback and warranty tracking",
    body: "Every callback gets logged against the original job, so a pattern on the same panel or circuit shows up before it becomes a bigger warranty problem.",
  },
];

export default function ElectricalPage() {
  return (
    <>
      <Reveal />
      <JsonLd
        data={serviceSchema({
          name: "Estimating Automation for Electrical Contractors",
          description: metadata.description as string,
          url: page.href,
          serviceType: "Electrical estimating software",
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
        <IndustryBreadcrumb
          parentHref={group.href}
          parentLabel={group.label}
          label={page.label}
        />

        <IndustryHero
          eyebrow={page.eyebrow}
          headline="Your bids take too long, and slow bids lose jobs."
          headlineClassName="max-w-[18ch]"
          body="Panel upgrades, rewires, and inspection-ready estimates carry the same handful of decisions every time — what the code requires, what the standard scope is, what it costs. The problem is that knowledge gets rebuilt by hand for every bid instead of pulled from what your company already knows. We turn it into a system that prices work in minutes and tracks the callback work that’s quietly eating your margin."
          topPadding="pt-0"
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
        />

        <PointsGrid heading="Slow bids lose jobs your price would have won." items={slow} />

        <section className="px-6 py-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ScrollText
              text="The bid you send fastest is the one you’re most likely to win."
              className="display-md mx-auto max-w-[24ch] text-center text-[clamp(1.75rem,4.4vw,3.5rem)]"
            />
          </div>
        </section>

        <PointsGrid label="What we’d build around it" items={build} />

        <ContactCta
          heading="Show us where it breaks."
          body="We’ll map what’s manual, what should stay human, and what we’d build around it."
          cta="Walk us through it"
        />
      </main>
    </>
  );
}
