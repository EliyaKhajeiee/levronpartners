/**
 * The expanded visual language from the brand deck.
 *
 * A stack of hairlines running left to right. Partway across, some of them jog
 * a lane on the same 45° diagonal the mark uses, and the ones that move are
 * drawn in the accent. Same gesture as the logo, at a different scale: the
 * lines carry on, but not in the lane they started in.
 *
 * Used as a section rule rather than an illustration — it should read as ruling
 * on the page, not as a picture of something.
 */

const LANES = 7;
const LANE_H = 12;
const TOP = 6;
const W = 1200;
const H = TOP * 2 + (LANES - 1) * LANE_H;

/** Horizontal run a single lane-change takes, which fixes the diagonal at 45°. */
const RUN = LANE_H;

/** Where each line starts and ends, by lane index. Order is top to bottom. */
const variants = {
  /** One line leaves its lane. Everything else holds. */
  intervention: [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 4],
    [4, 4],
    [5, 5],
    [6, 6],
  ],
  /** Lines from above and below gather into the middle lanes. */
  flow: [
    [0, 2],
    [1, 2],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 4],
    [6, 4],
  ],
  /** Two pairs step down together and run on. */
  momentum: [
    [0, 0],
    [1, 1],
    [2, 3],
    [3, 3],
    [4, 5],
    [5, 5],
    [6, 6],
  ],
} as const;

export type FlowVariant = keyof typeof variants;

const y = (lane: number) => TOP + lane * LANE_H;

/** Straight until `bend`, one 45° diagonal per lane crossed, then straight. */
function path(from: number, to: number, bend: number) {
  const y0 = y(from);
  if (from === to) return `M0 ${y0} H${W}`;
  const y1 = y(to);
  const dx = Math.abs(to - from) * RUN;
  return `M0 ${y0} H${bend} L${bend + dx} ${y1} H${W}`;
}

export function FlowRule({
  variant = "flow",
  bend = 0.62,
  className = "",
}: {
  variant?: FlowVariant;
  /** Where the lines break, as a fraction of the width. */
  bend?: number;
  className?: string;
}) {
  const lines = variants[variant];
  const bendX = Math.round(W * bend);

  return (
    // Aspect is preserved rather than stretched, so the diagonals stay at the
    // mark's 45° at every width. Height follows width at 7%.
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      className={`text-ink h-auto w-full ${className}`}
    >
      {lines.map(([from, to], i) => {
        const moves = from !== to;
        return (
          <path
            key={i}
            d={path(from, to, bendX)}
            fill="none"
            stroke="currentColor"
            strokeWidth={moves ? 1.5 : 1}
            vectorEffect="non-scaling-stroke"
            // The lines that hold are ground; the ones that move are the point.
            className={moves ? "text-teal" : undefined}
            opacity={moves ? 1 : 0.22}
          />
        );
      })}
    </svg>
  );
}
