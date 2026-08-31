import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactCta } from "@/components/ContactCta";
import { IndustryHero } from "@/components/IndustryHero";
import { PointsGrid } from "@/components/PointsGrid";
import { IndustryChildren } from "@/components/IndustryChildren";
import { JsonLd } from "@/components/JsonLd";
import { taxIndustry } from "@/lib/industries";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Tax & Accounting",
  description:
    "Document intake, client status updates, and engagement paperwork — the systems that get a tax or accounting firm through its busiest season without burning out the staff doing it.",
};

const group = taxIndustry;

const stuck = [
  {
    title: "Document collection",
    body: "W2s, 1099s, and receipts trickle in over email, text, and a portal nobody fully adopted — and someone has to chase the ones still missing.",
  },
  {
    title: "“Is it done yet?”",
    body: "The same status question, asked by phone and email, pulls a preparer off billable work during the exact weeks that can least afford it.",
  },
  {
    title: "Engagement paperwork",
    body: "Organizers, engagement letters, and signatures get tracked by memory and a shared inbox instead of a system that knows what’s outstanding.",
  },
];

export default function TaxPage() {
  return (
    <>
      <Reveal />
      <JsonLd
        data={serviceSchema({
          name: "Custom Software for Tax & Accounting Firms",
          description: metadata.description as string,
          url: group.href,
          serviceType: "Tax and accounting operations software",
        })}
      />

      <main id="top" className="flex-1">
        <IndustryHero
          eyebrow={group.eyebrow}
          headline="Every busy season starts the same fire drill over again."
          headlineClassName="max-w-[19ch]"
          body="The work you actually bill for — the return, the close, the plan — is never the part that eats the season. It’s the documents you’re still missing, the status calls pulling a preparer off billable work, and the paperwork nobody has a clean view of. We map where that time is actually going and build the system that absorbs it, so the season scales without burning out the people running it."
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
        />

        <PointsGrid
          label="Where the season usually gets stuck"
          items={stuck}
        />

        <IndustryChildren group={group} />

        <ContactCta
          heading="Show us where it breaks."
          body="We’ll map what’s manual, what should stay human, and what we’d build around it."
          cta="Walk us through it"
        />
      </main>
    </>
  );
}
