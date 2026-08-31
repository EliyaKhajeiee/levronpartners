import type { Leakage, Track } from "./types";

const REVENUE_MIDPOINTS: Record<string, number> = {
  under_500k: 350_000,
  "500k_1m": 750_000,
  "1m_3m": 2_000_000,
  "3m_10m": 5_000_000,
  "10m_plus": 12_000_000,
};

export const REVENUE_RANGE_LABELS: Record<string, string> = {
  under_500k: "Under $500K",
  "500k_1m": "$500K – $1M",
  "1m_3m": "$1M – $3M",
  "3m_10m": "$3M – $10M",
  "10m_plus": "$10M+",
};

const HOURS_MIDPOINTS: Record<string, number> = {
  under_5: 3,
  "5_10": 7.5,
  "10_20": 15,
  "20_40": 30,
  "40_plus": 50,
};

export const MANUAL_HOURS_LABELS: Record<string, string> = {
  under_5: "Under 5 hours/week",
  "5_10": "5–10 hours/week",
  "10_20": "10–20 hours/week",
  "20_40": "20–40 hours/week",
  "40_plus": "40+ hours/week",
};

/** Track-level constants behind team size, transaction volume, and labor cost. */
const INDUSTRY_CONSTANTS: Record<
  Track,
  { revenuePerEmployee: number; hourlyCost: number; avgTransaction: number }
> = {
  construction: { revenuePerEmployee: 180_000, hourlyCost: 48, avgTransaction: 25_000 },
  home_services: { revenuePerEmployee: 140_000, hourlyCost: 42, avgTransaction: 450 },
};

/**
 * The `frustration` answer nudges the labor and opportunity multipliers —
 * the same operation with the same manual hours costs more when the root
 * cause is disconnected systems (more re-entry, more error correction) than
 * when it's just a busy week.
 */
const FRUSTRATION_MULTIPLIERS: Record<string, { labor: number; opportunity: number }> = {
  data_silos: { labor: 1.25, opportunity: 1 },
  manual_work: { labor: 1.2, opportunity: 1 },
  no_visibility: { labor: 1, opportunity: 1.2 },
  scaling: { labor: 1.15, opportunity: 1.3 },
  errors: { labor: 1.265, opportunity: 1 },
};

function multipliersFor(frustration: string | undefined) {
  return FRUSTRATION_MULTIPLIERS[frustration ?? ""] ?? { labor: 1, opportunity: 1 };
}

/** Bid & change-order leakage as a fraction of revenue, by workflow maturity. */
const CONSTRUCTION_WORKFLOW_LEAKAGE: Record<string, number> = {
  whoever_gets_to_it: 0.12,
  depends_on_pm: 0.08,
  standard_with_chasing: 0.04,
  standard_no_chasing: 0.02,
};

/** Coordination-gap cost as a fraction of revenue, by update-cadence maturity. */
const CONSTRUCTION_COORDINATION_LEAKAGE: Record<string, number> = {
  they_call: 0.05,
  when_remembered: 0.035,
  scheduled_most: 0.02,
  automatic: 0.01,
};

/** Jobs lost per month to slow lead response, by speed-to-quote maturity. */
const HOME_SERVICES_MISSED_LEADS_PER_MONTH: Record<string, number> = {
  whenever_free: 6,
  same_day: 3,
  within_hours: 1.5,
  within_minutes: 0.5,
};

/** Defection rate applied against the repeat/referral-dependent slice of revenue. */
const HOME_SERVICES_DEFECTION_RATE: Record<string, number> = {
  nothing: 0.35,
  sometimes: 0.22,
  manual_sequence: 0.12,
  automatic_sequence: 0.05,
};
const HOME_SERVICES_REPEAT_REVENUE_SHARE = 0.15;

function severityFor(annualTotal: number): Leakage["severity"] {
  if (annualTotal >= 80_000) return "high";
  if (annualTotal >= 30_000) return "medium";
  return "low";
}

export function computeLeakage(track: Track, answers: Record<string, string>): Leakage {
  const revenue = REVENUE_MIDPOINTS[answers.revenue] ?? REVENUE_MIDPOINTS["1m_3m"];
  const weeklyHours = HOURS_MIDPOINTS[answers.manual_hours] ?? HOURS_MIDPOINTS["10_20"];
  const { revenuePerEmployee, hourlyCost, avgTransaction } = INDUSTRY_CONSTANTS[track];
  const teamSize = Math.max(2, Math.round(revenue / revenuePerEmployee));
  const multipliers = multipliersFor(answers.frustration);

  const annualManualCost = Math.round(weeklyHours * hourlyCost * 52 * multipliers.labor);
  const opportunityCost = Math.round(
    weeklyHours * 52 * (revenue / (teamSize * 2080)) * 0.3 * multipliers.opportunity,
  );

  const lines: Leakage["lines"] = [
    { label: "Manual data entry and reconciliation", annual: annualManualCost },
  ];

  if (track === "construction") {
    const workflowPct = CONSTRUCTION_WORKFLOW_LEAKAGE[answers.workflow_construction] ?? 0.08;
    const coordinationPct = CONSTRUCTION_COORDINATION_LEAKAGE[answers.retention_construction] ?? 0.035;
    lines.push({ label: "Bid and change-order leakage", annual: Math.round(revenue * workflowPct) });
    lines.push({ label: "Coordination gaps between office and field", annual: Math.round(revenue * coordinationPct) });
  } else {
    const jobsPerMonth = HOME_SERVICES_MISSED_LEADS_PER_MONTH[answers.workflow_home_services] ?? 3;
    const defectionRate = HOME_SERVICES_DEFECTION_RATE[answers.retention_home_services] ?? 0.22;
    lines.push({ label: "Missed and slow-followed-up leads", annual: Math.round(jobsPerMonth * 12 * avgTransaction) });
    lines.push({
      label: "Client defection after the job",
      annual: Math.round(revenue * HOME_SERVICES_REPEAT_REVENUE_SHARE * defectionRate),
    });
  }

  lines.push({ label: "Opportunity cost of time not spent selling or building", annual: opportunityCost });

  const annualTotal = lines.reduce((sum, l) => sum + l.annual, 0);
  const month12 = annualTotal;
  const month36 = Math.round(annualTotal + annualTotal * 1.08 + annualTotal * 1.08 ** 2);

  return {
    revenue,
    weeklyHours,
    teamSize,
    annualManualCost,
    opportunityCost,
    lines,
    annualTotal,
    projections: {
      month12,
      month36,
      confidenceRangeLow: Math.round(annualTotal * 0.75),
      confidenceRangeHigh: Math.round(annualTotal * 1.25),
    },
    severity: severityFor(annualTotal),
  };
}
