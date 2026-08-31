import type { Question, Track } from "./types";

/**
 * The full question bank — universal questions plus four track-specific
 * questions per vertical (`tools`, `workflow`, `retention`, `metrics`).
 *
 * Point calibration follows the same logarithmic curve as the reference
 * model: standard options score 1 / 3 / 6 / 10, so the gap between "barely
 * doing it" and "doing it well" is much larger than the gap between "doing
 * it well" and "doing it perfectly" — most operators cluster in the middle,
 * and the curve keeps that cluster from flattening the score.
 */

export const QUESTIONS: Question[] = [
  // ── Q1 — Industry (branches the track, not scored) ──
  {
    id: "industry",
    type: "single",
    prompt: "What best describes your business?",
    options: [
      { id: "construction", label: "Construction" },
      { id: "home_services", label: "Home Services" },
    ],
    required: true,
  },

  // ── Sector/trade follow-up (context only, not scored) ──
  {
    id: "construction_sector",
    type: "single",
    prompt: "What sector of construction?",
    tracks: ["construction"],
    required: true,
    options: [
      { id: "residential", label: "Residential" },
      { id: "commercial", label: "Commercial" },
      { id: "institutional", label: "Institutional" },
      { id: "industrial", label: "Industrial" },
      { id: "civil_infrastructure", label: "Civil and infrastructure" },
      { id: "mixed_use", label: "Mixed-use development" },
    ],
  },
  {
    id: "home_services_trade",
    type: "single",
    prompt: "What trade best describes your business?",
    tracks: ["home_services"],
    required: true,
    options: [
      { id: "hvac", label: "HVAC" },
      { id: "electrical", label: "Electrical" },
      { id: "plumbing", label: "Plumbing" },
      { id: "roofing", label: "Roofing" },
      { id: "lawn_care", label: "Lawn care" },
      { id: "pest_control", label: "Pest control" },
      { id: "other", label: "Something else" },
    ],
  },

  // ── Q2 — Revenue (leakage anchor, not scored) ──
  {
    id: "revenue",
    type: "single",
    prompt: "What's your annual revenue?",
    subtext: "This anchors the estimate below — it's never shared or stored anywhere but here.",
    options: [
      { id: "under_500k", label: "Under $500K" },
      { id: "500k_1m", label: "$500K – $1M" },
      { id: "1m_3m", label: "$1M – $3M" },
      { id: "3m_10m", label: "$3M – $10M" },
      { id: "10m_plus", label: "$10M+" },
    ],
    required: true,
  },

  // ── Construction track ──
  {
    id: "tools_construction",
    type: "single",
    prompt: "How do you currently track jobs, schedules, and status?",
    tracks: ["construction"],
    required: true,
    options: [
      { id: "whiteboard", label: "Whiteboards, spreadsheets, and group texts", points: 1, dimension: "infrastructure" },
      { id: "disconnected", label: "A few tools, but they don't talk to each other", points: 3, dimension: "infrastructure" },
      { id: "one_system_stale", label: "One system, but the field doesn't update it in real time", points: 6, dimension: "infrastructure" },
      { id: "one_system_live", label: "One system everyone works from, updated as the job moves", points: 10, dimension: "infrastructure" },
    ],
  },
  {
    id: "workflow_construction",
    type: "single",
    prompt: "How do bids, change orders, and crew assignments move?",
    tracks: ["construction"],
    required: true,
    options: [
      { id: "whoever_gets_to_it", label: "Whoever's free writes it up, whenever they get to it", points: 1, dimension: "process" },
      { id: "depends_on_pm", label: "There's a process, but it depends on who's running the job", points: 3, dimension: "process" },
      { id: "standard_with_chasing", label: "A standard process most jobs follow, with some manual chasing", points: 6, dimension: "process" },
      { id: "standard_no_chasing", label: "A standard process every job follows, with almost no chasing", points: 10, dimension: "process" },
    ],
  },
  {
    id: "retention_construction",
    type: "single",
    prompt: "How do clients and crews get updated on job status?",
    tracks: ["construction"],
    required: true,
    options: [
      { id: "they_call", label: "They call and ask", points: 1, dimension: "process" },
      { id: "when_remembered", label: "Updates happen, but only when someone remembers", points: 3, dimension: "process" },
      { id: "scheduled_most", label: "Scheduled updates for most jobs", points: 6, dimension: "process" },
      { id: "automatic", label: "Automatic updates the moment status changes", points: 10, dimension: "process" },
    ],
  },
  {
    id: "metrics_construction",
    type: "single",
    prompt: "How confident are you in job profitability and pipeline numbers?",
    tracks: ["construction"],
    required: true,
    options: [
      { id: "after_closed", label: "We find out after the job's closed, if at all", points: 1, dimension: "metrics" },
      { id: "real_digging", label: "We can pull it together, but it takes real digging", points: 3, dimension: "metrics" },
      { id: "project_level_periodic", label: "We know at a project level, updated periodically", points: 6, dimension: "metrics" },
      { id: "real_time_portfolio", label: "We know in real time, at a project and portfolio level", points: 10, dimension: "metrics" },
    ],
  },

  // ── Home services track ──
  {
    id: "tools_home_services",
    type: "single",
    prompt: "How are leads, dispatch, and job tracking handled?",
    tracks: ["home_services"],
    required: true,
    options: [
      { id: "phone_paper", label: "Phone calls, texts, and a paper board", points: 1, dimension: "infrastructure" },
      { id: "disconnected", label: "A scheduling tool, but leads and dispatch aren't connected to it", points: 3, dimension: "infrastructure" },
      { id: "one_system_after_fact", label: "One system, but techs update it after the fact", points: 6, dimension: "infrastructure" },
      { id: "one_system_live", label: "One system, updated live from the truck", points: 10, dimension: "infrastructure" },
    ],
  },
  {
    id: "workflow_home_services",
    type: "single",
    prompt: "How fast do new leads get a quote?",
    tracks: ["home_services"],
    required: true,
    options: [
      { id: "whenever_free", label: "Whenever someone gets a free minute — could be hours", points: 1, dimension: "process" },
      { id: "same_day", label: "Usually same-day, if it's a normal day", points: 3, dimension: "process" },
      { id: "within_hours", label: "Within an hour or two, most of the time", points: 6, dimension: "process" },
      { id: "within_minutes", label: "Within minutes, every time", points: 10, dimension: "process" },
    ],
  },
  {
    id: "retention_home_services",
    type: "single",
    prompt: "What happens after the job's done?",
    tracks: ["home_services"],
    required: true,
    options: [
      { id: "nothing", label: "Nothing, unless the customer calls", points: 1, dimension: "process" },
      { id: "sometimes", label: "A follow-up happens sometimes", points: 3, dimension: "process" },
      { id: "manual_sequence", label: "A standard follow-up sequence, mostly manual", points: 6, dimension: "process" },
      { id: "automatic_sequence", label: "An automatic follow-up sequence every time", points: 10, dimension: "process" },
    ],
  },
  {
    id: "metrics_home_services",
    type: "single",
    prompt: "How well do you know your lead conversion and margins?",
    tracks: ["home_services"],
    required: true,
    options: [
      { id: "not_tracked", label: "We don't really track it", points: 1, dimension: "metrics" },
      { id: "from_memory", label: "We know roughly, from memory", points: 3, dimension: "metrics" },
      { id: "periodic", label: "We track it, updated periodically", points: 6, dimension: "metrics" },
      { id: "real_time_by_tech", label: "We track it in real time, by tech and by job type", points: 10, dimension: "metrics" },
    ],
  },

  // ── Q7 — Manual hours (all tracks; process points + leakage hours) ──
  {
    id: "manual_hours",
    type: "single",
    prompt:
      "How many hours a week does someone spend on manual data entry — retyping, re-keying, or reconciling information that already exists somewhere else?",
    required: true,
    options: [
      { id: "under_5", label: "Under 5 hours", points: 9, dimension: "process" },
      { id: "5_10", label: "5–10 hours", points: 7, dimension: "process" },
      { id: "10_20", label: "10–20 hours", points: 4, dimension: "process" },
      { id: "20_40", label: "20–40 hours", points: 2, dimension: "process" },
      { id: "40_plus", label: "40+ hours", points: 0, dimension: "process" },
    ],
  },

  // ── Q8 — Frustration (all tracks; scored + leakage multipliers) ──
  {
    id: "frustration",
    type: "single",
    prompt: "What's the most frustrating part of how the office runs today?",
    required: true,
    options: [
      { id: "data_silos", label: "Data stuck in different tools that don't talk to each other", points: 2, dimension: "infrastructure" },
      { id: "manual_work", label: "Too much manual work for how much revenue we're doing", points: 2, dimension: "process" },
      { id: "no_visibility", label: "No real-time visibility into what's actually happening", points: 2, dimension: "metrics" },
      { id: "scaling", label: "Can't add revenue without adding headcount", points: 1, dimension: "process" },
      { id: "errors", label: "Errors and dropped balls that cost us money or trust", points: 1, dimension: "process" },
    ],
  },

  // ── Q9 — Email gate (lead capture, not scored) ──
  {
    id: "email_gate",
    type: "email_gate",
    prompt: "Where should we send your results?",
    subtext: "We'll email your Action Plan and follow up to schedule a free session if you want one.",
    required: true,
  },
];

/**
 * Filters the bank down to the 10-question sequence for a track. Mirrors the
 * reference logic, minus the "other" fallback — Q1 here only ever resolves
 * to `construction` or `home_services`, so nothing downstream needs an
 * industry-agnostic path. The sector/trade follow-up right after Q1 is
 * context for the appendix and personalization only — it has no `points`,
 * so `computeScores` and `computeLeakage` ignore it.
 */
export function getQuestionsForTrack(track: Track | undefined): Question[] {
  if (!track) {
    return QUESTIONS.filter((q) => q.id === "industry");
  }
  return QUESTIONS.filter((q) => !q.tracks || q.tracks.includes(track));
}

export const TRACK_LABELS: Record<Track, string> = {
  construction: "Construction",
  home_services: "Home Services",
};
