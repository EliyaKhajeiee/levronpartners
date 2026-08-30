import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ScrollText } from "@/components/ScrollText";
import { ContactCta } from "@/components/ContactCta";
import { ImageHero } from "@/components/ImageHero";
import { PointsGrid } from "@/components/PointsGrid";
import { Artifact } from "@/components/Artifact";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Roofing",
  description:
    "The gap opens right after a good inspection — turning what the crew found into a clear next step for the homeowner, on more than one channel, with automatic follow-through.",
};

const group = industries.find((g) => g.slug === "home-services")!;
const page = group.children.find((c) => c.slug === "roofing")!;

const invested = [
  {
    title: "Marketing spend",
    body: "You paid to create the opportunity.",
  },
  {
    title: "Sales effort",
    body: "Someone canvassed, called, qualified, or followed up.",
  },
  {
    title: "Field time",
    body: "Someone drove out and inspected the property.",
  },
];

const build = [
  {
    title: "One trigger",
    body: "Inspection completed or job status changes.",
  },
  {
    title: "One clear next step",
    body: "Turn the information into a simple, branded explanation of exactly what the homeowner needs to do.",
  },
  {
    title: "Multiple channels",
    body: "Email + text rather than hoping one email gets opened.",
  },
  {
    title: "Automatic follow-through",
    body: "No action after a defined period → follow-up or internal alert.",
  },
];

export default function RoofingPage() {
  return (
    <>
      <Reveal />

      <main id="top" className="flex-1">
        <ImageHero
          breadcrumb={{
            parentHref: group.href,
            parentLabel: group.label,
            label: page.label,
          }}
          eyebrow={page.eyebrow}
          headline="The inspection isn’t where you lose the job."
          headlineClassName="max-w-[19ch]"
          body="You already paid to generate the lead, send someone out, and inspect the roof. Then the homeowner gets instructions, has to understand an insurance process they rarely deal with, and has to take the next step themselves. That’s where good inspections quietly stall."
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
          imageSrc="/photos/industries/roofing.jpg"
        />

        <PointsGrid
          heading="The expensive part has already happened."
          intro="By the time the inspection is complete, you’ve already invested:"
          items={invested}
        />

        <section className="px-6 pb-[10vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <p
              data-fade
              className="border-line text-ink/75 max-w-[56ch] border-l pl-5 text-[0.9375rem] leading-[1.65]"
            >
              Losing the homeowner after that point is one of the most
              expensive places in the funnel to lose them.
            </p>
          </div>
        </section>

        <section className="border-line border-t px-6 py-[10vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-8">
              What we saw inside one roofing workflow
            </p>
            <Artifact label="Field Note" title="workflow-review.md">
              <div className="mx-auto max-w-[62ch]">
                <p className="text-ink display-md text-[clamp(1.125rem,1.7vw,1.5rem)] leading-[1.4]">
                  The company didn’t have a lead problem. They didn’t have an
                  inspection problem.
                </p>
                <p
                  data-fade
                  style={{ "--group-delay": "160ms" } as React.CSSProperties}
                  className="text-muted mt-6 max-w-[56ch] text-[0.9375rem] leading-[1.7]"
                >
                  The gap opened afterward: an email went out with insurance
                  instructions, a separate text might tell the homeowner to
                  check it, and the team still had to remember who needed
                  another touch.
                </p>
              </div>
            </Artifact>
          </div>
        </section>

        <PointsGrid
          label="What we’d build around it"
          items={build}
        />

        <section className="px-6 py-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ScrollText
              text="It’s making it harder for a good, inspected lead to disappear simply because the homeowner didn’t know what to do next."
              className="display-md mx-auto max-w-[30ch] text-center text-[clamp(1.5rem,3.6vw,3rem)]"
            />
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
