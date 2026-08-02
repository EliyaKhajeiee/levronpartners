import type { Metadata } from "next";
import Image from "next/image";
import { photos, hasPhoto } from "@/lib/media";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ContactCta } from "@/components/ContactCta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Estimating, job costing, document agents and follow-up — the four systems we build for construction and HVAC operators.",
};

const work = [
  {
    n: "01",
    title: "Estimating",
    body: "Drawings and spec books in, a priced and defensible bid out — the day the invitation lands, on your assemblies and your labor rates.",
    detail:
      "Your estimator's judgement is the asset. We encode it: the assemblies they reach for, the crews they assume, the markup rules they apply without thinking about it. What changes is how long it takes to get from an invitation to a number you'd defend in a room.",
    tags: ["Takeoff", "Assembly pricing", "Proposals"],
  },
  {
    n: "02",
    title: "Job costing",
    body: "Field hours and material land against the estimate nightly, so a labor overrun surfaces on day three instead of at closeout.",
    detail:
      "Most shops find out how a job went once it's over. Reconciling nightly turns job costing from a post-mortem into a control — and every closed job sharpens the next estimate, because the actuals feed back into the assemblies.",
    tags: ["Cost capture", "Variance alerts", "Payroll sync"],
  },
  {
    n: "03",
    title: "Document agents",
    body: "Submittals, O&Ms and change orders read on arrival. The numbers that matter get pulled out and routed to whoever needs them.",
    detail:
      "Lead times, model numbers, voltage, liquidated damages, the clause that moves risk onto you. Someone is reading for these today, slowly and not always. We make the reading automatic and the routing immediate.",
    tags: ["Submittals", "Change orders", "Compliance"],
  },
  {
    n: "04",
    title: "Follow-up",
    body: "Every missed call answered, every quote chased, nothing waiting on someone remembering to pick the phone back up.",
    detail:
      "In service work the shop that responds first usually wins before price is discussed. This is the least glamorous system we build and often the fastest to pay for itself.",
    tags: ["Speed to lead", "Quoting", "Booking"],
  },
];

export default function WorkPage() {
  return (
    <>
      <Reveal />

      <main id="top" className="flex-1">
        <section className="px-6 pt-[22vh] pb-[10vh] md:px-10 md:pt-[26vh]">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-8">
              Work
            </p>
            <h1
              data-split
              className="display optical max-w-[15ch] text-[clamp(2.5rem,7.4vw,6.5rem)]"
            >
              <Split text="Four systems." />
            </h1>
            <p
              data-fade
              style={{ "--group-delay": "320ms" } as React.CSSProperties}
              className="text-muted mt-10 max-w-[46ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.45] tracking-[-0.015em]"
            >
              Most engagements start with one and grow into the others, because
              the data from each makes the next one sharper.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-[1500px]">
            {work.map((item, i) => (
              <article key={item.n} className="group">
                <div
                  data-line
                  className="bg-line h-px w-full origin-left"
                  aria-hidden="true"
                />

                <div className="grid gap-6 py-14 md:grid-cols-12 md:gap-10 md:py-20">
                  <div className="text-muted text-[0.75rem] tabular-nums md:col-span-1">
                    {item.n}
                  </div>

                  <div className="md:col-span-4">
                    <h2
                      data-split
                      className="display-md text-[clamp(1.75rem,3.4vw,2.875rem)]"
                    >
                      <Split text={item.title} />
                    </h2>
                    <div
                      data-fade
                      style={
                        { "--group-delay": "200ms" } as React.CSSProperties
                      }
                      className="mt-6 flex flex-wrap gap-2"
                    >
                      {item.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    data-fade
                    style={{ "--group-delay": "120ms" } as React.CSSProperties}
                    className="md:col-span-6 md:col-start-7"
                  >
                    <p className="text-ink max-w-[48ch] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.5] tracking-[-0.012em]">
                      {item.body}
                    </p>
                    <p className="text-muted mt-5 max-w-[52ch] text-[0.9375rem] leading-[1.65]">
                      {item.detail}
                    </p>
                  </div>
                </div>

                {hasPhoto(photos.work[i]) && (
                  <div
                    data-rise
                    className="relative mb-14 aspect-[16/6] w-full overflow-hidden rounded-[1.25rem]"
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
              className="bg-line mb-[14vh] h-px w-full origin-left"
              aria-hidden="true"
            />
          </div>
        </section>

        <ContactCta
          heading="Which one is costing you most?"
          body="Bring your last ten bids and a dispatch board. Forty-five minutes is usually enough to tell."
        />
      </main>
    </>
  );
}
