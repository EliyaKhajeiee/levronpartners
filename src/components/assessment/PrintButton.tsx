"use client";

/** Manual fallback next to the auto-triggered print dialog (AutoPrint) — in case a browser blocks it or it's dismissed by accident. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="bg-ink pill hover:bg-teal inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition-colors duration-300"
    >
      Print / Save as PDF
    </button>
  );
}
