/**
 * Dollar formatting for the assessment — deliberately imprecise past a
 * certain size. These are directional estimates built on a five-option
 * revenue band and a five-option hours band; showing `$47,382` would claim
 * a precision the inputs never had. Rounding harder as the number grows
 * keeps the display honest about how rough the estimate actually is.
 */
export function formatAssessmentDollars(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";

  if (abs >= 1_000_000) {
    const millions = abs / 1_000_000;
    const rounded = millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1);
    return `${sign}$${rounded}M`;
  }
  if (abs >= 10_000) {
    return `${sign}$${Math.round(abs / 1000)}K`;
  }
  if (abs >= 1_000) {
    return `${sign}$${(Math.round(abs / 500) * 500).toLocaleString("en-US")}`;
  }
  return `${sign}$${Math.round(abs / 100) * 100}`;
}

/**
 * Same rounding as `formatAssessmentDollars`, but prefixed with `~` for
 * breakdown lines above $1,000 — small inputs (a per-job ticket size, an
 * hourly rate) stay exact underneath so the arithmetic that built the line
 * is still inspectable.
 */
export function roundBreakdownLine(n: number): string {
  if (Math.abs(n) < 1000) {
    return `$${Math.round(n).toLocaleString("en-US")}`;
  }
  return `~${formatAssessmentDollars(n)}`;
}
