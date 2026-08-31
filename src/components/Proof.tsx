import Image from "next/image";
import { partners, clients, type Partner, type Client } from "@/lib/proof";
import { Artifact } from "./Artifact";

// The shape of an engagement, in brief. The full version lives on /process —
// keep these lines in step with the beats there.
const brief = [
  {
    when: "Week 1–2",
    k: "Map",
    b: "Ride-alongs and screen-shares until we can name the three constraints capping your throughput, and what each costs you in a year.",
  },
  {
    when: "Week 3–8",
    k: "Build",
    b: "The highest-leverage system first, in front of real jobs inside a month. You review it on your own data.",
  },
  {
    when: "Ongoing",
    k: "Compound",
    b: "Each system makes the next one cheaper to build and more accurate once it is.",
  },
];

/**
 * The credibility block: the stack we build on, then the operations we've
 * built for.
 *
 * Both rows ride the same marquee — the partner row matches the "Proudly
 * Partnered With" wheel on levronlabs.com, each mark already at the ink
 * weight the brand renders it in. The client row keeps the same tile format
 * but renders each logo in grayscale with no caption underneath.
 */

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1500px] px-6 md:px-10">
      <p data-fade className="label text-center">
        {children}
      </p>
      <div
        data-line
        className="bg-line mt-5 h-px w-full origin-left"
        aria-hidden="true"
      />
    </div>
  );
}

function PartnerLogo({ p, clone = false }: { p: Partner; clone?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-2.5 px-6 sm:px-10"
      {...(clone ? { "data-marquee-clone": "", "aria-hidden": true } : {})}
    >
      <span className={`relative block w-auto ${p.className}`}>
        <Image
          src={p.src}
          alt={p.label ? "" : p.name}
          width={p.width}
          height={p.height}
          unoptimized
          className={`h-full w-auto object-contain ${p.flatten ? "brightness-0" : ""}`}
        />
      </span>
      {p.label && (
        <span className="text-ink text-[1.0625rem] font-semibold tracking-[-0.01em] whitespace-nowrap">
          {p.label}
        </span>
      )}
    </div>
  );
}

function ClientTile({ c, clone = false }: { c: Client; clone?: boolean }) {
  return (
    <div
      className="w-[6.25rem] shrink-0 px-2.5 sm:w-[7.25rem]"
      {...(clone ? { "data-marquee-clone": "", "aria-hidden": true } : {})}
    >
      <div
        className="border-line relative aspect-[4/3] w-full overflow-hidden rounded-[0.625rem] border"
        style={{ background: c.bg }}
      >
        <Image
          src={c.src}
          alt={`${c.name} logo`}
          fill
          sizes="116px"
          className="object-contain p-2 grayscale"
        />
      </div>
    </div>
  );
}

/**
 * How many times the client list repeats inside one loop half.
 *
 * The animation translates the track by exactly -50%, so each half has to be
 * at least as wide as the *window* the marquee is shown through, or a gap
 * walks across it at the wrap. Two passes of seven tiles is ~1620px, which
 * clears the 64rem window set below.
 *
 * Keep this as low as the window allows. Every extra set is another copy of
 * the same seven logos on screen at once, and with only seven clients that
 * repetition is the first thing anyone notices.
 */
const SETS_PER_HALF = 2;

export function Proof() {
  const half = Array.from({ length: SETS_PER_HALF }, () => clients).flat();

  // Seconds per tile rather than a fixed lap time, so adding a client
  // lengthens the loop instead of speeding the whole row up. Tuned against the
  // narrower tiles to hold the drift at roughly 23px/s.
  const duration = `${half.length * 5}s`;

  return (
    <section className="py-[10vh]">
      {/* ── Proudly partnered with ── */}
      <SectionHead>Proudly partnered with</SectionHead>

      {/* Held to a 40rem window rather than run full-bleed — five marks is
          barely 500px of unique content, and the fade at the edges is what
          reads as a wheel rather than a static row. */}
      <div
        className="marquee mx-auto mt-10 max-w-[40rem]"
        style={{ "--marquee-duration": "70s" } as React.CSSProperties}
      >
        <div className="marquee-track">
          {partners.map((p) => (
            <PartnerLogo key={`a-${p.name}`} p={p} />
          ))}
          {/* The second pass carries no information — every mark in it is a
              clone, same as the client row below. */}
          {partners.map((p) => (
            <PartnerLogo key={`b-${p.name}`} p={p} clone />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 py-[9vh] md:px-10">
        <Artifact
          title="engagement-brief.md"
          footnote="Every engagement opens with the map. What follows is scoped from what it finds."
        >
          <div className="mx-auto max-w-[64ch]">
            <h2 className="display-md text-[clamp(1.5rem,2.6vw,2.25rem)]">
              One system in production inside eight weeks.
            </h2>

            <dl className="mt-10">
              {brief.map((row) => (
                <div
                  key={row.k}
                  className="border-line grid gap-2 border-t py-6 md:grid-cols-12 md:gap-8"
                >
                  <dt className="text-muted font-mono text-[0.75rem] md:col-span-3">
                    {row.when}
                  </dt>
                  <dd className="md:col-span-9">
                    <span className="text-teal font-medium">{row.k}.</span>{" "}
                    <span className="text-ink/75 text-[0.9375rem] leading-[1.65]">
                      {row.b}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Artifact>
      </div>

      {/* ── Proudly trusted by ── */}
      <SectionHead>Proudly trusted by</SectionHead>

      {/* Held to a 64rem window rather than run full-bleed. Seven tiles is
          about 810px of unique content; give it the whole viewport and the
          same logos are on screen two and three times over, which is the
          thing that reads as thin. At this width one pass roughly fills the
          clear area and the repeat stays inside the feathered edges. */}
      <div
        className="marquee mx-auto mt-12 max-w-[64rem]"
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        <div className="marquee-track">
          {half.map((c, i) => (
            <ClientTile
              key={`a-${i}`}
              c={c}
              clone={i >= clients.length}
            />
          ))}
          {/* The second half is what makes the wrap seamless. It carries no
              information at all, so every tile in it is a clone. */}
          {half.map((c, i) => (
            <ClientTile key={`b-${i}`} c={c} clone />
          ))}
        </div>
      </div>
    </section>
  );
}
