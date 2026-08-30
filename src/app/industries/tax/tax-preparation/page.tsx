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
  title: "Tax Preparation & Planning",
  description:
    "Automated document intake and self-serve status updates for tax preparation firms — so the busiest weeks of the year go to preparing returns, not chasing paperwork.",
};

const group = industries.find((g) => g.slug === "tax")!;
const page = group.children.find((c) => c.slug === "tax-preparation")!;

const lost = [
  {
    title: "Half the season goes to chasing documents",
    body: "The return can’t start until the W2s, 1099s, and receipts are all in — and getting there means emailing, texting, and calling the same clients more than once.",
  },
  {
    title: "Every status question interrupts billable work",
    body: "“Is my return done yet?” doesn’t wait for a good time to ask, and answering it pulls a preparer off the return that’s actually due.",
  },
  {
    title: "Engagement letters get signed whenever someone remembers",
    body: "Without a system tracking what’s out for signature, a return can sit ready to file while the paperwork authorizing it is still in someone’s inbox.",
  },
];

const build = [
  {
    title: "Automated document intake",
    body: "A checklist per client that chases the missing pieces on its own — no preparer has to remember who still owes what.",
  },
  {
    title: "Self-serve status updates",
    body: "Clients see where their return actually stands without a call, so the question never reaches your desk.",
  },
  {
    title: "Engagement letters that track themselves",
    body: "Sent, opened, signed — visible at a glance, so nothing sits ready to file behind a signature nobody chased.",
  },
];

export default function TaxPreparationPage() {
  return (
    <>
      <Reveal />
      <JsonLd
        data={serviceSchema({
          name: "Document Intake & Status Automation for Tax Preparation Firms",
          description: metadata.description as string,
          url: page.href,
          serviceType: "Tax preparation software",
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
          headline="Half your season goes to chasing documents, not preparing returns."
          headlineClassName="max-w-[19ch]"
          body="A return can’t start until the file is complete, and getting there today means emailing, texting, and calling the same client more than once. We build the intake and status layer that chases the missing pieces automatically and answers “is it done yet” before anyone has to ask — so the hours you have during the season go to the returns, not the paperwork around them."
          topPadding="pt-0"
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
        />

        <PointsGrid heading="The season is short. Most of it goes to the wrong thing." items={lost} />

        <section className="px-6 py-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ScrollText
              text="A missing W2 shouldn’t cost you a billable hour to find."
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
