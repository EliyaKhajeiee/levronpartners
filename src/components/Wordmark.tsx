import { Mark } from "./Mark";

/**
 * The two lockups from the brand deck.
 *
 * `horizontal` — mark, hairline, then LEVRON stacked over a ruled LABS. This is
 * the nav lockup.
 * `stacked` — mark centred above the same wordmark. Used where the lockup gets
 * room to breathe.
 *
 * Everything scales off the element's own font-size, so a parent that sets
 * `text-[…]` sizes the whole lockup. The negative right margins pull back the
 * trailing sidebearing that letter-spacing adds after the final glyph, so the
 * words stay optically centred under the mark.
 */
export function Wordmark({
  variant = "horizontal",
  className = "",
}: {
  variant?: "horizontal" | "stacked";
  className?: string;
}) {
  const words = (
    <span className="flex flex-col items-center">
      <span className="wordmark">Levron</span>
      <span className="mt-[0.32em] flex w-full items-center gap-[0.5em]">
        <span className="bg-current h-px flex-1 opacity-45" />
        <span className="wordmark-sub">Labs</span>
        <span className="bg-current h-px flex-1 opacity-45" />
      </span>
    </span>
  );

  if (variant === "stacked") {
    return (
      <span
        className={`inline-flex flex-col items-center gap-[0.85em] ${className}`}
      >
        <Mark className="h-[0.62em] w-auto" />
        {words}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-[0.7em] ${className}`}>
      <Mark className="h-[0.72em] w-auto shrink-0" />
      <span className="bg-current h-[1.5em] w-px opacity-25" aria-hidden="true" />
      {words}
    </span>
  );
}
