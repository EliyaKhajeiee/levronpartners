/** Full-bleed accent band of scrolling type. Duplicated once for a seamless loop. */
export function Marquee({ items }: { items: readonly string[] }) {
  return (
    <div
      className="bg-accent text-bg relative flex overflow-hidden py-5 md:py-7"
      aria-hidden="true"
    >
      <div className="marquee-track flex shrink-0">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="display-sm flex shrink-0 items-center text-[clamp(1.75rem,4.4vw,3.5rem)] whitespace-nowrap"
              >
                {item}
                <span className="mx-7 inline-block h-2 w-2 rounded-full bg-current align-middle md:mx-10" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
