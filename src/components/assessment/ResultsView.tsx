"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AssessmentResults, AssessmentSubmission } from "@/lib/assessment/types";
import { formatAssessmentDollars, roundBreakdownLine } from "@/lib/assessment/format";
import { dimensionLabel } from "@/lib/assessment/scoring";
import { trackAssessment } from "@/lib/assessment/analytics";
import { TRACK_LABELS } from "@/lib/assessment/questions";
import type { TimeSlot } from "@/lib/assessment/slots";
import { DimensionBar } from "./DimensionBar";
import { ScoreRing } from "./ScoreRing";
import { RequestSessionCalendar } from "./RequestSessionCalendar";

export function ResultsView({
  results,
  submission,
}: {
  results: AssessmentResults;
  submission: AssessmentSubmission;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(submission);
  const [submitting, setSubmitting] = useState(false);
  const { diagnosis, vision, roadmap, projections, methodology } = results;

  useEffect(() => {
    trackAssessment("assessment_results_view");
  }, []);

  async function patch(body: Record<string, unknown>) {
    const res = await fetch(`/api/assessment/${current.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const updated = (await res.json().catch(() => null)) as AssessmentSubmission | null;
    if (updated) {
      setCurrent(updated);
      // The store mints a new id on every update — move the URL forward so
      // a refresh (or the print link below) decodes the post-booking state
      // instead of rolling back to whatever the page loaded with.
      router.replace(`/assessment/results/${updated.id}`, { scroll: false });
    }
  }

  async function handleBook(slot: TimeSlot, note: string) {
    setSubmitting(true);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    await patch({ requestedDatetime: slot.iso, requestedTimezone: timezone, requestedNote: note || undefined });
    trackAssessment("assessment_session_requested");
    setSubmitting(false);
  }

  async function handleSkip() {
    await patch({ skippedSession: true });
  }

  return (
    <div className="flex flex-col gap-[10vh]">
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
          <p className="label">
            {submission.track ? TRACK_LABELS[submission.track] : ""} · {diagnosis.maturityLabel}
          </p>
          <Link
            href={`/assessment/results/${current.id}/print`}
            onClick={() => trackAssessment("assessment_export_pdf")}
            className="link-quiet shrink-0 text-[0.8125rem] font-medium"
          >
            Export as PDF →
          </Link>
        </div>
        <div className="border-line grid gap-10 rounded-2xl border bg-white/40 p-6 md:grid-cols-[auto_1fr] md:items-center md:p-10">
          <ScoreRing score={diagnosis.scores.adjustedTotal} label={diagnosis.maturityLabel} />
          <div className="flex flex-col gap-6">
            <p className="text-ink/80 max-w-[52ch] text-[1rem] leading-[1.6]">{diagnosis.maturityDescription}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <DimensionBar label={dimensionLabel("infrastructure")} value={diagnosis.scores.dimensions.infrastructure} />
              <DimensionBar label={dimensionLabel("process")} value={diagnosis.scores.dimensions.process} />
              <DimensionBar label={dimensionLabel("metrics")} value={diagnosis.scores.dimensions.metrics} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <p className="label mb-6">What it&rsquo;s probably costing you</p>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-brick display text-[clamp(2.25rem,4.5vw,3.5rem)]">
              {formatAssessmentDollars(diagnosis.leakage.annualTotal)}
            </p>
            <p className="text-muted mt-2 text-[0.9375rem]">
              per year, ±25% ({formatAssessmentDollars(diagnosis.leakage.projections.confidenceRangeLow)}–
              {formatAssessmentDollars(diagnosis.leakage.projections.confidenceRangeHigh)})
            </p>
            <div className="border-line mt-6 flex flex-col gap-3 border-t pt-6">
              {diagnosis.leakage.lines.map((line) => (
                <div key={line.label} className="flex items-baseline justify-between gap-4">
                  <span className="text-ink/80 text-[0.875rem]">{line.label}</span>
                  <span className="text-ink text-[0.9375rem] font-medium tabular-nums">
                    {roundBreakdownLine(line.annual)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-line rounded-2xl border bg-white/40 p-6 md:p-8">
            <p className="text-muted text-[0.75rem] tracking-[0.06em] uppercase">Recoverable estimate</p>
            <p className="text-teal display mt-3 text-[clamp(2rem,4vw,3rem)]">
              {formatAssessmentDollars(projections.savings12mo)}
            </p>
            <p className="text-muted mt-2 text-[0.875rem]">in year one, at a {Math.round(methodology.recoverableFraction * 100)}% recovery rate</p>
            <p className="text-ink/80 mt-6 text-[0.9375rem]">
              {formatAssessmentDollars(projections.savings36mo)} over three years
            </p>
            <div className="border-line mt-6 border-t pt-5 text-[0.8125rem] leading-[1.6]">
              <p className="text-muted">
                Modeled on {methodology.revenueRangeLabel} in revenue and {methodology.manualHoursLabel.toLowerCase()} of
                manual work — directional, not a measurement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <p className="label mb-6">Where this goes</p>
        <ul className="flex flex-col gap-3">
          {vision.outcomes.map((outcome, i) => (
            <li key={i} className="border-line flex items-start gap-4 border-b py-4 first:border-t">
              <span className="text-teal mt-1 shrink-0 text-[0.75rem] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[0.9375rem] leading-[1.6]">{outcome}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="label mb-6">The roadmap</p>
        <div className="grid gap-6 md:grid-cols-3">
          {roadmap.steps.map((step, i) => (
            <div key={step.title} className="border-line rounded-2xl border bg-white/40 p-6">
              <span className="text-teal text-[0.75rem] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display-md text-ink mt-3 text-[1.125rem]">{step.title}</h3>
              <p className="text-muted mt-3 text-[0.875rem] leading-[1.6]">{step.description}</p>
              <div className="text-muted mt-5 flex flex-col gap-1 text-[0.75rem]">
                <span>{step.timeframe}</span>
                <span>{step.roiTimeframe}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="session" className="scroll-mt-28 border-line border-t pt-[8vh]">
        {current.requestedDatetime ? (
          <div className="text-center">
            <p className="text-ink text-[1.0625rem] font-medium">Time requested.</p>
            <p className="text-muted mt-2 text-[0.9375rem]">
              {new Date(current.requestedDatetime).toLocaleString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
            <p className="text-muted mt-2 text-[0.875rem]">We&rsquo;ll confirm by email shortly.</p>
          </div>
        ) : (
          <RequestSessionCalendar
            onBook={handleBook}
            onSkip={handleSkip}
            onIdleAbandon={() => {}}
            submitting={submitting}
          />
        )}
      </section>
    </div>
  );
}
