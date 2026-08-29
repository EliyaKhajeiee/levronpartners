type Stat = { value: string; label: string };

const COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

/**
 * A ruled row of measured outcomes. Deliberately spare — no icons, no
 * cards — because the numbers are the argument. Only used where the result
 * is a real, measured client outcome; skip it rather than borrow one from
 * another vertical.
 */
export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <section className="px-6 py-[6vh] md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div
          data-line
          className="bg-line h-px w-full origin-left"
          aria-hidden="true"
        />
        <div
          className={`grid gap-x-8 gap-y-10 py-12 ${
            COLS[stats.length] ?? "sm:grid-cols-3"
          } md:py-16`}
        >
          {stats.map((s, i) => (
            <div
              key={s.value}
              data-fade
              style={{ "--group-delay": `${i * 120}ms` } as React.CSSProperties}
            >
              <div className="display-md text-teal text-[clamp(1.375rem,2.4vw,2rem)]">
                {s.value}
              </div>
              <div className="text-muted mt-3 max-w-[26ch] text-[0.875rem] leading-[1.5]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div
          data-line
          className="bg-line h-px w-full origin-left"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
