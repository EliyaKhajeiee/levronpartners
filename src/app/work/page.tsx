import type { Metadata } from "next";
import Image from "next/image";
import { photos, hasPhoto } from "@/lib/media";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ContactCta } from "@/components/ContactCta";
import { BrandBand } from "@/components/BrandBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Where engagements start most often — quoting, job costing, document handling and follow-up. Not a product, and not the limit of what we build.",
};

/**
 * Each system leads with `scene` — the moment it exists to change, written in
 * the present tense and specific enough to be recognised. `mechanism` is what
 * we actually build, stated flatly underneath.
 *
 * That order is the point of the page: the picture first, the capability
 * second. A list of features reads as things we sell; a list of moments reads
 * as days the reader has already had.
 *
 * Two things to hold onto when editing these:
 *
 *   1. **They are starting points, not a catalogue.** The page closes on a
 *      block that says so outright. We build custom software — the moment this
 *      reads like a set of product tiers, it is selling the wrong thing.
 *   2. **Keep the scenes industry-neutral.** Construction and home services is
 *      where we're selling, but an operator in another trade has to see their
 *      own week here too. Nouns like "drawings", "crews" and "the roof" quietly
 *      narrow it to one industry — prefer "the scope", "the time", "everyone".
 */
const systems = [
  {
    title: "Quoting & estimating",
    scene:
      "The request came in at nine. It’s half four, the scope is still open on the second monitor, and the number you send tonight is the one you live with for the next eight months.",
    mechanism:
      "Whoever prices your work is carrying the judgement — the line items they reach for, the time they assume, the markup they apply without thinking about it. We encode that. What changes is how long it takes to get from a request to a number you would defend in a room, on your rates.",
    tags: ["Scoping", "Pricing rules", "Proposals"],
  },
  {
    title: "Job costing",
    scene:
      "The job closed Friday. On Monday you find out it lost eleven thousand dollars, and nobody can tell you which week it went.",
    mechanism:
      "Hours and material land against the estimate nightly, so an overrun surfaces on day three — while it is still a decision instead of a post-mortem. Every closed job then sharpens the next quote, because the actuals feed back into the pricing.",
    tags: ["Cost capture", "Variance alerts", "Payroll sync"],
  },
  {
    title: "Document handling",
    scene:
      "Forty pages land in the inbox. Somewhere in them is a date that moves your schedule and a clause that moves risk onto you.",
    mechanism:
      "Contracts, invoices, submittals, change orders — read on arrival. The numbers that matter get pulled out and routed to whoever needs them, immediately and every time. Someone is doing this today: slowly, and not always.",
    tags: ["Intake", "Extraction", "Routing"],
  },
  {
    title: "Follow-up",
    scene:
      "Three calls came in while everyone was heads-down. Two of them had called someone else by four o’clock.",
    mechanism:
      "Every missed call answered, every quote chased, nothing waiting on someone remembering to pick the phone back up. The least glamorous thing we build, and usually the fastest to pay for itself.",
    tags: ["Speed to lead", "Quoting", "Booking"],
  },
];

function System({
  s,
  photo,
}: {
  s: (typeof systems)[number];
  photo?: { src: string; alt: string };
}) {
  return (
    <article className="border-line border-t">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-[11vh] md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-4">
          {/* No index numeral. Numbering these turned the page into an
              enumerated set — "01 of 04" reads as the extent of what we do,
              which is the opposite of true. Same reason nothing on the page
              counts them. */}
          <div
            data-line
            className="bg-teal h-px w-10 origin-left"
            aria-hidden="true"
          />
          <h2
            data-split
            className="display-md mt-6 text-[clamp(1.75rem,3.2vw,2.75rem)]"
          >
            <Split text={s.title} />
          </h2>
          <div
            data-fade
            style={{ "--group-delay": "240ms" } as React.CSSProperties}
            className="group mt-7 flex flex-wrap gap-2"
          >
            {s.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          {/* The picture. Set at display weight because it is the argument. */}
          <p
            data-fade
            className="display-md text-ink max-w-[34ch] text-[clamp(1.3125rem,2.1vw,1.9375rem)] leading-[1.32]"
          >
            {s.scene}
          </p>

          <div
            data-line
            className="bg-line my-9 h-px w-full origin-left"
            aria-hidden="true"
          />

          <p
            data-fade
            style={{ "--group-delay": "140ms" } as React.CSSProperties}
            className="text-muted max-w-[56ch] text-[0.9375rem] leading-[1.7]"
          >
            {s.mechanism}
          </p>
        </div>
      </div>

      {photo && (
        <div
          data-rise
          className="mx-auto mb-[11vh] max-w-[1500px] px-6 md:px-10"
        >
          <div className="relative aspect-[16/6] w-full overflow-hidden rounded-[1.25rem]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </article>
  );
}

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
              <Split text="Where the week goes." />
            </h1>
            <p
              data-fade
              style={{ "--group-delay": "320ms" } as React.CSSProperties}
              className="text-muted mt-10 max-w-[50ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.45] tracking-[-0.015em]"
            >
              We build custom software, so nothing here is a product and none
              of it is the range. What follows is a handful of the moments
              operators have brought us first, because they are where the hours
              go in almost every business we have opened up.
            </p>
          </div>
        </section>

        {systems.slice(0, 2).map((s, i) => (
          <System
            key={s.title}
            s={s}
            photo={hasPhoto(photos.work[i]) ? photos.work[i] : undefined}
          />
        ))}

        <BrandBand
          heading={site.line}
          body="None of these are platforms you move onto. They are narrow places where a week leaks, closed one at a time, inside the tools your team already opens every morning."
        />

        {systems.slice(2).map((s, i) => (
          <System
            key={s.title}
            s={s}
            photo={hasPhoto(photos.work[i + 2]) ? photos.work[i + 2] : undefined}
          />
        ))}

        {/* The page has just walked through several examples. This is what stops
            them reading as a menu — say plainly it isn't one, and that the
            work is scoped from what the map finds rather than chosen off a
            page. Don't cut it. */}
        <section className="border-line border-t border-b">
          <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-[13vh] md:grid-cols-12 md:px-10">
            <div className="md:col-span-4">
              <h2
                data-split
                className="display-md max-w-[14ch] text-[clamp(1.75rem,3.2vw,2.75rem)]"
              >
                <Split text="And whatever isn’t on this page." />
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p
                data-fade
                className="text-ink max-w-[46ch] text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.5] tracking-[-0.012em]"
              >
                Most of what we build has no name until we&rsquo;ve watched a
                week of your work.
              </p>
              <p
                data-fade
                style={{ "--group-delay": "140ms" } as React.CSSProperties}
                className="text-muted mt-6 max-w-[56ch] text-[0.9375rem] leading-[1.7]"
              >
                The ones above are starting points, not a product and not a
                limit. Every engagement opens with the map, and what gets built
                comes out of what that finds — which is rarely exactly what
                anyone would have guessed going in. If the thing costing you
                most isn&rsquo;t on this page, that is still the conversation.
              </p>
            </div>
          </div>
        </section>

        <div className="pb-[10vh]" />

        <ContactCta
          heading="Let’s look at your week."
          body="Forty-five minutes with the people who actually run the work. We’ll tell you plainly where the hours are going, and whether there’s something here worth building."
        />
      </main>
    </>
  );
}
