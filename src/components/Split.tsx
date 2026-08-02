/**
 * Splits a string into per-word masked spans for the slide-up reveal.
 * Renders on the server — the animation is layered on by CSS + Reveal.
 *
 * `start` offsets the stagger index so two Splits can read as one sequence.
 */
export function Split({
  text,
  start = 0,
  className = "",
}: {
  text: string;
  start?: number;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="split-word">
            <span
              className="split-inner"
              style={{ "--i": i + start } as React.CSSProperties}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
