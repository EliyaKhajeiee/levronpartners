import Image from "next/image";
import type { BrandPhoto } from "@/lib/brand-photos";

/**
 * Brand objects laid out on Carbon, staggered, deliberately small.
 *
 * Both of those choices are about resolution, not taste. The deck crops carry
 * roughly 250px of real detail and there is no higher-resolution original, so
 * the assets are reconstructed with EDSR ×4 super-resolution rather than
 * interpolated (see `scripts/brand-photos.py`). That buys real headroom — the
 * panels here run 210–330px — but it is reconstruction, not detail that was
 * ever photographed. Push much past this and it starts to show.
 *
 * **~260px is the ceiling, and it has to hold at every width — not just on
 * desktop.** The blur that showed up first was a two-column grid stretching
 * panels to ~350px on tablets, which is larger than anything desktop renders.
 * `measure.js`-style spot checks across breakpoints are the only way to catch
 * that; a desktop screenshot will not.
 *
 * The dark ground does the other half of the work: residual softness is far
 * less legible against Carbon than against Paper, and these are dark, tactile
 * objects that were shot on dark grounds anyway.
 *
 * **If these ever get re-rendered at print resolution, the ceiling lifts.**
 * Until then, growing the panels is the change that made this look bad before.
 */

// span / column-start / how far the panel drops, on md and up.
// The drops alternate rather than descend — a monotonic slide down-and-right
// reads as a mistake, and leaves dead corners at both ends of the band.
const layout = [
  "md:col-span-2 md:col-start-1 md:mt-20",
  "md:col-span-3 md:col-start-4",
  "md:col-span-2 md:col-start-8 md:mt-16",
  "md:col-span-2 md:col-start-11 md:mt-4",
];

export function BrandStrip({
  label,
  photos,
}: {
  label: string;
  photos: BrandPhoto[];
}) {
  return (
    <section className="bg-ink px-6 pt-[13vh] pb-[9vh] md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <p data-fade className="label !text-white/45">
          {label}
        </p>
        <div
          data-line
          className="mt-5 h-px w-full origin-left bg-white/15"
          aria-hidden="true"
        />

        {/* Four across from `sm` up, not two. On a two-column grid a tablet
            stretches each panel to ~350px — larger than the biggest desktop
            panel and well past what these renders carry, which is exactly
            where they turn to mush. Going to four columns holds the widest
            panel at ~330px at every breakpoint. */}
        <div className="mx-auto grid max-w-[28rem] grid-cols-2 gap-6 pt-16 sm:max-w-[1080px] sm:grid-cols-4 md:grid-cols-12 md:gap-6">
          {photos.map((p, i) => (
            <figure
              key={p.src}
              data-rise
              style={{ "--group-delay": `${i * 110}ms` } as React.CSSProperties}
              className={layout[i] ?? "md:col-span-2"}
            >
              {/* Each panel takes its photo's own aspect rather than a shared
                  box. A uniform 3:2 was cropping ~16% off the sides of the
                  wider shots, which cut the wordmark off the van — and the
                  varied heights suit the staggered layout anyway. */}
              <div
                className="relative w-full overflow-hidden rounded-[0.5rem] ring-1 ring-white/10"
                style={{ aspectRatio: p.aspect }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 260px, (min-width: 640px) 25vw, 45vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[0.5625rem] tracking-[0.16em] text-white/40 uppercase">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
