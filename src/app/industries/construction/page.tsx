import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactCta } from "@/components/ContactCta";
import { VideoHero } from "@/components/VideoHero";
import { PointsGrid } from "@/components/PointsGrid";
import { StatStrip } from "@/components/StatStrip";
import { IndustryChildren } from "@/components/IndustryChildren";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Construction",
  description:
    "Preconstruction, project administration and job costing — turning your costs, assemblies and project history into systems that price work faster and keep jobs moving.",
};

const group = industries.find((g) => g.slug === "construction")!;

const stuck = [
  {
    title: "Preconstruction",
    body: "Historical pricing lives across spreadsheets, old estimates, and people’s heads. Every new bid becomes another reconstruction project.",
  },
  {
    title: "Project administration",
    body: "RFIs, updates, schedules, documents, and follow-ups keep flowing through the same few people.",
  },
  {
    title: "Job costing",
    body: "You know what you bid. Knowing what the job is actually costing while it’s running is harder.",
  },
];

const stats = [
  { value: "Another home / year", label: "Capacity freed without adding headcount" },
  { value: "Days → 10 minutes", label: "Takeoff through estimate" },
  { value: "50+ hrs / month back", label: "Coordination reduced from 3–4 hrs/day to under 1" },
];

export default function ConstructionPage() {
  return (
    <>
      <Reveal />

      <main id="top" className="flex-1">
        <VideoHero
          eyebrow={group.eyebrow}
          headline="Every job still starts from scratch."
          headlineClassName="max-w-[17ch]"
          body="You’ve built hundreds of them. Yet the next estimate, job-cost report, or project update still depends on someone rebuilding what the company already knows. We turn your costs, assemblies, project history, and operating knowledge into systems that price work faster, keep jobs moving, and show you where the money is going while there’s still time to do something about it."
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
          videoSrc="/video/construction-hero.mp4"
          chip={{ value: "50+ hrs/month back", label: "coordination, reduced from 3–4 hrs/day to under 1" }}
        />

        <PointsGrid
          label="Where the work usually gets stuck"
          items={stuck}
        />

        <StatStrip stats={stats} />

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
