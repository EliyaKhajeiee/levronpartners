import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ContactCta } from "@/components/ContactCta";
import { founders } from "@/lib/founders";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the founders of Levron Partners — Aristotle Taylor and Eliya Khajeie. One maps how an operation actually runs. The other builds the system that changes it.",
};

function Founder({
  founder,
  photoOnRight,
}: {
  founder: (typeof founders)[number];
  photoOnRight?: boolean;
}) {
  return (
    <article>
      <div
        data-line
        className="bg-line h-px w-full origin-left"
        aria-hidden="true"
      />

      <div className="grid items-center gap-8 py-14 md:grid-cols-12 md:gap-10 md:py-20">
        <div
          className={
            photoOnRight
              ? "md:col-span-5 md:col-start-8"
              : "md:col-span-5"
          }
        >
          <div
            data-rise
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem]"
          >
            <Image
              src={founder.image.src}
              alt={founder.image.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>

        <div
          className={
            photoOnRight
              ? "md:col-span-6 md:col-start-1 md:row-start-1"
              : "md:col-span-6 md:col-start-7"
          }
        >
          <p data-fade className="label">
            {founder.role}
          </p>
          <h2
            data-split
            className="display-md mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)]"
          >
            <Split text={founder.name} />
          </h2>

          <div
            data-fade
            style={{ "--group-delay": "120ms" } as React.CSSProperties}
            className="mt-5 flex items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#111]">
              <Image
                src={founder.school.src}
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-muted text-[0.8125rem]">
              {founder.school.label}
            </span>
          </div>

          <p
            data-fade
            style={{ "--group-delay": "180ms" } as React.CSSProperties}
            className="text-ink/80 mt-7 max-w-[46ch] text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-[1.65]"
          >
            {founder.lead}
          </p>
          <p
            data-fade
            style={{ "--group-delay": "240ms" } as React.CSSProperties}
            className="text-muted mt-5 max-w-[46ch] text-[0.9375rem] leading-[1.7]"
          >
            {founder.body}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function AboutPage() {
  return (
    <>
      <Reveal />

      <main id="top" className="flex-1">
        <section className="px-6 pt-[22vh] pb-[10vh] md:px-10 md:pt-[26vh]">
          <div className="mx-auto max-w-[1500px]">
            <p data-fade className="label mb-8">
              About
            </p>
            <h1
              data-split
              className="display optical max-w-[16ch] text-[clamp(2.5rem,7.4vw,6.5rem)]"
            >
              <Split text="We’ve seen both sides of the job." />
            </h1>
            <p
              data-fade
              style={{ "--group-delay": "420ms" } as React.CSSProperties}
              className="text-muted mt-10 max-w-[48ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.45] tracking-[-0.015em]"
            >
              One of us maps how the week actually goes. The other builds the
              system that changes it. Both grew up around this work — job
              sites, a construction company, the tools that never quite kept
              up.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-[1500px]">
            {founders.map((founder, i) => (
              <Founder
                key={founder.name}
                founder={founder}
                photoOnRight={i % 2 === 1}
              />
            ))}

            <div
              data-line
              className="bg-line h-px w-full origin-left"
              aria-hidden="true"
            />
          </div>
        </section>

        <div className="pt-[10vh]" />

        <ContactCta
          heading="Talk to the people who build it."
          body="Forty-five minutes, on a call. No deck. We’ll tell you plainly whether there’s something here worth building."
        />
      </main>
    </>
  );
}
