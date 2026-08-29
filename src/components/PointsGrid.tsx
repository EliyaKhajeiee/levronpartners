type Point = { title: string; body: string };

const COLS: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

/**
 * Label + heading + a numbered row of short points. Used across the
 * industry pages for "where it gets stuck", "what we'd build around it",
 * and similar beats — same shape Contact's "What to expect" grid uses, kept
 * as one component now that six pages need it.
 */
export function PointsGrid({
  label,
  heading,
  intro,
  items,
}: {
  label?: string;
  heading?: string;
  intro?: string;
  items: Point[];
}) {
  return (
    <section className="px-6 py-[10vh] md:px-10">
      <div className="mx-auto max-w-[1500px]">
        {label && (
          <p data-fade className="label mb-8">
            {label}
          </p>
        )}
        {heading && (
          <h2
            data-split
            className="display-md max-w-[22ch] text-[clamp(1.625rem,3.2vw,2.75rem)]"
          >
            {heading}
          </h2>
        )}
        {intro && (
          <p
            data-fade
            style={{ "--group-delay": "160ms" } as React.CSSProperties}
            className="text-muted mt-6 max-w-[56ch] text-[0.9375rem] leading-[1.7]"
          >
            {intro}
          </p>
        )}

        <div
          className={`grid gap-10 ${heading || intro ? "mt-12" : ""} ${
            COLS[items.length] ?? "md:grid-cols-3"
          } md:gap-10`}
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              data-fade
              style={{ "--group-delay": `${i * 120}ms` } as React.CSSProperties}
            >
              <div className="bg-line mb-6 h-px w-full" />
              <div className="text-teal text-[0.75rem] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="display-md mt-4 text-[clamp(1.125rem,1.7vw,1.5rem)]">
                {item.title}
              </h3>
              <p className="text-muted mt-4 max-w-[36ch] text-[0.9375rem] leading-[1.65]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
