export function ScoreRing({ score, label }: { score: number; label: string }) {
  const radius = 68;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative size-[168px]">
        <svg viewBox="0 0 168 168" className="size-full -rotate-90">
          <circle cx="84" cy="84" r={radius} strokeWidth={stroke} className="stroke-line/60" fill="none" />
          <circle
            cx="84"
            cy="84"
            r={radius}
            strokeWidth={stroke}
            fill="none"
            stroke="var(--color-teal)"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s var(--ease-out-expo)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="display text-ink text-[2.5rem]">{score}</span>
          <span className="text-muted text-[0.6875rem] tracking-[0.08em] uppercase">/ 100</span>
        </div>
      </div>
      <p className="text-ink text-center text-[0.9375rem] font-semibold">{label}</p>
    </div>
  );
}
