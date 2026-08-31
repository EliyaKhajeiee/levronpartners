import { TRACK_LABELS } from "@/lib/assessment/questions";
import { formatAssessmentDollars, roundBreakdownLine } from "@/lib/assessment/format";
import { dimensionLabel } from "@/lib/assessment/scoring";
import { buildAnswerSummary } from "@/lib/assessment/answerSummary";
import { site } from "@/lib/site";
import type { AssessmentResults, AssessmentSubmission } from "@/lib/assessment/types";

export function PrintActionPlan({
  results,
  submission,
}: {
  results: AssessmentResults;
  submission: AssessmentSubmission;
}) {
  const { diagnosis, vision, roadmap, projections, methodology } = results;
  const resultsUrl = `${site.url}/assessment/results/${submission.id}`;
  const sessionUrl = `${resultsUrl}#session`;
  const answerRows = submission.track ? buildAnswerSummary(submission.track, submission.answers) : [];

  return (
    <div id="print-shell" className="print-shell mx-auto max-w-[7.5in] flex-1 bg-[#f4eee2] px-10 py-14 text-[#1f2428]">
      <header className="print-avoid-break mb-10 flex items-end justify-between border-b border-[#d8d1c3] pb-6">
        <div>
          <p className="text-[0.6875rem] tracking-[0.14em] text-[#6b7176] uppercase">{site.name} — Action Plan</p>
          <h1 className="mt-2 text-[1.75rem] font-bold tracking-[-0.02em]">
            {submission.contact?.company ?? `${submission.contact?.firstName ?? ""} ${submission.contact?.lastName ?? ""}`.trim()}
          </h1>
          <p className="mt-1 text-[0.875rem] text-[#6b7176]">
            {submission.track ? TRACK_LABELS[submission.track] : "—"}
          </p>
        </div>
        <p className="text-[0.8125rem] text-[#6b7176]">
          {new Date(submission.updatedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </header>

      <section className="print-avoid-break mb-9">
        <h2 className="mb-4 text-[0.75rem] tracking-[0.1em] text-[#6b7176] uppercase">Diagnosis</h2>
        <div className="flex items-baseline gap-4">
          <span className="text-[2.5rem] font-extrabold tracking-[-0.03em]">{diagnosis.scores.adjustedTotal}</span>
          <span className="text-[1rem] font-semibold">{diagnosis.maturityLabel}</span>
        </div>
        <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-[1.6] text-[#1f2428cc]">{diagnosis.maturityDescription}</p>
        <div className="mt-5 grid grid-cols-3 gap-6">
          {(["infrastructure", "process", "metrics"] as const).map((d) => (
            <div key={d}>
              <div className="flex justify-between text-[0.8125rem]">
                <span>{dimensionLabel(d)}</span>
                <span className="tabular-nums">{diagnosis.scores.dimensions[d]}</span>
              </div>
              <div className="mt-1.5 h-1 w-full rounded-full bg-[#d8d1c3]">
                <div
                  className="h-full rounded-full bg-[#0e6e6e]"
                  style={{ width: `${diagnosis.scores.dimensions[d]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[0.75rem] leading-[1.5] text-[#6b7176]">
          These scores reflect the answers given, not an audit of the business — directional, not a measurement.
        </p>
      </section>

      <section className="print-avoid-break mb-9">
        <h2 className="mb-4 text-[0.75rem] tracking-[0.1em] text-[#6b7176] uppercase">Estimated leakage</h2>
        <p className="text-[1.75rem] font-extrabold tracking-[-0.02em] text-[#8c3a2e]">
          {formatAssessmentDollars(diagnosis.leakage.annualTotal)}/yr
        </p>
        <p className="mt-1 text-[0.8125rem] text-[#6b7176]">
          ±25% ({formatAssessmentDollars(diagnosis.leakage.projections.confidenceRangeLow)}–
          {formatAssessmentDollars(diagnosis.leakage.projections.confidenceRangeHigh)})
        </p>
        <div className="mt-4 flex flex-col gap-2 border-t border-[#d8d1c3] pt-4">
          {diagnosis.leakage.lines.map((line) => (
            <div key={line.label} className="flex justify-between text-[0.875rem]">
              <span>{line.label}</span>
              <span className="tabular-nums">{roundBreakdownLine(line.annual)}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[0.75rem] leading-[1.5] text-[#6b7176]">
          Modeled on {methodology.revenueRangeLabel} in revenue and {methodology.manualHoursLabel.toLowerCase()} of manual
          work per week.
        </p>
      </section>

      <section className="print-avoid-break mb-9">
        <h2 className="mb-4 text-[0.75rem] tracking-[0.1em] text-[#6b7176] uppercase">Cost trajectory</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[0.75rem] text-[#6b7176]">12 months</p>
            <p className="text-[1.375rem] font-bold">{formatAssessmentDollars(diagnosis.leakage.projections.month12)}</p>
          </div>
          <div>
            <p className="text-[0.75rem] text-[#6b7176]">36 months</p>
            <p className="text-[1.375rem] font-bold">{formatAssessmentDollars(diagnosis.leakage.projections.month36)}</p>
          </div>
        </div>
        <p className="mt-3 text-[0.875rem]">
          Recoverable estimate at {Math.round(methodology.recoverableFraction * 100)}%:{" "}
          <strong>{formatAssessmentDollars(projections.savings12mo)}</strong> in year one,{" "}
          <strong>{formatAssessmentDollars(projections.savings36mo)}</strong> over three years.
        </p>
      </section>

      <section className="print-avoid-break mb-9">
        <h2 className="mb-4 text-[0.75rem] tracking-[0.1em] text-[#6b7176] uppercase">Vision</h2>
        <ol className="flex flex-col gap-2">
          {vision.outcomes.map((outcome, i) => (
            <li key={i} className="flex gap-3 text-[0.875rem] leading-[1.55]">
              <span className="text-[#0e6e6e] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span>{outcome}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-9">
        <h2 className="mb-4 text-[0.75rem] tracking-[0.1em] text-[#6b7176] uppercase">Roadmap</h2>
        <div className="flex flex-col gap-4">
          {roadmap.steps.map((step, i) => (
            <div key={step.title} className="print-avoid-break border-b border-[#d8d1c3] pb-4 last:border-b-0">
              <div className="flex items-baseline gap-3">
                <span className="text-[0.75rem] text-[#0e6e6e] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1rem] font-semibold">{step.title}</h3>
              </div>
              <p className="mt-1.5 max-w-[62ch] text-[0.875rem] leading-[1.55] text-[#1f2428cc]">{step.description}</p>
              <p className="mt-1.5 text-[0.75rem] text-[#6b7176]">
                {step.timeframe} · {step.roiTimeframe}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[0.75rem] leading-[1.5] text-[#6b7176]">
          Effort and payback timing only — the dollar total above isn&rsquo;t split across these steps individually.
        </p>
      </section>

      <section className="print-avoid-break mb-9 rounded-lg border border-[#d8d1c3] bg-[#f4eee2] p-6 text-center">
        <p className="text-[1.0625rem] font-semibold">Book a free 45-minute session</p>
        <p className="mt-1 text-[0.875rem] text-[#6b7176]">No pitch. Bring your last ten quotes and a normal week.</p>
        <a href={sessionUrl} className="mt-3 inline-block text-[0.9375rem] font-medium text-[#0e6e6e] underline">
          {sessionUrl}
        </a>
      </section>

      <section className="mb-9">
        <h2 className="mb-4 text-[0.75rem] tracking-[0.1em] text-[#6b7176] uppercase">Answers</h2>
        <table className="w-full border-collapse text-[0.8125rem]">
          <tbody>
            {answerRows.map((row) => (
              <tr key={row.question} className="print-avoid-break border-b border-[#d8d1c3]">
                <td className="py-2 pr-4 align-top text-[#6b7176]">{row.question}</td>
                <td className="py-2 align-top font-medium">{row.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="border-t border-[#d8d1c3] pt-5 text-[0.75rem] leading-[1.6] text-[#6b7176]">
        <p>Results: {resultsUrl}</p>
        <p>Book a session: {sessionUrl}</p>
        <p className="mt-2">
          This estimate is directional, built from a short self-reported questionnaire — not an audit of {site.name}
          &rsquo;s making. Use it as a starting point for a conversation, not a financial statement.
        </p>
      </footer>
    </div>
  );
}
