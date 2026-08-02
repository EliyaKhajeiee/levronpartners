import Image from "next/image";
import { site } from "@/lib/site";
import { photos, hasPhoto } from "@/lib/media";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ScrollText } from "@/components/ScrollText";
import { Magnetic } from "@/components/Magnetic";

const work = [
  {
    n: "01",
    title: "Estimating",
    body: "Drawings and spec books in, a priced and defensible bid out — the day the invitation lands, on your assemblies and your labor rates.",
    tags: ["Takeoff", "Assembly pricing", "Proposals"],
  },
  {
    n: "02",
    title: "Job costing",
    body: "Field hours and material land against the estimate nightly, so a labor overrun surfaces on day three instead of at closeout.",
    tags: ["Cost capture", "Variance alerts", "Payroll sync"],
  },
  {
    n: "03",
    title: "Document agents",
    body: "Submittals, O&Ms and change orders read on arrival. The numbers that matter get pulled out and routed to whoever needs them.",
    tags: ["Submittals", "Change orders", "Compliance"],
  },
  {
    n: "04",
    title: "Follow-up",
    body: "Every missed call answered, every quote chased, nothing waiting on someone remembering to pick the phone back up.",
    tags: ["Speed to lead", "Quoting", "Booking"],
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
        <section className="px-6 pt-[21vh] pb-14 md:px-10 md:pt-[24vh]">
          <div className="mx-auto max-w-[1500px]">
            <h1 className="display text-[clamp(3rem,11.5vw,11rem)] lowercase">
              <span data-split className="block">
                <Split text="Same crew." />
              </span>
              <span data-split className="block">
                <Split text="More capacity." start={2} />
              </span>
            </h1>

            {hasPhoto(photos.hero) && (
              <div
                data-rise
                style={{ "--group-delay": "420ms" } as React.CSSProperties}
                className="relative mt-12 aspect-[16/7] w-full overflow-hidden rounded-[1.25rem]"
              >
                <Image
                  src={photos.hero.src}
                  alt={photos.hero.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
              <p
                data-fade
                style={{ "--group-delay": "560ms" } as React.CSSProperties}
                className="text-ink/75 text-[clamp(1.0625rem,1.5vw,1.4375rem)] leading-[1.45] tracking-[-0.015em] md:col-span-5"
              >
                We find where your operation is leaking hours, then build the
                software that removes them. Custom to how your business
                actually runs.
              </p>

              <p
                data-fade
                style={{ "--group-delay": "660ms" } as React.CSSProperties}
                className="text-muted text-[clamp(1.0625rem,1.5vw,1.4375rem)] leading-[1.45] tracking-[-0.015em] md:col-span-4 md:col-start-7"
              >
                For construction and HVAC contractors doing five million and up.
              </p>

              <div
                data-fade
                style={{ "--group-delay": "760ms" } as React.CSSProperties}
                className="md:col-span-2 md:col-start-11 md:justify-self-end"
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
          </div>
        </section>

        {/* ───────────── Intro ───────────── */}
        <section className="px-6 py-[14vh] md:px-10">
          <div className="mx-auto grid max-w-[1500px] items-end gap-12 md:grid-cols-12">
            {hasPhoto(photos.intro) && (
              <div
                data-rise
                className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] md:col-span-5"
              >
                <Image
                  src={photos.intro.src}
                  alt={photos.intro.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <h2
              data-split
              className={`display-md text-[clamp(1.875rem,4vw,3.5rem)] ${
                hasPhoto(photos.intro)
                  ? "md:col-span-6 md:col-start-7"
                  : "md:col-span-9"
              }`}
            >
              <Split text="We built Levron for the operators who are out of hours before they are out of work." />
            </h2>
          </div>
        </section>

        {/* ───────────── Work ───────────── */}
        <section id="work" className="px-6 pt-[6vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <h2
              data-split
              className="display text-[clamp(2.5rem,8vw,7rem)] lowercase"
            >
              <Split text="What we build" />
              <span className="count">4</span>
            </h2>

            <div className="mt-16 md:mt-24">
              {work.map((item, i) => (
                <article key={item.n} className="group">
                  <div
                    data-line
                    className="bg-line h-px w-full origin-left"
                    aria-hidden="true"
                  />

                  <div className="grid gap-6 py-12 md:grid-cols-12 md:gap-10 md:py-16">
                    <div className="text-muted text-[0.75rem] tabular-nums md:col-span-1">
                      {item.n}
                    </div>

                    <h3
                      data-split
                      className="display-md text-[clamp(1.75rem,3.6vw,3rem)] md:col-span-4"
                    >
                      <Split text={item.title} />
                    </h3>

                    <p
                      data-fade
                      style={
                        { "--group-delay": "120ms" } as React.CSSProperties
                      }
                      className="text-ink/70 max-w-[46ch] text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.6] md:col-span-4"
                    >
                      {item.body}
                    </p>

                    <div
                      data-fade
                      style={
                        { "--group-delay": "200ms" } as React.CSSProperties
                      }
                      className="flex flex-wrap content-start gap-2 md:col-span-3"
                    >
                      {item.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {hasPhoto(photos.work[i]) && (
                    <div
                      data-rise
                      className="relative mb-12 aspect-[16/6] w-full overflow-hidden rounded-[1.25rem]"
                    >
                      <Image
                        src={photos.work[i].src}
                        alt={photos.work[i].alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </article>
              ))}

              <div
                data-line
                className="bg-line h-px w-full origin-left"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        {/* ───────────── Statement ───────────── */}
        <section className="px-6 py-[20vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ScrollText
              text="Nobody needs another dashboard. You need back the four hours a day your office spends retyping what the field already wrote down."
              className="display-md mx-auto max-w-[24ch] text-center text-[clamp(1.875rem,5vw,4.25rem)]"
            />
          </div>
        </section>

        {/* ───────────── Process ───────────── */}
        <section id="how" className="px-6 pb-[16vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <h2
              data-split
              className="display text-[clamp(2.5rem,8vw,7rem)] lowercase"
            >
              <Split text="How it works" />
              <span className="count">3</span>
            </h2>

            <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
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
            <div className="bg-ink relative overflow-hidden rounded-[1.75rem] px-7 py-16 md:px-16 md:py-28">
              <h2
                data-split
                className="display text-[clamp(2.5rem,7vw,6rem)] lowercase text-white"
              >
                <Split text="Let’s find the hours." />
              </h2>

              <div className="mt-12 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between">
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
              <span>
                © {new Date().getFullYear()} {site.name}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
