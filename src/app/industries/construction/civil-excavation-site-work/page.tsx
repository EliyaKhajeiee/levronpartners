import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ScrollText } from "@/components/ScrollText";
import { ContactCta } from "@/components/ContactCta";
import { ImageHero } from "@/components/ImageHero";
import { PointsGrid } from "@/components/PointsGrid";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Civil, Excavation & Site Work",
  description:
    "Tie owned-equipment cost and change work back to the job while it’s still live, so equipment rates and unit prices are based on what actually happened.",
};

const group = industries.find((g) => g.slug === "construction")!;
const page = group.children.find((c) => c.slug === "civil-excavation-site-work")!;

const rateRisk = [
  {
    title: "Too much in the rate",
    body: "The machine has already recovered more of its ownership cost, but the internal rate never moved. Your hard bid carries cost that may no longer be real.",
  },
  {
    title: "Too little in the rate",
    body: "Owned equipment gets treated as “free.” The bid looks great until replacement time comes and the money has to come from somewhere.",
  },
];

const dataSources = ["Timecards", "Fuel", "Maintenance", "Job codes", "Ownership assumptions"];

const build = [
  {
    title: "Live job-cost feedback",
    body: "See the economics while there is still time to react.",
  },
  {
    title: "Owned-equipment visibility",
    body: "Tie actual machine cost back to the work it performed.",
  },
  {
    title: "Change-work tracking",
    body: "Know what you’re already funding before the paperwork catches up.",
  },
  {
    title: "Bid feedback loop",
    body: "Feed what actually happened back into the next unit price and hard bid.",
  },
];

export default function CivilExcavationPage() {
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
          headline="You’ll know what that job cost in three months."
          headlineClassName="max-w-[19ch]"
          body="The question is whether you know while the iron is still on site. Owned-equipment rates can be wrong in both directions: carry too much cost and you lose hard bids you should be competitive on; carry too little and replacement eventually comes straight out of profit. Same root problem: the real cost of the machine never gets tied back to the job while the work is happening."
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
          imageSrc="/photos/industries/civil-excavation-site-work.jpg"
        />

        <PointsGrid
          heading="The equipment rate can hurt you either way."
          items={rateRisk}
        />

        <section className="px-6 pb-[10vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <p
              data-fade
              className="border-line text-ink/75 max-w-[56ch] border-l pl-5 text-[0.9375rem] leading-[1.65]"
            >
              <span className="text-teal font-medium">What’s missing: </span>
              a clean view of what that specific machine actually cost on
              that specific job.
            </p>
          </div>
        </section>

        <section className="border-line border-t px-6 py-[10vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <p
              data-fade
              className="text-ink max-w-[46ch] text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.5] tracking-[-0.012em]"
            >
              The data usually already exists.
            </p>
            <div
              data-fade
              style={{ "--group-delay": "140ms" } as React.CSSProperties}
              className="mt-6 flex flex-wrap gap-2"
            >
              {dataSources.map((d) => (
                <span key={d} className="tag">
                  {d}
                </span>
              ))}
            </div>
            <p
              data-fade
              style={{ "--group-delay": "220ms" } as React.CSSProperties}
              className="text-muted mt-6 max-w-[56ch] text-[0.9375rem] leading-[1.7]"
            >
              The problem is that the pieces don’t come together until long
              after the work has been performed. We’d build the layer that
              ties them back to the job while it’s still live — so equipment
              rates and future unit prices can be based on what actually
              happened, not what everybody remembers happening.
            </p>
          </div>
        </section>

        <section className="px-6 py-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ScrollText
              text="Winning the work is only the beginning."
              className="display-md mx-auto max-w-[20ch] text-center text-[clamp(1.875rem,4.8vw,4rem)]"
            />
          </div>
        </section>

        <section className="border-line border-t border-b">
          <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-[13vh] md:grid-cols-12 md:px-10">
            <div className="md:col-span-4">
              <h2
                data-split
                className="display-md max-w-[16ch] text-[clamp(1.5rem,2.6vw,2.25rem)]"
              >
                <Split text="It rarely shows up as one giant mistake." />
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p
                data-fade
                className="text-ink/75 max-w-[56ch] text-[0.9375rem] leading-[1.7]"
              >
                Sometimes the low number wins because something wasn’t fully
                carried. Then the PM spends the job trying to manufacture
                that margin back out of thin air. A change directive gets
                worked before approval. An unforeseen condition changes
                production. The mobe fee was light. A unit price doesn’t
                cover what the field actually encountered.
              </p>
              <p
                data-fade
                style={{ "--group-delay": "140ms" } as React.CSSProperties}
                className="text-muted mt-6 max-w-[56ch] text-[0.9375rem] leading-[1.7]"
              >
                By the time final job cost explains it, the next hard bid
                may already be out.
              </p>
            </div>
          </div>
        </section>

        <PointsGrid
          label="What we’d build around"
          items={build}
        />

        <ContactCta
          heading="Show us where it breaks."
          body="We’ll map what’s manual, what should stay human, and what we’d build around it."
          cta="Walk us through it"
        />
      </main>
    </>
  );
}
