/**
 * Case studies for the two Levron Partners clients with a real, measured
 * outcome we can point to. Same standing rule as everywhere else on this
 * site: only real numbers and only quotes the client actually said, in the
 * words they actually used. Nothing here is a composite or an example —
 * add a client here only once the engagement and the number are real.
 */

export type CaseStudy = {
  slug: string;
  company: string;
  client: string;
  role: string;
  sector: string;
  logo: string;
  headline: string;
  stats: { value: string; label: string }[];
  problem: string;
  found: string;
  built: string[];
  result: string;
  quote: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "south-central-investment-group",
    company: "South Central Investment Group",
    client: "Shahriar Shabazi",
    role: "Owner",
    sector: "General contractor",
    logo: "/clients/south-central-investment-group.png",
    headline: "50 hours a month, freed by centralizing jobs.",
    stats: [
      { value: "3–4 hrs → under 1 hr", label: "daily coordination" },
      { value: "50–60 hrs", label: "recovered per month" },
      { value: "$49,500/yr", label: "in reclaimed time" },
    ],
    problem:
      "Job scheduling, client communication, and project updates ran across calls, texts, and spreadsheets — no central system, just a collection of manual touchpoints that needed constant attention. The owner spent 3–4 hours every day confirming schedules, updating clients, and checking project status, and answering the same questions repeatedly because there was no automated way for anyone to get answers themselves. At that pace, taking on additional projects meant adding more hours to an already full day.",
    found:
      "Every coordination task was manual by default — nothing was making decisions, routing information, or updating stakeholders automatically. The workflows were simple and repeatable, exactly the kind that should run without a person in the loop.",
    built: [
      "Centralized scheduling across every active job",
      "Automated client-update notifications at key project milestones",
      "Real-time project status tracking for the whole team",
      "Communication history logged per job",
      "Automated reminders that cut missed appointments and delays",
    ],
    result:
      "The owner stopped being the communication layer between the team and the client. Daily coordination dropped from 3–4 hours to under 1, and job capacity went from capped to increased — without adding headcount.",
    quote: "It gave me my day back.",
  },
  {
    slug: "kung-fu-air-service",
    company: "Kung Fu Air Service",
    client: "Chris Barr",
    role: "Owner",
    sector: "HVAC service",
    logo: "/clients/kung-fu-air-service.png",
    headline: "Quoting time cut from 15 hours to 5, with voice.",
    stats: [
      { value: "10–15 hrs → 3–5 hrs", label: "weekly quoting time" },
      { value: "~40 hrs", label: "recovered per month" },
      { value: "$39,000/yr", label: "in reclaimed time" },
    ],
    problem:
      "Kung Fu Air Service spent 10–15 hours a week on quoting. Every job required the same repetitive line items — removing the old unit, applying warranty terms, documenting flare connection specs — typed or copy-pasted by hand, every time. None of it was hard work. It was the same handful of details, re-entered over and over, for every quote that went out the door.",
    found:
      "Quoting followed a small, predictable set of rules. The unit, the install specs, and the warranty terms changed job to job, but the structure of every quote — and most of its language — stayed the same. Exactly the kind of repetitive, rule-based work that shouldn't require someone typing it out by hand.",
    built: [
      "Voice-to-quote generation from a single spoken command",
      "Automatic application of manufacturer warranty terms",
      "Standard install warranty language applied by default",
      "Installation and flare-connection specs documented automatically",
      "Fully formatted, ready-to-send quotes — no retyping, no copy-pasting",
    ],
    result:
      "Chris gives a simple voice command — \"install a 12,000 BTU Fujitsu, new piping, new line covers, new condenser pads\" — and a fully formatted quote comes out the other side, warranty terms and install specs applied automatically. Weekly quoting time dropped from 10–15 hours to 3–5.",
    quote: "This is exactly what AI was made for.",
  },
];

export function caseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
