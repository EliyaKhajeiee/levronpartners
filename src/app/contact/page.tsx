import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a working session with Levron Partners. Bring your last ten quotes and a normal week off the schedule.",
};

const expect = [
  {
    n: "01",
    t: "Bring your last ten bids or quotes",
    b: "Won and lost. We want to see how they got priced, how long they took, and where the time went.",
  },
  {
    n: "02",
    t: "And a normal week",
    b: "Pull up the schedule, dispatch board, or job list. A normal week, not a good one. The gaps are the interesting part.",
  },
  {
    n: "03",
    t: "Leave with a read",
    b: "Where capacity is getting eaten, what should stay human, and what we’d build around the rest. No deck. No pitch.",
  },
];

// Construction and home services lead the list because that's where we're
// selling — but the list doesn't end there, and neither do the engagements.
const fit = [
  "Contractors and trades — HVAC, plumbing, electrical, mechanical and specialty contractors",
  "GCs and design-build firms winning enough work that estimating is becoming the constraint",
  "Service businesses where five minutes on a new lead can be the difference between booked and gone",
  "Operations where the office spends its day retyping, routing, or chasing information the field already created",
  "Owners who want more capacity, not another dashboard nobody opens",
];

export default function ContactPage() {
  return (
    <>
      <Reveal />

      <main id="top" className="flex-1">
        <section className="px-6 pt-[22vh] pb-[8vh] md:px-10 md:pt-[26vh]">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-8">
              Contact
            </p>
            <h1
              data-split
              className="display optical max-w-[13ch] text-[clamp(2.5rem,7.4vw,6.5rem)]"
            >
              <Split text="Let’s find the hours." />
            </h1>

            <p
              data-fade
              style={{ "--group-delay": "400ms" } as React.CSSProperties}
              className="text-muted mt-12 max-w-[44ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.45] tracking-[-0.015em] md:mt-16"
            >
              Forty-five minutes, on a call, with the people who actually run
              the work. We&rsquo;ll tell you plainly whether there&rsquo;s
              something here worth building.
            </p>
          </div>
        </section>

        <section className="px-6 py-[10vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-12">
              What to expect
            </p>

            <div className="grid gap-12 md:grid-cols-3 md:gap-10">
              {expect.map((e, i) => (
                <div
                  key={e.n}
                  data-fade
                  style={
                    { "--group-delay": `${i * 140}ms` } as React.CSSProperties
                  }
                >
                  <div className="bg-line mb-6 h-px w-full" />
                  <div className="text-teal text-[0.75rem] tabular-nums">
                    {e.n}
                  </div>
                  <h2 className="display-md mt-4 text-[clamp(1.25rem,2vw,1.75rem)]">
                    {e.t}
                  </h2>
                  <p className="text-muted mt-4 max-w-[36ch] text-[0.9375rem] leading-[1.65]">
                    {e.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-[16vh] md:px-10">
          <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-12">
            <h2
              data-split
              className="display-md text-[clamp(1.5rem,2.6vw,2.25rem)] md:col-span-4"
            >
              <Split text="Who this is for" />
            </h2>

            <ul className="md:col-span-7 md:col-start-6">
              {fit.map((item, i) => (
                <li
                  key={item}
                  data-fade
                  style={
                    { "--group-delay": `${i * 90}ms` } as React.CSSProperties
                  }
                  className="border-line flex items-start gap-5 border-b py-5 first:border-t"
                >
                  <span className="text-teal mt-1 shrink-0 text-[0.75rem] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="form" className="border-line border-t px-6 py-[14vh] md:px-10">
          <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p data-fade className="label mb-4">
                Get in touch
              </p>
              <h2
                data-split
                className="display-md max-w-[16ch] text-[clamp(1.5rem,2.6vw,2.25rem)]"
              >
                <Split text="Tell us about your operation." />
              </h2>
              <p
                data-fade
                style={{ "--group-delay": "160ms" } as React.CSSProperties}
                className="text-muted mt-5 max-w-[36ch] text-[0.9375rem] leading-[1.65]"
              >
                Share your email and company. We&rsquo;ll follow up to
                schedule a structured diagnostic of how your business
                actually runs.
              </p>
            </div>

            <div
              data-fade
              style={{ "--group-delay": "220ms" } as React.CSSProperties}
              className="md:col-span-6 md:col-start-6"
            >
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
