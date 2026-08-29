import Image from "next/image";
import { partners, clients, type Partner, type Client } from "@/lib/proof";
import { FlowRule } from "./FlowRule";

/**
 * The credibility block: the stack we build on, then the operations we've
 * built for.
 *
 * Both rows ride the same marquee — the partner row matches the "Proudly
 * Partnered With" wheel on levronlabs.com, each mark already at the ink
 * weight the brand renders it in. The client logos keep their own colour,
 * because they came from seven different places at seven different aspect
 * ratios and a static grid only draws attention to that; in motion they read
 * as a stream of names, which is the point. Each tile names the ground it
 * needs in `lib/proof.ts`.
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
          className="object-contain p-2"
        />
      </div>
      {/* Two lines' worth of room so the sectors stay on one baseline across
          the row even when a name wraps. */}
      <p className="text-ink mt-2.5 min-h-[2.5em] text-center text-[0.6875rem] leading-[1.25] font-medium">
        {c.name}
      </p>
      <p className="text-muted mt-0.5 text-center text-[0.625rem]">
        {c.sector}
      </p>
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

      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        {/* ── The rule between them ──
            Held to a narrow column: run full-bleed the lines stretch to a
            hairline smear and the lane change stops reading. */}
        <div className="mx-auto max-w-[30rem] py-[9vh]" aria-hidden="true">
          <FlowRule variant="momentum" bend={0.56} />
        </div>
      </div>

      {/* ── Companies we've worked with ── */}
      <SectionHead>Companies we&rsquo;ve worked with</SectionHead>

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
