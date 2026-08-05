/**
 * The Levron mark, traced off the brand deck.
 *
 * Two bars with a channel running between them. At roughly two-thirds across,
 * the channel steps down exactly one channel-width on a 45° diagonal — the
 * upper bar swells by that amount, the lower bar gives it up. That is the whole
 * idea of the business drawn once: a small intervention, placed late, that
 * redistributes everything downstream of it.
 *
 * Drawn on a 292 × 100 grid so the numbers stay whole:
 *   channel width 18 · left channel top 34 · right channel top 52 · diagonals 45°
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 292 100"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 0 H292 V52 H214 L196 34 H0 Z" />
      <path d="M0 52 H178 L196 70 H292 V100 H0 Z" />
    </svg>
  );
}
