import { site } from "@/lib/site";
import { Split } from "./Split";
import { Magnetic } from "./Magnetic";

/** The dark closing block, shared by every page. */
export function ContactCta({
  heading = "Let’s find the hours.",
  body = "Bring your last ten bids and a dispatch board. Forty-five minutes is usually enough to see where it’s going.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="px-6 pb-[12vh] md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="bg-ink relative overflow-hidden rounded-[1.75rem] px-7 py-16 md:px-16 md:py-28">
          <h2
            data-split
            className="display max-w-[14ch] text-[clamp(2.25rem,5.6vw,4.75rem)] text-white"
          >
            <Split text={heading} />
          </h2>

          <div className="mt-12 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between">
            <p
              data-fade
              style={{ "--group-delay": "280ms" } as React.CSSProperties}
              className="max-w-[40ch] text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.55] text-white/65"
            >
              {body}
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
                  className="group bg-paper text-ink pill hover:bg-teal inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold hover:text-white"
                >
                  Get Started
                  <span className="arrow-shift">→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
