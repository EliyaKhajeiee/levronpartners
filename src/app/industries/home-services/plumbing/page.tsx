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
  title: "Plumbing",
  description:
    "Instant lead response and a live dispatch board for plumbing contractors — so the emergency call goes to your truck, not the shop that called back first.",
};

const group = industries.find((g) => g.slug === "home-services")!;
const page = group.children.find((c) => c.slug === "plumbing")!;

const lost = [
  {
    title: "After-hours calls go to voicemail",
    body: "A pipe bursts at ten at night. The homeowner calls the first number that answers — and a competitor picks up while you’re asleep or on another job.",
  },
  {
    title: "Every quote starts from a blank page",
    body: "Fixture specs, labor, and permit costs get typed out again for every job, even the ones you’ve priced a hundred times before.",
  },
  {
    title: "Dispatch runs on group texts",
    body: "Nobody has a clean view of which truck is closest to the next emergency, so routing happens by whoever answers the text first.",
  },
];

const build = [
  {
    title: "Instant lead response",
    body: "Every call and form fill gets acknowledged the moment it comes in, even at 2am — before the homeowner tries the next name on the list.",
  },
  {
    title: "A live dispatch board",
    body: "See every truck and every open job in one place, so the closest available tech gets routed without a round of phone calls.",
  },
  {
    title: "Templated estimating",
    body: "Fixture specs, standard labor, and permit costs fill themselves in from your own pricing — so a quote goes out in minutes, not after the next job.",
  },
];

export default function PlumbingPage() {
  return (
    <>
      <Reveal />
      <JsonLd
        data={serviceSchema({
          name: "Dispatch & Lead Response Software for Plumbing Contractors",
          description: metadata.description as string,
          url: page.href,
          serviceType: "Plumbing dispatch software",
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
          headline="Stop losing emergency calls to the plumber who calls back first."
          headlineClassName="max-w-[19ch]"
          body="A burst pipe doesn’t wait for business hours, and neither does the homeowner looking for someone to fix it. Whoever answers first usually gets the job — price doesn’t come into it. We build the response and dispatch layer that makes sure that’s you, and the estimating system that gets a number back to them before they’ve called anyone else."
          topPadding="pt-0"
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
        />

        <PointsGrid heading="The job usually goes before you even hear about it." items={lost} />

        <section className="px-6 py-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ScrollText
              text="Speed answers the phone faster than price ever will."
              className="display-md mx-auto max-w-[22ch] text-center text-[clamp(1.75rem,4.4vw,3.5rem)]"
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
