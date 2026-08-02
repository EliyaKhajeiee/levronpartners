import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Ambient } from "@/components/Ambient";
import { Cursor } from "@/components/Cursor";
import { Split } from "@/components/Split";
import { ScrollText } from "@/components/ScrollText";
import { Magnetic } from "@/components/Magnetic";
import { Marquee } from "@/components/Marquee";

const band = [
  "Estimating",
  "Takeoff",
  "Dispatch",
  "Job costing",
  "Change orders",
  "Follow-up",
];

const work = [
  {
    n: "01",
    title: "Estimating",
    body: "Plans and specs in, a priced and defensible bid out — the day the invitation lands, on your assemblies and your labor rates.",
  },
  {
    n: "02",
    title: "Operations",
    body: "Dispatch, job costing, purchase orders, invoicing. The admin hours nobody bills for, taken off your people's desks.",
  },
  {
    n: "03",
    title: "Internal tools",
    body: "The workflow that makes you money is usually the one no vendor sells. We build that one, around the systems you already run.",
  },
  {
    n: "04",
    title: "Follow-up",
    body: "Every missed call answered, every quote chased, nothing waiting on someone remembering to pick the phone back up.",
  },
];

const beats = [
  {
    k: "First",
    t: "We watch.",
    b: "Ride-alongs, screen-shares, the last hundred jobs. We come back with the three things capping your throughput and what each is worth.",
  },
  {
    k: "Then",
    t: "We build.",
    b: "Working software on your own data inside a month, in front of real jobs. No six-month discovery, no deck.",
  },
  {
    k: "After",
    t: "We stay.",
    b: "Each system sharpens the next. We keep building while the advantage compounds instead of decaying.",
  },
];

export default function Home() {
  return (
    <>
      <Reveal />
      <Ambient />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />

      <main id="top" className="relative z-10 flex-1">
        {/* ───────────── Hero ───────────── */}
        <section className="flex min-h-[100svh] flex-col justify-between px-6 pt-[24vh] pb-12 md:px-12 md:pb-16">
          <div className="mx-auto w-full max-w-[1560px]">
            <h1
              data-split
              className="display text-[clamp(3.25rem,10.5vw,10.5rem)]"
            >
              <Split text="Same crew." />
              <br />
              <span className="text-accent">
                <Split text="More capacity." start={2} />
              </span>
            </h1>

            <p
              data-fade
              style={{ "--group-delay": "700ms" } as React.CSSProperties}
              className="text-muted mt-[7vh] text-right text-[clamp(1rem,1.7vw,1.5rem)] tracking-[-0.02em]"
            >
              For construction and HVAC.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[1560px] flex-col gap-9 sm:flex-row sm:items-end sm:justify-between">
            <p
              data-fade
              style={{ "--group-delay": "820ms" } as React.CSSProperties}
              className="text-muted max-w-[34ch] text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-[1.45] tracking-[-0.015em]"
            >
              We find where your operation is leaking hours, then build the
              software that removes them. Custom to how your business actually
              runs.
            </p>

            <div
              data-fade
              style={{ "--group-delay": "930ms" } as React.CSSProperties}
            >
              <Magnetic>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-accent text-bg pill hover:bg-fg inline-flex items-center gap-3 rounded-full px-9 py-5 text-[0.9375rem] font-semibold"
                >
                  Get started
                  <span className="arrow-shift">→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* ───────────── Accent band ───────────── */}
        <Marquee items={band} />

        {/* ───────────── Statement ───────────── */}
        <section id="statement" className="px-6 py-[20vh] md:px-12">
          <div className="mx-auto max-w-[1560px]">
            <ScrollText
              text="Nobody needs another dashboard. You need back the four hours a day your office spends retyping what the field already wrote down."
              className="display-sm max-w-[19ch] text-[clamp(2.25rem,6vw,5.5rem)]"
            />
          </div>
        </section>

        {/* ───────────── Work ───────────── */}
        <section id="work">
          <div className="mx-auto max-w-[1560px] px-6 md:px-12">
            <p
              data-fade
              className="text-faint mb-14 text-[0.8125rem] tracking-[0.04em] uppercase md:mb-20"
            >
              What we build
            </p>
          </div>

          {work.map((item) => (
            <article
              key={item.n}
              className="group relative overflow-hidden"
              data-cursor
            >
              {/* Full-bleed accent wipe, edge to edge rather than inset */}
              <div
                className="bg-accent absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                aria-hidden="true"
              />

              <div className="relative z-10 mx-auto max-w-[1560px] px-6 md:px-12">
                <div
                  data-line
                  className="bg-fg/15 h-px w-full origin-left transition-colors duration-500 group-hover:bg-[#0e0c0b]/20"
                  aria-hidden="true"
                />

                <div className="grid gap-5 py-11 transition-colors duration-500 group-hover:text-[#0e0c0b] md:grid-cols-12 md:gap-10 md:py-16">
                  <div className="text-faint text-[0.8125rem] transition-colors duration-500 group-hover:text-[#0e0c0b]/55 md:col-span-2">
                    {item.n}
                  </div>

                  <h2
                    data-split
                    className="display-sm text-[clamp(2rem,4.4vw,3.75rem)] md:col-span-4"
                  >
                    <Split text={item.title} />
                  </h2>

                  <p
                    data-fade
                    style={{ "--group-delay": "120ms" } as React.CSSProperties}
                    className="text-muted max-w-[42ch] text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.5] transition-colors duration-500 group-hover:text-[#0e0c0b]/75 md:col-span-5 md:col-start-8"
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </article>
          ))}

          <div className="mx-auto max-w-[1560px] px-6 md:px-12">
            <div
              data-line
              className="bg-fg/15 h-px w-full origin-left"
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ───────────── Manifesto panel ───────────── */}
        <section className="bg-accent text-bg relative z-10 mt-[20vh] px-6 py-[16vh] md:px-12">
          <div className="mx-auto max-w-[1560px]">
            <p
              data-fade
              className="text-bg/60 mb-10 text-[0.8125rem] tracking-[0.04em] uppercase"
            >
              The point
            </p>
            <h2
              data-split
              className="display max-w-[16ch] text-[clamp(2.75rem,8.5vw,8rem)]"
            >
              <Split text="We remove the work. Not the people." />
            </h2>
          </div>
        </section>

        {/* ───────────── How ───────────── */}
        <section id="how" className="px-6 py-[20vh] md:px-12">
          <div className="mx-auto max-w-[1560px]">
            <div className="grid gap-14 md:grid-cols-3 md:gap-12">
              {beats.map((beat, i) => (
                <div
                  key={beat.k}
                  data-fade
                  style={
                    { "--group-delay": `${i * 130}ms` } as React.CSSProperties
                  }
                  className="md:pr-10"
                >
                  <div className="text-accent text-[0.8125rem] tracking-[0.04em] uppercase">
                    {beat.k}
                  </div>
                  <h3 className="display-sm mt-5 text-[clamp(1.875rem,3.2vw,2.75rem)]">
                    {beat.t}
                  </h3>
                  <p className="text-muted mt-5 max-w-[36ch] text-[1rem] leading-[1.55]">
                    {beat.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Close ───────────── */}
        <section id="close" className="px-6 pt-[6vh] pb-[16vh] md:px-12">
          <div className="mx-auto max-w-[1560px]">
            <h2
              data-split
              className="display text-[clamp(3.25rem,10.5vw,10.5rem)]"
            >
              <Split text="Let’s find" />
              <br />
              <span className="text-accent">
                <Split text="the hours." start={2} />
              </span>
            </h2>

            <div className="mt-14 flex flex-col gap-9 sm:flex-row sm:items-end sm:justify-between md:mt-20">
              <p
                data-fade
                style={{ "--group-delay": "260ms" } as React.CSSProperties}
                className="text-muted max-w-[34ch] text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-[1.45] tracking-[-0.015em]"
              >
                Bring your last ten bids and a dispatch board. Forty-five
                minutes is usually enough to see where it&rsquo;s going.
              </p>

              <div
                data-fade
                style={{ "--group-delay": "360ms" } as React.CSSProperties}
              >
                <Magnetic>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-accent text-bg pill hover:bg-fg inline-flex items-center gap-3 rounded-full px-9 py-5 text-[0.9375rem] font-semibold"
                  >
                    Get started
                    <span className="arrow-shift">→</span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ───────────── Footer ───────────── */}
      <footer className="relative z-10 px-6 pb-9 md:px-12">
        <div className="mx-auto max-w-[1560px]">
          <div className="hairline-soft border-t pt-7">
            <div className="text-faint flex flex-col gap-4 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
              <span>{site.name}</span>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                <a href={`mailto:${site.email}`} className="link-quiet">
                  {site.email}
                </a>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
