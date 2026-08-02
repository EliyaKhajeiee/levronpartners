import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Ambient } from "@/components/Ambient";
import { Split } from "@/components/Split";
import { ScrollText } from "@/components/ScrollText";
import { Magnetic } from "@/components/Magnetic";

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
      <Nav />

      <main id="top" className="relative z-10 flex-1">
        {/* ───────────── Hero ───────────── */}
        <section className="flex min-h-[100svh] flex-col justify-between px-7 pt-[26vh] pb-14 md:px-14 md:pb-20">
          <div className="mx-auto w-full max-w-[1440px]">
            <h1
              data-split
              className="display max-w-[15ch] text-[clamp(2.7rem,7.4vw,6.75rem)]"
            >
              <Split text="Same crew. More capacity." />
            </h1>

            <p
              data-fade
              style={{ "--group-delay": "620ms" } as React.CSSProperties}
              className="text-muted mt-[9vh] text-right text-[clamp(1rem,1.7vw,1.5rem)] tracking-[-0.015em]"
            >
              For construction and HVAC.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <p
              data-fade
              style={{ "--group-delay": "760ms" } as React.CSSProperties}
              className="text-muted max-w-[34ch] text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.45] tracking-[-0.015em]"
            >
              We find where your operation is leaking hours, then build the
              software that removes them. Custom to how your business actually
              runs.
            </p>

            <div
              data-fade
              style={{ "--group-delay": "880ms" } as React.CSSProperties}
            >
              <Magnetic>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-fg text-bg pill hover:bg-muted inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-medium"
                >
                  Get started
                  <span className="arrow-shift">→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* ───────────── Statement ───────────── */}
        <section id="statement" className="px-7 py-[22vh] md:px-14">
          <div className="mx-auto max-w-[1440px]">
            <ScrollText
              text="Nobody needs another dashboard. You need back the four hours a day your office spends retyping what the field already wrote down."
              className="display-sm max-w-[20ch] text-[clamp(2rem,5.2vw,4.25rem)]"
            />
          </div>
        </section>

        {/* ───────────── Work ───────────── */}
        <section id="work" className="px-7 md:px-14">
          <div className="mx-auto max-w-[1440px]">
            <p
              data-fade
              className="text-faint mb-16 text-[0.8125rem] tracking-[0.02em] md:mb-24"
            >
              What we build
            </p>

            {work.map((item) => (
              <article key={item.n} className="group relative">
                <div
                  data-line
                  className="bg-fg/12 h-px w-full origin-left"
                  aria-hidden="true"
                />
                <div className="grid gap-6 py-12 md:grid-cols-12 md:gap-10 md:py-16">
                  <div className="text-faint text-[0.8125rem] md:col-span-2">
                    {item.n}
                  </div>

                  <h2
                    data-split
                    className="display-sm text-[clamp(1.85rem,3.6vw,3rem)] md:col-span-4"
                  >
                    <Split text={item.title} />
                  </h2>

                  <p
                    data-fade
                    style={{ "--group-delay": "120ms" } as React.CSSProperties}
                    className="text-muted max-w-[42ch] text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.5] md:col-span-5 md:col-start-8"
                  >
                    {item.body}
                  </p>
                </div>
              </article>
            ))}

            <div
              data-line
              className="bg-fg/12 h-px w-full origin-left"
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ───────────── How ───────────── */}
        <section id="how" className="px-7 py-[22vh] md:px-14">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-16 md:grid-cols-3 md:gap-12">
              {beats.map((beat, i) => (
                <div
                  key={beat.k}
                  data-fade
                  style={
                    { "--group-delay": `${i * 130}ms` } as React.CSSProperties
                  }
                  className="md:pr-10"
                >
                  <div className="text-faint text-[0.8125rem]">{beat.k}</div>
                  <h3 className="display-sm mt-5 text-[clamp(1.75rem,2.8vw,2.5rem)]">
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
        <section id="close" className="px-7 pt-[10vh] pb-[18vh] md:px-14">
          <div className="mx-auto max-w-[1440px]">
            <h2
              data-split
              className="display max-w-[13ch] text-[clamp(2.7rem,7.4vw,6.75rem)]"
            >
              <Split text="Let’s find the hours." />
            </h2>

            <div className="mt-16 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between md:mt-24">
              <p
                data-fade
                style={{ "--group-delay": "260ms" } as React.CSSProperties}
                className="text-muted max-w-[34ch] text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.45] tracking-[-0.015em]"
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
                    className="group bg-fg text-bg pill hover:bg-muted inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-medium"
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
      <footer className="relative z-10 px-7 pb-10 md:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="hairline-soft border-t pt-8">
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
