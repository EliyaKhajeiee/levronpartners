import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { Magnetic } from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a working session with Levron Partners. Bring your last ten bids and a dispatch board.",
};

const expect = [
  {
    n: "01",
    t: "Bring your last ten bids",
    b: "Won and lost. We want to see how long each took to price and where the time went.",
  },
  {
    n: "02",
    t: "And a dispatch board",
    b: "A normal week, not a good one. The gaps are the interesting part.",
  },
  {
    n: "03",
    t: "Leave with a read",
    b: "Where the throughput is going and what it would take to get it back. No deck, no pitch.",
  },
];

const fit = [
  "Mechanical, HVAC, plumbing and electrical contractors doing $5M+",
  "GCs and design-build firms bidding more than they can price",
  "Service shops where speed-to-lead decides the close",
  "Owners who want leverage, not another dashboard nobody opens",
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

            <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
              <p
                data-fade
                style={{ "--group-delay": "400ms" } as React.CSSProperties}
                className="text-muted max-w-[44ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.45] tracking-[-0.015em]"
              >
                Forty-five minutes, on a call, with the people who actually run
                the work. We&rsquo;ll tell you plainly whether there&rsquo;s
                something here worth building.
              </p>

              <div
                data-fade
                style={{ "--group-delay": "520ms" } as React.CSSProperties}
                className="flex flex-wrap items-center gap-4"
              >
                <Magnetic strength={0.24}>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-ink pill hover:bg-teal inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold text-white"
                  >
                    Book a working session
                    <span className="arrow-shift">→</span>
                  </a>
                </Magnetic>

                <a
                  href={`mailto:${site.email}`}
                  className="border-line text-ink hover:border-teal hover:text-teal inline-flex items-center rounded-full border px-7 py-4 text-[0.9375rem] transition-colors duration-500"
                >
                  {site.email}
                </a>
              </div>
            </div>
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
      </main>
    </>
  );
}
