import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactCta } from "@/components/ContactCta";
import { VideoHero } from "@/components/VideoHero";
import { PointsGrid } from "@/components/PointsGrid";
import { StatStrip } from "@/components/StatStrip";
import { IndustryChildren } from "@/components/IndustryChildren";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Home Services",
  description:
    "Before the job, during the job, after the job — the systems that absorb the office work every added truck creates, so adding revenue doesn’t automatically mean adding overhead.",
};

const group = industries.find((g) => g.slug === "home-services")!;

const stuck = [
  {
    title: "Before the job",
    body: "New leads need an answer. Quotes need to go out. Someone still has to keep the pricebook straight.",
  },
  {
    title: "During the job",
    body: "Dispatch changes, customer questions, job status, materials, and technician updates all need somewhere to go.",
  },
  {
    title: "After the job",
    body: "Invoices, collections, reviews, warranties, and follow-up shouldn’t depend on somebody remembering.",
  },
];

const stats = [
  { value: "15 hrs → under 5", label: "Weekly HVAC quoting time" },
  { value: "3–4 hrs/day → under 1", label: "Daily coordination" },
  { value: "50+ hrs/month back", label: "Time returned to the operation" },
];

export default function HomeServicesPage() {
  return (
    <>
      <Reveal />

      <main id="top" className="flex-1">
        <VideoHero
          eyebrow={group.eyebrow}
          headline="More trucks shouldn’t mean more office."
          headlineClassName="max-w-[17ch]"
          body="Every truck you add creates more quotes, calls, scheduling changes, follow-up, paperwork, and billing — and most of it lands on the same few people. We build the systems that absorb that work, so adding revenue doesn’t automatically mean adding overhead."
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
          videoSrc="/video/home-services-hero.mp4"
          chip={{ value: "50+ hrs/month back", label: "time returned to the operation" }}
        />

        <PointsGrid
          label="Where growth starts creating office work"
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
