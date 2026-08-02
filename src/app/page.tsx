import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { Mark } from "@/components/Mark";

const capabilities = [
  {
    n: "01",
    title: "Estimating & takeoff",
    lead: "Plans and specs in. Priced, defensible bid out.",
    body: "We turn your drawings, spec books and historical job costs into an estimating system that produces a scoped takeoff and a formatted proposal the same day the invitation lands — built on your assemblies, your labor rates, your markup rules. Not a generic calculator. Your estimator's judgment, encoded.",
    points: [
      "Drawing + spec ingestion",
      "Assembly-level takeoff",
      "Historical cost calibration",
      "Branded proposal generation",
    ],
  },
  {
    n: "02",
    title: "Operations & back office",
    lead: "The admin hours nobody bills for — gone.",
    body: "Dispatch boards that fill themselves, job costing that reconciles nightly, POs and invoices that move without a keystroke, and clean data underneath all of it. We work inside the systems you already run instead of asking you to migrate the whole company.",
    points: [
      "Dispatch & scheduling logic",
      "Job costing reconciliation",
      "PO, invoice & AR automation",
      "Field-to-office data hygiene",
    ],
  },
  {
    n: "03",
    title: "Custom agents & internal tools",
    lead: "Software shaped like your company, not the other way around.",
    body: "The workflow that makes you money is usually the one no vendor sells. We build it: agents that read submittals, price change orders, chase compliance docs, or answer “what did we pay for this last year” in one line — wired into your ERP, your CRM, your file server.",
    points: [
      "Bespoke internal tooling",
      "ERP / CRM / field-app integration",
      "Document & submittal agents",
      "Change-order intelligence",
    ],
  },
  {
    n: "04",
    title: "Sales & lead follow-up",
    lead: "Speed to lead, without adding a body to answer the phone.",
    body: "Every missed call answered, every lead qualified, every quote followed up on a schedule that never slips. In service HVAC the shop that responds first usually wins before price is ever discussed — so we make responding first automatic.",
    points: [
      "Missed-call & after-hours capture",
      "Instant quote follow-up",
      "CRM pipeline automation",
      "Booked-job attribution",
    ],
  },
];

const steps = [
  {
    n: "I",
    title: "Map",
    time: "Week 1–2",
    body: "We sit in your business. Ride-alongs, estimator screen-shares, a look at the last hundred jobs. We come back with the three constraints actually capping your throughput — and what each one is worth in dollars.",
  },
  {
    n: "II",
    title: "Build",
    time: "Week 3–8",
    body: "We ship the highest-leverage system first and put it in front of real jobs inside a month. You see working software on your data, not a deck. We iterate against the crew that has to live with it.",
  },
  {
    n: "III",
    title: "Compound",
    time: "Ongoing",
    body: "Each system feeds the next. Estimating data sharpens job costing; job costing sharpens the next bid. We stay on as your technical partner while the advantage compounds instead of decaying.",
  },
];

const outcomes = [
  {
    stat: "Same day",
    label: "Bid turnaround",
    note: "hours instead of days on qualified invitations",
  },
  {
    stat: "< 60 sec",
    label: "Lead response",
    note: "every call, every form, every hour",
  },
  {
    stat: "2×",
    label: "Bid volume",
    note: "with the estimating team you already have",
  },
  {
    stat: "90 days",
    label: "To measurable ROI",
    note: "written into the engagement, not implied",
  },
];

const faqs = [
  {
    q: "Are you an agency or a software company?",
    a: "Neither, really. We're a partner. We build and own production systems inside your business the way an internal team would — but we've done this work across enough contractors that we're not learning your industry on your budget. You get the speed of an outside team with the accountability of an inside one.",
  },
  {
    q: "Do we have to rip out Procore, ServiceTitan or Sage?",
    a: "No. We build around what you run. Your team keeps the tools they know; we make those tools talk to each other and remove the manual work in between. A migration is something we'd only recommend if the system itself is what's holding you back.",
  },
  {
    q: "How small is too small?",
    a: "If you're under roughly $3M a year, the honest answer is that off-the-shelf software will serve you better than we will. Our work pays for itself when there's enough volume that a few points of throughput is real money — typically $5M and up, or a shop growing fast enough to be there soon.",
  },
  {
    q: "Who owns what we build?",
    a: "You do. Code, models, prompts, integrations, documentation — all of it lives in your accounts and transfers to you. We don't build hostages.",
  },
  {
    q: "What does an engagement cost?",
    a: "Engagements open with a paid mapping sprint, then move to a fixed monthly build partnership scoped to the systems we agreed on. No hourly billing, no surprise invoices. You'll have the number on the first call once we know what we're building.",
  },
  {
    q: "How fast do we see something real?",
    a: "Working software on your own data inside the first month. We don't do six-month discovery phases — if we can't put something useful in front of your team in weeks, we've scoped it wrong.",
  },
];

const marquee = [
  "Mechanical",
  "HVAC service",
  "Sheet metal",
  "Plumbing",
  "Electrical",
  "General contracting",
  "Design-build",
  "Controls",
  "Refrigeration",
  "Civil",
];

const fit = [
  "Mechanical, HVAC, plumbing and electrical contractors doing $5M+",
  "GCs and design-build firms bidding more than they can price",
  "Service shops where speed-to-lead decides the close",
  "Owners who want leverage, not another dashboard nobody opens",
  "Teams willing to change one workflow to gain ten hours",
];

export default function Home() {
  return (
    <>
      <Reveal />
      <Nav />

      <main id="top" className="flex-1">
        {/* ───────────── Hero ───────────── */}
        <section className="relative overflow-hidden pt-[136px] pb-20 md:pt-[184px] md:pb-28">
          <div className="blueprint pointer-events-none absolute inset-0 -top-20" />
          <div className="blueprint-fine pointer-events-none absolute inset-0 -top-20" />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, rgba(14,110,110,0.10), transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-[1180px] px-6 md:px-10">
            <div data-reveal className="eyebrow text-teal flex items-center gap-3">
              <span className="bg-teal/40 h-px w-8" />
              AI systems for construction &amp; HVAC
            </div>

            <h1
              data-reveal
              style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
              className="display mt-7 max-w-[17ch] text-[clamp(2.85rem,8.2vw,7rem)]"
            >
              Most contractors don&rsquo;t lose on price.{" "}
              <span className="text-teal italic">They lose on speed.</span>
            </h1>

            <p
              data-reveal
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
              className="lede text-ink/70 mt-9 max-w-[58ch]"
            >
              {site.name}{" "}
              builds the estimating, operations and sales systems
              that let construction and HVAC companies quote in hours, respond
              in seconds, and carry twice the work with the team they&rsquo;ve
              already got.
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
              className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-ink hover:bg-teal text-cream inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-[0.9375rem] font-medium transition-colors duration-300"
              >
                {site.bookingLabel}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#work"
                className="hairline text-ink/75 hover:border-ink hover:text-ink inline-flex items-center justify-center rounded-full border px-7 py-4 text-[0.9375rem] transition-colors duration-300"
              >
                See what we build
              </a>
            </div>

            <p
              data-reveal
              style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
              className="text-ink/45 mt-8 text-[0.8125rem]"
            >
              Working software on your data in the first 30 days. No six-month
              discovery.
            </p>
          </div>
        </section>

        {/* ───────────── Marquee ───────────── */}
        <section className="hairline border-y py-5">
          <div className="marquee-mask relative flex overflow-hidden">
            <div className="marquee-track flex shrink-0 items-center">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center">
                  {marquee.map((item) => (
                    <span
                      key={`${dup}-${item}`}
                      className="text-ink/40 flex shrink-0 items-center gap-8 px-8 text-[0.8125rem] whitespace-nowrap"
                    >
                      {item}
                      <Mark className="text-teal/35 h-3 w-3" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── The gap ───────────── */}
        <section className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <p data-reveal className="eyebrow text-ink/45">
                The gap
              </p>
              <h2
                data-reveal
                style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
                className="display mt-5 text-[clamp(2.25rem,4.4vw,3.5rem)]"
              >
                The work is there.
                <br />
                The throughput isn&rsquo;t.
              </h2>
            </div>

            <div
              data-reveal
              className="text-ink/70 space-y-7 text-[1.0625rem] leading-relaxed md:col-span-6 md:col-start-7"
            >
              <p>
                Every contractor we meet is turning away revenue for the same
                three reasons: bids take too long to price, the office spends
                its day re-typing what the field already wrote down, and the
                phone rings while everyone is on a roof.
              </p>
              <p>
                None of that is a people problem. Your estimator is good. Your
                dispatcher is good. They&rsquo;re just doing work that
                shouldn&rsquo;t need a person — and it&rsquo;s the reason the
                next $10M costs you twenty hires instead of five.
              </p>
              <p className="text-ink font-medium">
                We remove the work. Not the people.
              </p>
            </div>
          </div>
        </section>

        {/* ───────────── What we build ───────────── */}
        <section id="work" className="bg-cream/70 hairline border-y">
          <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p data-reveal className="eyebrow text-teal">
                  What we build
                </p>
                <h2
                  data-reveal
                  style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
                  className="display mt-5 max-w-[18ch] text-[clamp(2.25rem,4.4vw,3.5rem)]"
                >
                  Four systems. One compounding advantage.
                </h2>
              </div>
              <p
                data-reveal
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
                className="text-ink/55 max-w-[34ch] text-[0.9375rem] leading-relaxed md:pb-3"
              >
                Most engagements start with one and grow into the others as the
                data from each makes the next one sharper.
              </p>
            </div>

            <div className="mt-16 md:mt-20">
              {capabilities.map((cap, i) => (
                <article
                  key={cap.n}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 70}ms` } as React.CSSProperties
                  }
                  className="group hairline border-t py-10 last:border-b md:py-14"
                >
                  <div className="grid gap-7 md:grid-cols-12 md:gap-10">
                    <div className="md:col-span-4">
                      <div className="flex items-baseline gap-4">
                        <span className="text-teal/50 font-mono text-[0.75rem] tracking-widest">
                          {cap.n}
                        </span>
                        <h3 className="display group-hover:text-teal text-[1.9rem] transition-colors duration-500 md:text-[2.3rem]">
                          {cap.title}
                        </h3>
                      </div>
                      <p className="text-ink/60 mt-3 text-[0.9375rem] italic md:pl-[2.65rem]">
                        {cap.lead}
                      </p>
                    </div>

                    <div className="md:col-span-5 md:col-start-6">
                      <p className="text-ink/70 text-[1.0125rem] leading-relaxed">
                        {cap.body}
                      </p>
                    </div>

                    <ul className="md:col-span-3 md:col-start-11">
                      {cap.points.map((point) => (
                        <li
                          key={point}
                          className="text-ink/55 hairline-soft flex items-start gap-2.5 border-b py-2.5 text-[0.8125rem] last:border-0"
                        >
                          <span className="bg-teal/60 mt-[0.55rem] h-1 w-1 shrink-0 rounded-full" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── How it works ───────────── */}
        <section
          id="how"
          className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-36"
        >
          <p data-reveal className="eyebrow text-ink/45">
            How it works
          </p>
          <h2
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            className="display mt-5 max-w-[20ch] text-[clamp(2.25rem,4.4vw,3.5rem)]"
          >
            A partner, not a project.
          </h2>

          <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-0">
            {steps.map((step, i) => (
              <div
                key={step.n}
                data-reveal
                style={
                  { "--reveal-delay": `${i * 110}ms` } as React.CSSProperties
                }
                className="hairline relative border-t pt-8 md:pr-10"
              >
                <div className="bg-teal absolute top-0 left-0 h-px w-10" />
                <div className="flex items-baseline justify-between">
                  <span className="display text-teal text-[2.5rem] leading-none">
                    {step.n}
                  </span>
                  <span className="eyebrow text-ink/35">{step.time}</span>
                </div>
                <h3 className="display mt-6 text-[1.75rem]">{step.title}</h3>
                <p className="text-ink/65 mt-4 text-[0.9375rem] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── Outcomes ───────────── */}
        <section id="proof" className="bg-ink text-cream relative overflow-hidden">
          <div className="grid-dark pointer-events-none absolute inset-0" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 110%, rgba(23,144,141,0.22), transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
            <div className="max-w-[46ch]">
              <p data-reveal className="eyebrow text-teal-lit">
                What we aim at
              </p>
              <h2
                data-reveal
                style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
                className="display mt-5 text-[clamp(2.25rem,4.4vw,3.5rem)]"
              >
                We scope to numbers, then we hit them.
              </h2>
              <p
                data-reveal
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
                className="text-cream/60 mt-6 text-[1rem] leading-relaxed"
              >
                Every engagement is written against targets we set together in
                week one. These are the ones that move the business.
              </p>
            </div>

            <div className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
              {outcomes.map((item, i) => (
                <div
                  key={item.label}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 90}ms` } as React.CSSProperties
                  }
                  className="relative border-t border-white/12 pt-7 lg:pr-8"
                >
                  <div className="bg-teal-lit absolute top-0 left-0 h-px w-8" />
                  <div className="display text-[clamp(2.4rem,3.8vw,3.1rem)]">
                    {item.stat}
                  </div>
                  <div className="mt-3 text-[0.9375rem] font-medium">
                    {item.label}
                  </div>
                  <div className="text-cream/50 mt-1.5 text-[0.8125rem] leading-relaxed">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Fit ───────────── */}
        <section className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <p data-reveal className="eyebrow text-ink/45">
                Fit
              </p>
              <h2
                data-reveal
                style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
                className="display mt-5 text-[clamp(2.25rem,4.4vw,3.5rem)]"
              >
                Who this is for.
              </h2>
              <p
                data-reveal
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
                className="text-ink/60 mt-6 max-w-[38ch] text-[0.9375rem] leading-relaxed"
              >
                We take a small number of partners at a time because we go
                deep. Worth knowing early whether that&rsquo;s you.
              </p>
            </div>

            <ul className="md:col-span-6 md:col-start-7">
              {fit.map((item, i) => (
                <li
                  key={item}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 60}ms` } as React.CSSProperties
                  }
                  className="hairline flex items-start gap-5 border-b py-5 first:border-t"
                >
                  <span className="text-teal mt-1 shrink-0 font-mono text-[0.7rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.0125rem] leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── FAQ ───────────── */}
        <section id="faq" className="bg-cream/70 hairline border-y">
          <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
            <div className="grid gap-12 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <p data-reveal className="eyebrow text-ink/45">
                  Questions
                </p>
                <h2
                  data-reveal
                  style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
                  className="display mt-5 text-[clamp(2.25rem,4.4vw,3.25rem)]"
                >
                  Before you book.
                </h2>
              </div>
              <div data-reveal className="md:col-span-7 md:col-start-6">
                <Faq items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── CTA ───────────── */}
        <section className="bg-ink text-cream relative overflow-hidden">
          <div className="grid-dark pointer-events-none absolute inset-0" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 70% at 50% 0%, rgba(23,144,141,0.28), transparent 68%)",
            }}
          />

          <div className="relative mx-auto max-w-[1180px] px-6 py-28 text-center md:px-10 md:py-40">
            <div data-reveal>
              <Mark className="text-teal-lit mx-auto h-9 w-9 opacity-80" />
            </div>
            <h2
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className="display mx-auto mt-8 max-w-[15ch] text-[clamp(2.6rem,6.2vw,5.25rem)]"
            >
              Let&rsquo;s find the{" "}
              <span className="text-teal-lit italic">ten million</span> hiding
              in your process.
            </h2>
            <p
              data-reveal
              style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
              className="text-cream/60 mx-auto mt-8 max-w-[52ch] text-[1.0625rem] leading-relaxed"
            >
              Bring your last ten bids and a dispatch board. In forty-five
              minutes we&rsquo;ll show you where the throughput is going and
              what it takes to get it back.
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
              className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-cream text-ink hover:bg-teal-lit inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-medium transition-colors duration-300"
              >
                {site.bookingLabel}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-cream/80 hover:text-cream inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-[0.9375rem] transition-colors duration-300 hover:border-white/70"
              >
                Email us instead
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ───────────── Footer ───────────── */}
      <footer className="bg-ink text-cream/50 border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-10 text-[0.8125rem] md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex items-center gap-2.5">
            <Mark className="text-teal-lit h-4 w-4" />
            <span className="text-cream/80">{site.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="link-underline hover:text-cream transition-colors duration-300"
            >
              {site.email}
            </a>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-cream transition-colors duration-300"
            >
              Book a call
            </a>
            <span className="text-cream/30">
              © {new Date().getFullYear()} {site.name}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
