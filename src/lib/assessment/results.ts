import type { AssessmentResults, Leakage, RoadmapStep, Scores, Track } from "./types";
import { MANUAL_HOURS_LABELS, REVENUE_RANGE_LABELS } from "./leakage";

const RECOVERABLE_FRACTION = 0.65;

/** 3 steps × 2 tiers × 2 tracks. Selected by maturity level, not by score alone. */
const ROADMAPS: Record<Track, { low: RoadmapStep[]; high: RoadmapStep[] }> = {
  construction: {
    low: [
      {
        title: "Centralize job status in one system",
        description:
          "Get every job — bids, change orders, schedule, status — into one place the whole crew works from, instead of split across texts, spreadsheets, and memory.",
        timeframe: "Weeks 1–3",
        roiTimeframe: "Payback within a quarter",
      },
      {
        title: "Standardize the bid-to-build handoff",
        description:
          "Build a repeatable process for how a bid becomes a job, so change orders and scope changes stop leaking margin between the office and the field.",
        timeframe: "Weeks 3–6",
        roiTimeframe: "Payback within one season",
      },
      {
        title: "Automate client and crew status updates",
        description:
          "Replace the \u201chow's it going\u201d phone calls with automatic updates the moment a job's status changes.",
        timeframe: "Weeks 6–8",
        roiTimeframe: "Payback within a quarter",
      },
    ],
    high: [
      {
        title: "Real-time job costing",
        description:
          "Connect field time and material data to job costing so profitability is known during the job, not after it's closed.",
        timeframe: "Weeks 1–4",
        roiTimeframe: "Payback within a quarter",
      },
      {
        title: "Portfolio-level pipeline visibility",
        description:
          "Roll every job's numbers up into one live view of pipeline, backlog, and margin, so capacity decisions get made on data instead of gut feel.",
        timeframe: "Weeks 4–7",
        roiTimeframe: "Payback within two quarters",
      },
      {
        title: "Automated bid-to-build handoff",
        description:
          "Remove the manual handoff between estimating and production entirely, so a won bid becomes a scheduled job without anyone re-keying it.",
        timeframe: "Weeks 7–9",
        roiTimeframe: "Payback within two quarters",
      },
    ],
  },
  home_services: {
    low: [
      {
        title: "Connect leads to dispatch",
        description:
          "Get every lead, quote, and job into one system the office and the truck both see, so nothing gets re-typed between a lead form, a scheduler, and a whiteboard.",
        timeframe: "Weeks 1–3",
        roiTimeframe: "Payback within a quarter",
      },
      {
        title: "Cut quote turnaround to minutes",
        description:
          "Build the intake and pricing flow that gets a quote in front of a new lead within minutes, not hours, before they call the next company.",
        timeframe: "Weeks 3–6",
        roiTimeframe: "Payback within a quarter",
      },
      {
        title: "Automate post-job follow-up",
        description:
          "Put every completed job into an automatic follow-up sequence — review requests, maintenance reminders, re-book prompts — without anyone having to remember.",
        timeframe: "Weeks 6–8",
        roiTimeframe: "Payback within one season",
      },
    ],
    high: [
      {
        title: "Live dispatch and tech tracking",
        description:
          "Move dispatch and job status updates to run live from the truck, so the office always knows where every job actually stands.",
        timeframe: "Weeks 1–4",
        roiTimeframe: "Payback within a quarter",
      },
      {
        title: "Per-tech, per-job-type margins",
        description:
          "Track conversion and margin by technician and job type in real time, so pricing and staffing decisions get made on current numbers.",
        timeframe: "Weeks 4–7",
        roiTimeframe: "Payback within two quarters",
      },
      {
        title: "Predictive maintenance and re-book engine",
        description:
          "Turn service history into automatic maintenance and re-book outreach, so repeat revenue stops depending on someone remembering to call.",
        timeframe: "Weeks 7–9",
        roiTimeframe: "Payback within two quarters",
      },
    ],
  },
};

const RECLAIMED_HOURS_LABEL: Record<string, string> = {
  under_5: "keep the office running lean without adding headcount",
  "5_10": "get back most of a workday every week",
  "10_20": "get back roughly two workdays every week",
  "20_40": "get back most of a full-time role's worth of hours every week",
  "40_plus": "get back more than a full-time role's worth of hours every week",
};

const VISION_OUTCOMES: Record<Track, string[]> = {
  construction: [
    "Every job's status is visible without a phone call — to the client or to your own PM.",
    "Change orders get priced and approved without a bid sitting in someone's inbox.",
    "You know which jobs are actually profitable before the final invoice, not after.",
    "Growth means more jobs running well, not more people re-typing the same schedule.",
  ],
  home_services: [
    "A new lead gets a quote fast enough that it's still yours to lose.",
    "Every completed job triggers its own follow-up, without anyone remembering to send it.",
    "You know conversion and margin by tech and by job type, not just by gut feel at month-end.",
    "Adding a truck adds revenue, not another few hours of office work a day.",
  ],
};

export function generateResults(track: Track, scores: Scores, leakage: Leakage, answers: Record<string, string>): AssessmentResults {
  const tier = scores.maturityLevel <= 3 ? "low" : "high";
  const savings12mo = Math.round(leakage.annualTotal * RECOVERABLE_FRACTION);
  const savings36mo = Math.round(leakage.projections.month36 * RECOVERABLE_FRACTION);

  const reclaimed = RECLAIMED_HOURS_LABEL[answers.manual_hours];
  const outcomes = [...VISION_OUTCOMES[track]];
  if (reclaimed) {
    outcomes.push(`The hours currently lost to manual re-entry go toward work that grows the business — enough to ${reclaimed}.`);
  }

  return {
    diagnosis: {
      scores,
      maturityLabel: scores.maturityLabel,
      maturityDescription: scores.maturityDescription,
      leakage,
    },
    vision: { outcomes },
    roadmap: { steps: ROADMAPS[track][tier] },
    projections: { savings12mo, savings36mo },
    methodology: {
      revenueRangeLabel: REVENUE_RANGE_LABELS[answers.revenue] ?? "—",
      revenueMidpointUsed: leakage.revenue,
      manualHoursLabel: MANUAL_HOURS_LABELS[answers.manual_hours] ?? "—",
      recoverableFraction: RECOVERABLE_FRACTION,
    },
  };
}
