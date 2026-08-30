import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ContactCta } from "@/components/ContactCta";
import { StatStrip } from "@/components/StatStrip";
import { Artifact } from "@/components/Artifact";
import { JsonLd } from "@/components/JsonLd";
import { caseStudies, caseStudyBySlug } from "@/lib/caseStudies";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: cs.company,
    description: `${cs.headline} ${cs.result}`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <>
      <Reveal />
      <JsonLd
        data={serviceSchema({
          name: `${cs.company} case study`,
          description: `${cs.headline} ${cs.result}`,
          url: `/work/${cs.slug}`,
          serviceType: "Custom operations software",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Work", url: "/work" },
          { name: cs.company, url: `/work/${cs.slug}` },
        ])}
      />

      <main id="top" className="flex-1">
        <section className="px-6 pt-[22vh] pb-[8vh] md:px-10 md:pt-[26vh]">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-8 flex items-center gap-2 text-[0.8125rem]">
              <Link href="/work" className="text-muted hover:text-teal transition-colors duration-500">
                Work
              </Link>
              <span className="text-muted" aria-hidden="true">/</span>
              <span className="text-ink/90">{cs.company}</span>
            </div>

            <div className="mb-8 flex items-center gap-4">
              <div className="border-line flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-2">
                <Image
                  src={cs.logo}
                  alt={`${cs.company} logo`}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="text-ink text-[0.9375rem] font-medium">{cs.company}</p>
                <p className="text-muted text-[0.8125rem]">{cs.sector}</p>
              </div>
            </div>

            <h1
              data-split
              className="display optical max-w-[18ch] text-[clamp(2.25rem,6vw,5rem)]"
            >
              <Split text={cs.headline} />
            </h1>
          </div>
        </section>

        <StatStrip stats={cs.stats} />

        <section className="px-6 py-[10vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <Artifact label="Case Study" title="engagement-review.md">
              <div className="mx-auto flex max-w-[62ch] flex-col gap-9">
                <div>
                  <p className="label mb-4">The problem</p>
                  <p className="text-ink/80 text-[0.9375rem] leading-[1.75]">{cs.problem}</p>
                </div>
                <div>
                  <p className="label mb-4">What we found</p>
                  <p className="text-ink/80 text-[0.9375rem] leading-[1.75]">{cs.found}</p>
                </div>
                <div>
                  <p className="label mb-4">What we built</p>
                  <ul className="flex flex-col gap-2.5">
                    {cs.built.map((item) => (
                      <li key={item} className="text-ink/80 flex items-start gap-3 text-[0.9375rem] leading-[1.6]">
                        <span className="bg-teal mt-2.5 h-1 w-1 shrink-0 rounded-full" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label mb-4">The result</p>
                  <p className="text-ink/80 text-[0.9375rem] leading-[1.75]">{cs.result}</p>
                </div>
              </div>
            </Artifact>
          </div>
        </section>

        <section className="px-6 pb-[14vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <blockquote className="border-line mx-auto max-w-[46ch] border-l-2 pl-6">
              <p className="display-md text-ink text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.4]">
                &ldquo;{cs.quote}&rdquo;
              </p>
              <footer className="text-muted mt-4 text-[0.875rem]">
                {cs.client}, {cs.role} — {cs.company}
              </footer>
            </blockquote>
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
