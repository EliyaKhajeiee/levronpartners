import type { Dimension, DimensionScores, MaturityLevel, Scores, Track } from "./types";
import { QUESTIONS } from "./questions";

/** Industry-weighted contribution of each dimension to the total score. */
const DIMENSION_WEIGHTS: Record<Track, DimensionScores> = {
  construction: { infrastructure: 0.3, process: 0.45, metrics: 0.25 },
  home_services: { infrastructure: 0.35, process: 0.4, metrics: 0.25 },
};

const MATURITY_LEVELS: {
  level: MaturityLevel;
  label: string;
  description: string;
  min: number;
  max: number;
}[] = [
  {
    level: 1,
    label: "Firefighting",
    description: "Most of the day goes to whatever's on fire, not to the plan for the week.",
    min: 0,
    max: 20,
  },
  {
    level: 2,
    label: "Defined but Manual",
    description: "There's a real process — it just still runs through people re-typing the same information.",
    min: 21,
    max: 40,
  },
  {
    level: 3,
    label: "Connected / Tool Sprawl",
    description: "The tools mostly talk to each other, but nobody fully trusts the numbers between them.",
    min: 41,
    max: 60,
  },
  {
    level: 4,
    label: "Automated",
    description: "The system does most of the chasing. People make the calls that actually need a person.",
    min: 61,
    max: 80,
  },
  {
    level: 5,
    label: "Optimized",
    description: "The operation runs on data it trusts, in real time, without anyone having to ask for it.",
    min: 81,
    max: 100,
  },
];

function maturityFor(score: number) {
  return (
    MATURITY_LEVELS.find((m) => score >= m.min && score <= m.max) ??
    MATURITY_LEVELS[MATURITY_LEVELS.length - 1]
  );
}

function standardDeviation(values: number[]) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  return { mean, sd: Math.sqrt(variance) };
}

/**
 * Computes the three dimension scores, the industry-weighted total, and the
 * balance-penalty-adjusted total that's actually shown.
 *
 * `frustration` is the one question whose dimension is answer-dependent — it
 * only feeds whichever dimension the chosen option maps to, so both the raw
 * points and the normalizing max for that dimension include it only when the
 * respondent's answer landed there.
 */
export function computeScores(track: Track, answers: Record<string, string>): Scores {
  const trackQuestions = QUESTIONS.filter(
    (q) => q.options?.some((o) => o.points !== undefined) && (!q.tracks || q.tracks.includes(track)),
  );

  const raw: DimensionScores = { infrastructure: 0, process: 0, metrics: 0 };
  const max: DimensionScores = { infrastructure: 0, process: 0, metrics: 0 };

  for (const question of trackQuestions) {
    const selectedId = answers[question.id];
    const options = question.options ?? [];
    const maxPoints = Math.max(...options.map((o) => o.points ?? 0));

    if (question.id === "frustration") {
      // Answer-dependent dimension: only contributes to whichever
      // dimension the chosen option belongs to.
      const selected = options.find((o) => o.id === selectedId);
      if (selected?.dimension) {
        raw[selected.dimension] += selected.points ?? 0;
        max[selected.dimension] += maxPoints;
      }
      continue;
    }

    const dimension = options[0]?.dimension;
    if (!dimension) continue;

    max[dimension] += maxPoints;
    const selected = options.find((o) => o.id === selectedId);
    if (selected) raw[dimension] += selected.points ?? 0;
  }

  const dimensions: DimensionScores = {
    infrastructure: max.infrastructure > 0 ? Math.round((raw.infrastructure / max.infrastructure) * 100) : 0,
    process: max.process > 0 ? Math.round((raw.process / max.process) * 100) : 0,
    metrics: max.metrics > 0 ? Math.round((raw.metrics / max.metrics) * 100) : 0,
  };

  // Infrastructure floor: weak infrastructure caps how much credit a strong
  // process score can take, since a good process running on broken plumbing
  // isn't actually delivering what the score would otherwise imply.
  if (dimensions.infrastructure < 30) {
    const cap = 0.5 + dimensions.infrastructure / 60;
    dimensions.process = Math.round(dimensions.process * cap);
  }

  const weights = DIMENSION_WEIGHTS[track];
  const total = Math.round(
    dimensions.infrastructure * weights.infrastructure +
      dimensions.process * weights.process +
      dimensions.metrics * weights.metrics,
  );

  // Balance penalty: three dimensions that are all mediocre reflect a more
  // even operation than one great dimension propping up two that are barely
  // scored — the coefficient-of-variation penalty pulls a spiky profile down
  // relative to a flat one at the same weighted total.
  const { mean, sd } = standardDeviation([dimensions.infrastructure, dimensions.process, dimensions.metrics]);
  const cv = mean > 0 ? sd / mean : 0;
  const balancePenalty = Math.min(cv * 0.15, 0.2);
  const adjustedTotal = Math.round(total * (1 - balancePenalty));

  const maturity = maturityFor(adjustedTotal);

  return {
    dimensions,
    total,
    adjustedTotal,
    balancePenalty,
    maturityLevel: maturity.level,
    maturityLabel: maturity.label,
    maturityDescription: maturity.description,
  };
}

export function dimensionLabel(dimension: Dimension): string {
  switch (dimension) {
    case "infrastructure":
      return "Infrastructure";
    case "process":
      return "Process";
    case "metrics":
      return "Metrics";
  }
}
