import Image from "next/image";
import type { BrandPhoto } from "@/lib/brand-photos";
import { Split } from "./Split";

/**
 * A dark full-width band: a brand photograph, heavily dimmed, with a statement
 * sitting on it.
 *
 * The overlay is doing two jobs. It holds the type at contrast, and it hides
 * the fact that these deck renders don't have the resolution to run wide on
 * their own — at 22% behind Carbon they read as texture, which is all they're
 * being asked to be. Don't lift the opacity much past that.
 */
export function BrandBand({
  photo,
  heading,
  body,
}: {
  photo: BrandPhoto;
  heading: string;
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.22]"
      />
      <div className="bg-ink absolute inset-0 -z-10" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1500px] px-6 py-[18vh] md:px-10">
        <h2
          data-split
          className="display max-w-[18ch] text-[clamp(2rem,5vw,4.25rem)] text-white"
        >
          <Split text={heading} />
        </h2>
        {body && (
          <p
            data-fade
            style={{ "--group-delay": "260ms" } as React.CSSProperties}
            className="mt-9 max-w-[46ch] text-[clamp(1rem,1.4vw,1.1875rem)] leading-[1.6] text-white/60"
          >
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
