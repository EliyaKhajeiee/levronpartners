import type { Metadata } from "next";
import Link from "next/link";
import { DemoVideo } from "./DemoVideo";

export const metadata: Metadata = {
  title: "Estimation demo",
  description:
    "3.5 weeks of preconstruction to a 2-hour handoff. ~96–98% accuracy. Anonymized. Fully custom solution for a GC.",
};

export default function EstimationDemoPage() {
  return (
    <main id="top" className="flex-1">
      <section className="px-6 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32">
        <div className="mx-auto max-w-[960px]">
          <p className="label mb-6">Estimation demo</p>
          <h1 className="display optical text-[clamp(2.15rem,4.8vw,4rem)] [text-wrap:wrap]">
            <span className="block max-w-[17ch]">3.5 weeks of preconstruction</span>
            <span className="mt-[0.12em] block">to a 2-hour handoff.</span>
          </h1>
          <p className="text-muted mt-5 text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.45]">
            ~96–98% accuracy
          </p>
          <p className="text-muted mt-2 text-[0.875rem] leading-[1.5]">
            *Anonymized. Fully custom solution for a GC.
          </p>

          <DemoVideo />

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/assessment/start?utm_source=site&utm_medium=page&utm_campaign=estimation_demo"
              className="group bg-ink pill hover:bg-teal inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold text-white"
            >
              Take the free assessment
              <span className="arrow-shift">→</span>
            </Link>
            <p className="text-muted text-[0.875rem]">About 30 seconds. No call needed.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
