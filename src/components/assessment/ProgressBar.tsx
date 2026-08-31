export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="border-line h-1 w-full overflow-hidden rounded-full border-0 bg-black/[0.06]">
      <div
        className="bg-teal h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
      />
    </div>
  );
}
