import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ScrollText } from "@/components/ScrollText";
import { ContactCta } from "@/components/ContactCta";
import { IndustryHero } from "@/components/IndustryHero";
import { IndustryBreadcrumb } from "@/components/IndustryBreadcrumb";
import { PointsGrid } from "@/components/PointsGrid";
import { JsonLd } from "@/components/JsonLd";
import { industries } from "@/lib/industries";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Bookkeeping & Accounting",
  description:
    "Categorization review queues, client-facing reporting, and a close checklist that runs itself — so a client’s books get closed on a schedule, not whenever there’s a spare afternoon.",
};

const group = industries.find((g) => g.slug === "tax")!;
const page = group.children.find((c) => c.slug === "bookkeeping-accounting")!;

const slow = [
  {
    title: "Categorization backs up every month",
    body: "Bank feeds keep flowing, but reviewing and coding each transaction still depends on someone getting to it — so the backlog resets right when the next month starts.",
  },
  {
    title: "Clients ask questions your reports should already answer",
    body: "“What did we spend on that this quarter?” shouldn’t require pulling a report by hand every time a client wants to know.",
  },
  {
    title: "Close happens whenever someone gets to it",
    body: "Without a checklist that tracks itself, one client’s books close on time and another’s slip a week — and nobody notices until it’s overdue.",
  },
];

const build = [
  {
    title: "A categorization review queue",
    body: "Transactions get pre-coded from the patterns your firm already uses, so review is a quick check instead of starting from a blank ledger.",
  },
  {
    title: "Client-facing reporting",
    body: "Clients see their own numbers on a schedule, without a call — the question gets answered before it’s asked.",
  },
  {
    title: "A close checklist that runs itself",
    body: "Every client’s month-end tracked against the same standard, so a close doesn’t slip because nobody was watching the calendar.",
  },
];

export default function BookkeepingAccountingPage() {
  return (
    <>
      <Reveal />
      <JsonLd
        data={serviceSchema({
          name: "Close Automation for Bookkeeping & Accounting Firms",
          description: metadata.description as string,
          url: page.href,
          serviceType: "Bookkeeping and accounting operations software",
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
          headline="Closing the books shouldn’t take longer than the month it covers."
          headlineClassName="max-w-[19ch]"
          body="Categorization, reconciliation, and client reporting carry the same handful of decisions every month — decisions your firm has already made a hundred times. The problem is that they still get made by hand, one transaction and one client at a time. We build the review queue, the client-facing reporting, and the close checklist that keep every client on the same schedule, whether it’s one bookkeeper’s caseload or twenty."
          topPadding="pt-0"
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
        />

        <PointsGrid heading="The backlog resets before last month’s is even closed." items={slow} />

        <section className="px-6 py-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ScrollText
              text="A close that depends on memory is a close that eventually slips."
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
