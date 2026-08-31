/**
 * Shared types for the Free Assessment funnel.
 *
 * Scoped to the two verticals this site actually sells into — construction
 * and home services — unlike the reference implementation (levronlabs.com),
 * which branches across seven-plus industries. There is no "other" track
 * here: Q1 only offers the two tracks below, so nothing downstream needs an
 * industry-agnostic fallback path.
 */

export type Track = "construction" | "home_services";

export type Dimension = "infrastructure" | "process" | "metrics";

export type QuestionType = "single" | "email_gate";

export type QuestionOption = {
  id: string;
  label: string;
  /** 0–10, logarithmic maturity curve. Omitted on non-scored questions. */
  points?: number;
  dimension?: Dimension;
};

export type Question = {
  id: string;
  type: QuestionType;
  prompt: string;
  subtext?: string;
  options?: QuestionOption[];
  /** Omitted = shown on every track. */
  tracks?: Track[];
  required?: boolean;
};

export type DimensionScores = {
  infrastructure: number;
  process: number;
  metrics: number;
};

export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export type Scores = {
  dimensions: DimensionScores;
  /** Weighted total before the balance penalty. Stored, not displayed. */
  total: number;
  /** Weighted total after the balance penalty — the number that's shown. */
  adjustedTotal: number;
  balancePenalty: number;
  maturityLevel: MaturityLevel;
  maturityLabel: string;
  maturityDescription: string;
};

export type LeakageLine = {
  label: string;
  annual: number;
};

export type Leakage = {
  revenue: number;
  weeklyHours: number;
  teamSize: number;
  annualManualCost: number;
  opportunityCost: number;
  lines: LeakageLine[];
  annualTotal: number;
  projections: {
    month12: number;
    month36: number;
    confidenceRangeLow: number;
    confidenceRangeHigh: number;
  };
  severity: "high" | "medium" | "low";
};

export type RoadmapStep = {
  title: string;
  description: string;
  timeframe: string;
  roiTimeframe: string;
};

export type AssessmentResults = {
  diagnosis: {
    scores: Scores;
    maturityLabel: string;
    maturityDescription: string;
    leakage: Leakage;
  };
  vision: {
    outcomes: string[];
  };
  roadmap: {
    steps: RoadmapStep[];
  };
  projections: {
    savings12mo: number;
    savings36mo: number;
  };
  methodology: {
    revenueRangeLabel: string;
    revenueMidpointUsed: number;
    manualHoursLabel: string;
    recoverableFraction: number;
  };
};

export type AssessmentStatus = "started" | "completed";

export type AssessmentContact = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
};

export type AssessmentSubmission = {
  id: string;
  track?: Track;
  answers: Record<string, string>;
  scores?: Scores;
  leakage?: Leakage;
  status: AssessmentStatus;
  contact?: AssessmentContact;
  requestedDatetime?: string;
  requestedTimezone?: string;
  requestedNote?: string;
  skippedSession?: boolean;
  initialEmailSentAt?: string;
  initialEmailVariant?: "booked" | "unbooked";
  resultsViewedAt?: string;
  followupEmailSentAt?: string;
  createdAt: string;
  updatedAt: string;
};
