import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ScrollText } from "@/components/ScrollText";
import { Magnetic } from "@/components/Magnetic";
import {
  TakeoffPanel,
  DispatchPanel,
  EstimatePanel,
  CostPanel,
  DocPanel,
  ThreadPanel,
} from "@/components/Panels";

const work = [
  {
    n: "01",
    title: "Estimating",
    body: "Drawings and spec books in, a priced and defensible bid out — the day the invitation lands, on your assemblies and your labor rates.",
    tags: ["Takeoff", "Assembly pricing", "Proposals"],
    panel: <EstimatePanel />,
  },
  {
    n: "02",
    title: "Job costing",
    body: "Field hours and material land against the estimate nightly, so a labor overrun surfaces on day three instead of at closeout.",
    tags: ["Cost capture", "Variance alerts", "Payroll sync"],
    panel: <CostPanel />,
  },
  {
    n: "03",
    title: "Document agents",
    body: "Submittals, O&Ms and change orders read on arrival. The numbers that matter get pulled out and routed to whoever needs them.",
    tags: ["Submittals", "Change orders", "Compliance"],
    panel: <DocPanel />,
  },
  {
    n: "04",
    title: "Follow-up",
    body: "Every missed call answered, every quote chased, nothing waiting on someone remembering to pick the phone back up.",
    tags: ["Speed to lead", "Quoting", "Booking"],
    panel: <ThreadPanel />,
  },
];

const beats = [
  {
    k: "01 — Map",
    t: "We watch how it actually runs.",
    b: "Ride-alongs, estimator screen-shares, the last hundred jobs. We come back with the three constraints capping your throughput and what each one costs you.",
  },
  {
    k: "02 — Build",
    t: "Working software in weeks.",
    b: "The highest-leverage system first, in front of real jobs inside a month. You review it on your own data, not in a deck.",
  },
  {
    k: "03 — Compound",
    t: "Then it gets sharper.",
    b: "Estimating data feeds job costing; job costing sharpens the next bid. We stay on while the advantage compounds instead of decaying.",
  },
];

export default function Home() {
  return (
    <>
      <Reveal />
      <Nav />

      <main id="top" className="flex-1">
        {/* ───────────── Hero ───────────── */}
        <section className="px-6 pt-[19vh] pb-16 md:px-10 md:pt-[21vh]">
          <div className="mx-auto max-w-[1500px]">
            <h1 className="display text-[clamp(2.75rem,10.4vw,9.5rem)] lowercase">
              <span data-split className="block">
                <Split text="Same crew." />
              </span>

              <span className="mt-3 flex flex-col gap-6 md:mt-5 md:flex-row md:items-end md:gap-10">
                {/* The panel sits inside the headline, ode-style */}
                <span
                  data-rise
                  style={{ "--group-delay": "420ms" } as React.CSSProperties}
                  className="card lift block aspect-[4/3] w-full shrink-0 md:w-[30%] md:min-w-[300px]"
                >
                  <TakeoffPanel />
                </span>

                <span data-split className="block pb-1 md:pb-3">
                  <Split text="More capacity." start={2} />
                </span>
              </span>
            </h1>

            <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
              <p
                data-fade
                style={{ "--group-delay": "620ms" } as React.CSSProperties}
                className="text-ink/75 text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-[1.5] tracking-[-0.012em] md:col-span-5"
              >
                We find where your operation is leaking hours, then build the
                software that removes them. Custom to how your business
                actually runs.
              </p>

              <div
                data-fade
                style={{ "--group-delay": "740ms" } as React.CSSProperties}
                className="flex items-start gap-6 md:col-span-4 md:col-start-9 md:justify-end"
              >
                <Magnetic strength={0.24}>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-ink pill inline-flex items-center gap-3 rounded-full px-7 py-4 text-[0.9375rem] font-semibold text-white hover:bg-[#332f2a]"
                  >
                    Get started
                    <span className="arrow-shift">→</span>
                  </a>
                </Magnetic>
              </div>
            </div>

            <div className="mt-20 flex flex-col items-center gap-3 md:mt-28">
              <span className="label text-[0.6875rem]">Scroll</span>
              <div className="scroll-cue h-16 w-px">
                <span />
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Intro ───────────── */}
        <section className="px-6 py-[10vh] md:px-10">
          <div className="mx-auto grid max-w-[1500px] items-center gap-10 md:grid-cols-12 md:gap-14">
            <div
              data-rise
              className="card-dark aspect-[4/3] md:col-span-5 md:aspect-[5/4]"
            >
              <DispatchPanel />
            </div>

            <h2
              data-split
              className="display-md text-[clamp(1.75rem,3.5vw,3.125rem)] md:col-span-6 md:col-start-7"
            >
              <Split text="We built Levron for the operators who are out of hours before they are out of work." />
            </h2>
          </div>
        </section>

        {/* ───────────── Work ───────────── */}
        <section id="work" className="px-6 pt-[12vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <h2
              data-split
              className="display text-[clamp(2.5rem,7.5vw,6.5rem)] lowercase"
            >
              <Split text="What we build" />
              <span className="count">4</span>
            </h2>

            <div className="mt-14 grid gap-x-10 gap-y-16 md:mt-20 md:grid-cols-2">
              {work.map((item, i) => (
                <article
                  key={item.n}
                  className="group"
                  data-rise
                  style={
                    {
                      "--group-delay": `${(i % 2) * 110}ms`,
                    } as React.CSSProperties
                  }
                >
                  <div className="card lift aspect-[4/3] w-full">
                    {item.panel}
                  </div>

                  <div className="mt-6 flex items-baseline gap-4">
                    <span className="text-muted text-[0.75rem] tabular-nums">
                      {item.n}
                    </span>
                    <h3 className="display-md text-[clamp(1.5rem,2.4vw,2.125rem)]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-ink/70 mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.6]">
                    {item.body}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Statement ───────────── */}
        <section className="px-6 py-[18vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <div
              data-grow
              className="connector mb-[10vh] h-24 origin-top"
              aria-hidden="true"
            />
            <ScrollText
              text="Nobody needs another dashboard. You need back the four hours a day your office spends retyping what the field already wrote down."
              className="display-md mx-auto max-w-[22ch] text-center text-[clamp(1.875rem,4.6vw,4rem)]"
            />
          </div>
        </section>

        {/* ───────────── Process ───────────── */}
        <section id="how" className="px-6 pb-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <h2
              data-split
              className="display text-[clamp(2.5rem,7.5vw,6.5rem)] lowercase"
            >
              <Split text="How it works" />
              <span className="count">3</span>
            </h2>

            <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
              {beats.map((beat, i) => (
                <div
                  key={beat.k}
                  data-fade
                  style={
                    { "--group-delay": `${i * 140}ms` } as React.CSSProperties
                  }
                >
                  <div className="bg-line mb-6 h-px w-full" />
                  <div className="label">{beat.k}</div>
                  <h3 className="display-md mt-5 text-[clamp(1.375rem,2.1vw,1.875rem)]">
                    {beat.t}
                  </h3>
                  <p className="text-ink/70 mt-4 max-w-[38ch] text-[0.9375rem] leading-[1.65]">
                    {beat.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Contact ───────────── */}
        <section id="contact" className="px-6 pb-[12vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <div className="bg-ink relative overflow-hidden rounded-[1.75rem] px-7 py-16 md:px-16 md:py-24">
              <h2
                data-split
                className="display text-[clamp(2.25rem,6.4vw,5.5rem)] lowercase text-white"
              >
                <Split text="Let’s find the hours." />
              </h2>

              <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
                <p
                  data-fade
                  style={{ "--group-delay": "280ms" } as React.CSSProperties}
                  className="max-w-[38ch] text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.55] text-white/65"
                >
                  Bring your last ten bids and a dispatch board. Forty-five
                  minutes is usually enough to see where it&rsquo;s going.
                </p>

                <div
                  data-fade
                  style={{ "--group-delay": "400ms" } as React.CSSProperties}
                >
                  <Magnetic strength={0.24}>
                    <a
                      href={site.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-paper text-ink pill inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold hover:bg-white"
                    >
                      Get started
                      <span className="arrow-shift">→</span>
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ───────────── Footer ───────────── */}
      <footer className="px-6 pb-10 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="border-line flex flex-col gap-5 border-t pt-8 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
            <span className="display text-[1.125rem] tracking-[-0.05em]">
              levron
            </span>
            <div className="text-muted flex flex-wrap items-center gap-x-8 gap-y-3">
              <a href={`mailto:${site.email}`} className="link-quiet">
                {site.email}
              </a>
              <span>© {new Date().getFullYear()} {site.name}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
