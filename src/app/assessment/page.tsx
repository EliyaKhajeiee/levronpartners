import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { PointsGrid } from "@/components/PointsGrid";
import { ContactCta } from "@/components/ContactCta";

export const metadata: Metadata = {
  title: "Free Assessment",
  description:
    "A free, two-minute assessment for construction and home service operations — a maturity score, an estimate of what manual work is costing you, and a roadmap.",
};

const points = [
  {
    title: "A maturity score",
    body: "Infrastructure, process, and metrics — scored against how construction and home service operations actually run, not a generic benchmark.",
  },
  {
    title: "A dollar estimate",
    body: "What manual work, missed leads, or slow follow-up are probably costing you a year, and where it's coming from.",
  },
  {
    title: "A roadmap",
    body: "Three concrete moves, in order, sized to where your operation actually is right now — not a generic maturity checklist.",
  },
];

export default function AssessmentLandingPage() {
  return (
    <>
      <Reveal />

      <main id="top" className="flex-1">
        <section className="px-6 pt-[22vh] pb-[8vh] md:px-10 md:pt-[26vh]">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-8">
              Free Assessment
            </p>
            <h1 data-split className="display optical max-w-[16ch] text-[clamp(2.5rem,7.4vw,6.5rem)]">
              <Split text="Where are the hours going?" />
            </h1>
            <p
              data-fade
              style={{ "--group-delay": "400ms" } as React.CSSProperties}
              className="text-muted mt-12 max-w-[46ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.45] tracking-[-0.015em] md:mt-16"
            >
              Nine questions about how your operation actually runs. Two minutes, no cost — leave with a score, a
              dollar estimate, and a plan.
            </p>

            <div
              data-fade
              style={{ "--group-delay": "560ms" } as React.CSSProperties}
              className="mt-10 flex flex-wrap items-center gap-6 md:mt-14"
            >
              <Link
                href="/assessment/start"
                className="group bg-ink pill hover:bg-teal inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold text-white"
              >
                Start the assessment
                <span className="arrow-shift">→</span>
              </Link>
              <p className="text-muted text-[0.875rem]">Built for construction and home service operations.</p>
            </div>
          </div>
        </section>

        <PointsGrid label="What you'll get" items={points} />

        <ContactCta
          heading="Or just talk to us."
          body="If a quiz isn't your thing, skip straight to a working session — same read, on a call."
          cta="Talk to us instead"
        />
      </main>
    </>
  );
}
