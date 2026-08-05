import Image from "next/image";
import { partners, clients, type Client } from "@/lib/proof";
import { FlowRule } from "./FlowRule";

/**
 * The credibility block: the stack we build on, then the operations we've
 * built for.
 *
 * Two rows, deliberately given two different treatments. The partner marks are
 * flattened to ink and centred so the row reads as one material — a list of
 * tools, not a wall of borrowed brands. The client logos keep their own colour
 * and ride a marquee, because they came from seven different places at seven
 * different aspect ratios and a static grid only draws attention to that; in
 * motion they read as a stream of names, which is the point. Each tile names
 * the ground it needs in `lib/proof.ts`.
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
      {/* ── Partners & platforms ── */}
      <SectionHead>Partners &amp; platforms</SectionHead>

      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-9 pt-12 md:gap-x-16 lg:gap-x-20">
          {partners.map((p, i) => (
            <div
              key={p.name}
              data-fade
              style={{ "--group-delay": `${i * 70}ms` } as React.CSSProperties}
              className="flex items-center gap-3.5"
            >
              <span
                className={`relative block h-8 shrink-0 ${
                  p.wordmark ? "w-[10.5rem]" : "w-9"
                }`}
                style={{ transform: `scale(${p.scale ?? 1})` }}
              >
                {/* These marks are already trimmed to size and flattened to
                    one colour, so there is nothing for the optimizer to win —
                    and re-encoding hairline logo art at this size only costs
                    fidelity. Straight through. */}
                <Image
                  src={p.src}
                  alt={p.wordmark ? p.name : ""}
                  fill
                  unoptimized
                  sizes={p.wordmark ? "168px" : "36px"}
                  className="logo-ink object-contain"
                />
              </span>
              {!p.wordmark && (
                <span className="text-ink/75 text-[1.0625rem] font-medium tracking-[-0.015em] whitespace-nowrap">
                  {p.name}
                </span>
              )}
            </div>
          ))}
        </div>

        <p
          data-fade
          className="text-muted mx-auto mt-11 max-w-[54ch] text-center text-[0.9375rem] leading-[1.65]"
        >
          The model providers we build on, the platforms your team already runs,
          and the partner programmes we&rsquo;re working through.
        </p>

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
