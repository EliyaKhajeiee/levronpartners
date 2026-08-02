/** Levron mark — an isometric duct/beam module drawn from the grid. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 2 29 9.5V22.5L16 30 3 22.5V9.5L16 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 2v13.5m0 0L3 9.5m13 6L29 9.5m-13 6V30" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark className="text-teal h-[22px] w-[22px]" />
      <span className="text-[0.95rem] font-medium tracking-[-0.01em]">
        Levron<span className="text-teal"> Partners</span>
      </span>
    </span>
  );
}
