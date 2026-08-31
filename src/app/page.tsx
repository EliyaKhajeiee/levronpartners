import Image from "next/image";
import Link from "next/link";
import { photos, hasPhoto } from "@/lib/media";
import { Reveal } from "@/components/Reveal";
import { Split } from "@/components/Split";
import { ScrollText } from "@/components/ScrollText";
import { Magnetic } from "@/components/Magnetic";
import { ContactCta } from "@/components/ContactCta";
import { Proof } from "@/components/Proof";

const onward = [
  {
    href: "/industries",
    label: "Industries",
    title: "Two places time actually goes",
    body: "Construction and home service — and the trades inside each.",
  },
  {
    href: "/work",
    label: "Work",
    title: "Where the week goes",
    body: "Some of the moments operators have brought us first.",
  },
  {
    href: "/process",
    label: "Process",
    title: "How an engagement runs",
    body: "Map the constraints, ship in weeks, then compound.",
  },
];

export default function Home() {
  return (
    <>
      <Reveal />

      <main id="top" className="flex-1">
        {/* ───────────── Hero ───────────── */}
        <section className="flex min-h-[100svh] flex-col justify-between px-6 pt-28 pb-14 md:px-10 md:pt-32 md:pb-20">
          <div className="mx-auto w-full max-w-[1500px]">
            <p data-fade className="label mb-8">
              For construction &amp; home service businesses
            </p>

            {/* Each clause keeps its own line — left to wrap, the headline
                breaks mid-sentence as "The business runs on you. / It
                doesn't have to." */}
            <h1
              className="display optical text-[clamp(2.875rem,9.2vw,8.5rem)]"
              style={{ lineHeight: 0.98 }}
            >
              <span data-split className="block">
                <Split text="The business runs on you." />
              </span>
              <span
                data-split
                style={{ "--group-delay": "140ms" } as React.CSSProperties}
                className="block"
              >
                <Split text="It doesn’t have to." />
              </span>
            </h1>

            {hasPhoto(photos.hero) && (
              <div
                data-rise
                style={{ "--group-delay": "520ms" } as React.CSSProperties}
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
          </div>

          <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <p
              data-fade
              style={{ "--group-delay": "680ms" } as React.CSSProperties}
              className="text-muted max-w-[44ch] text-[clamp(1.0625rem,1.6vw,1.4375rem)] leading-[1.5] tracking-[-0.015em]"
            >
              We find where your operation is leaking time and money, then
              build the systems that let you take on more without adding
              overhead. Built around how you actually work — not another
              platform you have to work around.
            </p>

            <div
              data-fade
              style={{ "--group-delay": "860ms" } as React.CSSProperties}
            >
              <Magnetic strength={0.24}>
                <Link
                  href="/contact#form"
                  className="group bg-ink pill hover:bg-teal inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold text-white"
                >
                  Get Started
                  <span className="arrow-shift">→</span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </section>

        <Proof />

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
              className={`display-md text-[clamp(1.875rem,3.8vw,3.375rem)] ${
                hasPhoto(photos.intro)
                  ? "md:col-span-6 md:col-start-7"
                  : "md:col-span-9"
              }`}
            >
              <Split text="We built Levron for the operators who are out of hours before they are out of work." />
            </h2>
          </div>
        </section>

        {/* ───────────── Statement ───────────── */}
        <section className="px-6 py-[16vh] md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ScrollText
              text="Nobody needs another dashboard. You need back the four hours a day your office spends retyping what the field already wrote down."
              className="display-md mx-auto max-w-[24ch] text-center text-[clamp(1.875rem,4.8vw,4rem)]"
            />
          </div>
        </section>

        {/* ───────────── Onward ───────────── */}
        <section className="px-6 pb-[14vh] md:px-10">
          <div className="mx-auto grid max-w-[1500px] gap-x-12 md:grid-cols-3">
            {onward.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                data-fade
                style={
                  { "--group-delay": `${i * 120}ms` } as React.CSSProperties
                }
                className="group border-line block border-t py-10 md:pr-12"
              >
                <div className="label">{card.label}</div>
                <h3 className="display-md mt-5 flex items-center gap-4 text-[clamp(1.5rem,2.6vw,2.25rem)]">
                  {card.title}
                  <span className="arrow-shift text-teal">→</span>
                </h3>
                <p className="text-ink/70 mt-3 max-w-[40ch] text-[0.9375rem] leading-[1.6]">
                  {card.body}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <ContactCta body="Bring your last ten quotes and a normal week off the schedule. In forty-five minutes, we can usually see where the capacity is getting eaten." />
      </main>
    </>
  );
}
