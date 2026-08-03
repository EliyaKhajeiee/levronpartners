import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ScrollText } from "@/components/ScrollText";
import { ContactCta } from "@/components/ContactCta";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Map the constraints, ship working software in weeks, then compound. How a Levron Labs engagement runs.",
};

const beats = [
  {
    n: "01",
    k: "Map",
    when: "Week 1–2",
    t: "We watch how it actually runs.",
    b: "Ride-alongs, estimator screen-shares, a look at the last hundred jobs. Not a questionnaire — we want to see where the day actually goes.",
    out: "A written read on the three constraints capping your throughput, and what each one costs you in a year.",
  },
  {
    n: "02",
    k: "Build",
    when: "Week 3–8",
    t: "Working software in weeks.",
    b: "The highest-leverage system first, in front of real jobs inside a month. You review it on your own data, not in a deck, and the crew who has to live with it gets a say while it is still cheap to change.",
    out: "One system in production, measured against the number we agreed on in week one.",
  },
  {
    n: "03",
    k: "Compound",
    when: "Ongoing",
    t: "Then it gets sharper.",
    b: "Estimating data feeds job costing; job costing sharpens the next bid. Each system makes the next one cheaper to build and more accurate once it is.",
    out: "A technical partner who knows your operation, and an advantage that compounds instead of decaying.",
  },
];

const principles = [
  {
    t: "You own everything.",
    b: "Code, models, prompts, integrations, documentation. All of it lives in your accounts and transfers to you. We don't build hostages.",
  },
  {
    t: "We work inside what you run.",
    b: "Procore, ServiceTitan, Sage — your team keeps the tools they know. A migration is something we'd only recommend if the system itself is the constraint.",
  },
  {
    t: "Fixed monthly, not hourly.",
    b: "A paid mapping sprint, then a build partnership scoped to the systems we agreed on. No surprise invoices, no meter running.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <Reveal />

      <main id="top" className="flex-1">
        <section className="px-6 pt-[22vh] pb-[10vh] md:px-10 md:pt-[26vh]">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-8">
              Process
            </p>
            <h1
              data-split
              className="display optical max-w-[16ch] text-[clamp(2.5rem,7.4vw,6.5rem)]"
            >
              <Split text="A partner, not a project." />
            </h1>
            <p
              data-fade
              style={{ "--group-delay": "420ms" } as React.CSSProperties}
              className="text-muted mt-10 max-w-[46ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.45] tracking-[-0.015em]"
            >
              We take a small number of partners at a time because we go deep.
              Here is what that actually looks like.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-[1500px]">
            {beats.map((beat) => (
              <article key={beat.n}>
                <div
                  data-line
                  className="bg-line h-px w-full origin-left"
                  aria-hidden="true"
                />

                <div className="grid gap-6 py-14 md:grid-cols-12 md:gap-10 md:py-20">
                  <div className="md:col-span-3">
                    <div className="text-muted text-[0.75rem] tabular-nums">
                      {beat.n}
                    </div>
                    <div className="label mt-3">{beat.k}</div>
                    <div className="text-muted mt-2 text-[0.8125rem]">
                      {beat.when}
                    </div>
                  </div>

                  <div className="md:col-span-9">
                    <h2
                      data-split
                      className="display-md max-w-[20ch] text-[clamp(1.625rem,3.2vw,2.75rem)]"
                    >
                      <Split text={beat.t} />
                    </h2>
                    <p
                      data-fade
                      style={
                        { "--group-delay": "160ms" } as React.CSSProperties
                      }
                      className="text-ink/75 mt-6 max-w-[56ch] text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-[1.65]"
                    >
                      {beat.b}
                    </p>
                    <p
                      data-fade
                      style={
                        { "--group-delay": "240ms" } as React.CSSProperties
                      }
                      className="border-line text-muted mt-6 max-w-[56ch] border-l pl-5 text-[0.9375rem] leading-[1.6]"
                    >
                      <span className="text-teal font-medium">You get: </span>
                      {beat.out}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            <div
              data-line
              className="bg-line h-px w-full origin-left"
              aria-hidden="true"
            />
          </div>
        </section>

        <section className="px-6 py-[16vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ScrollText
              text="We remove the work. Not the people."
              className="display-md mx-auto max-w-[18ch] text-center text-[clamp(1.875rem,4.8vw,4rem)]"
            />
          </div>
        </section>

        <section className="px-6 pb-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-12">
              How we work
            </p>
            <div className="grid gap-12 md:grid-cols-3 md:gap-10">
              {principles.map((p, i) => (
                <div
                  key={p.t}
                  data-fade
                  style={
                    { "--group-delay": `${i * 140}ms` } as React.CSSProperties
                  }
                >
                  <div className="bg-line mb-6 h-px w-full" />
                  <h3 className="display-md text-[clamp(1.25rem,1.9vw,1.625rem)]">
                    {p.t}
                  </h3>
                  <p className="text-muted mt-4 max-w-[38ch] text-[0.9375rem] leading-[1.65]">
                    {p.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCta
          heading="Start with the map."
          body="A paid mapping sprint is how every engagement opens. Forty-five minutes on a call is how we work out whether it's worth running."
        />
      </main>
    </>
  );
}
