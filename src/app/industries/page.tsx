import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ContactCta } from "@/components/ContactCta";
import { VideoHero } from "@/components/VideoHero";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Where we build: construction, home service, and tax & accounting operations, and the tighter trades inside each — general contractors, civil and site work, HVAC, roofing, plumbing, electrical, tax prep, and bookkeeping.",
};

export default function IndustriesPage() {
  return (
    <>
      <Reveal />

      <main id="top" className="flex-1">
        <VideoHero
          eyebrow="Industries"
          headline="Three places time actually goes."
          headlineClassName="max-w-[18ch]"
          body="Construction, home service, and tax all run differently, but the same pattern shows up in each: the company knows more than any system it runs on. Start with the operation that matches yours, or the trade underneath it if we have something more specific to say."
          links={[
            { label: "See what we’d build", href: "/contact" },
            { label: "See the work", href: "/work" },
          ]}
          videoSrc="/video/industries-hero.mp4"
          poster="/video/industries-poster.jpg"
        />

        <section className="px-6 pb-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            {industries.map((group, gi) => (
              <div key={group.slug}>
                <div
                  data-line
                  className="bg-line h-px w-full origin-left"
                  aria-hidden="true"
                />
                <div className="grid gap-8 py-14 md:grid-cols-12 md:gap-10 md:py-16">
                  <div className="md:col-span-4">
                    <Link href={group.href} className="group inline-block">
                      <h2
                        data-split
                        className="display-md flex items-center gap-4 text-[clamp(1.75rem,3.2vw,2.75rem)]"
                      >
                        <Split text={group.label} start={gi * 3} />
                        <span className="arrow-shift text-teal">→</span>
                      </h2>
                    </Link>
                    <p
                      data-fade
                      style={
                        { "--group-delay": "160ms" } as React.CSSProperties
                      }
                      className="label mt-4"
                    >
                      {group.eyebrow}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 md:col-span-7 md:col-start-6">
                    {group.children.map((child, i) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        data-fade
                        style={
                          {
                            "--group-delay": `${240 + i * 100}ms`,
                          } as React.CSSProperties
                        }
                        className="group border-line hover:border-teal flex items-baseline justify-between gap-6 border-b py-4 transition-colors duration-500 first:border-t"
                      >
                        <span className="text-[clamp(1rem,1.4vw,1.1875rem)] font-medium tracking-[-0.01em]">
                          {child.label}
                        </span>
                        <span className="text-muted group-hover:text-teal shrink-0 text-[0.8125rem] transition-colors duration-500">
                          {child.eyebrow}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div
              data-line
              className="bg-line h-px w-full origin-left"
              aria-hidden="true"
            />
          </div>
        </section>

        <ContactCta
          heading="Show us where it breaks."
          body="We’ll map what’s manual, what should stay human, and what we’d build around it."
          cta="Walk us through it"
        />
      </main>
    </>
  );
}
