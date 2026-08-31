"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getQuestionsForTrack } from "@/lib/assessment/questions";
import type { AssessmentContact, AssessmentSubmission, Track } from "@/lib/assessment/types";
import type { TimeSlot } from "@/lib/assessment/slots";
import { trackAssessment } from "@/lib/assessment/analytics";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { EmailGateStep } from "./EmailGateStep";
import { RequestSessionCalendar } from "./RequestSessionCalendar";

type Phase = "questions" | "analyzing" | "session" | "session-sent";

const AUTO_ADVANCE_MS = 300;

/**
 * Returns the updated submission — critically, its `id`, which the store
 * mints fresh on every update. Callers must carry that id forward into the
 * next call; reusing the id this call was made with silently discards
 * whatever just changed (see store.ts).
 */
async function patchSubmission(id: string, body: Record<string, unknown>): Promise<AssessmentSubmission | null> {
  const res = await fetch(`/api/assessment/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return (await res.json().catch(() => null)) as AssessmentSubmission | null;
}

export function AssessmentWizard() {
  const router = useRouter();
  const [track, setTrack] = useState<Track | undefined>(undefined);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("questions");
  const [submitting, setSubmitting] = useState(false);
  const halfwayFired = useRef(false);
  const resolvedRef = useRef(false);
  // Guards the create-on-"revenue" branch below against a double-tap: two
  // taps inside the 300ms auto-advance window both read `submissionId` as
  // null from the same stale closure, so both fire POST /api/assessment and
  // mint a row — the second one silently orphaned once state catches up to
  // whichever response resolved last. A ref (synchronous, unlike state)
  // closes that window.
  const creatingSubmission = useRef(false);

  const questions = useMemo(() => getQuestionsForTrack(track), [track]);
  const currentQuestion = questions[stepIndex];

  useEffect(() => {
    trackAssessment("assessment_start");
  }, []);

  useEffect(() => {
    if (currentQuestion?.id === "email_gate") {
      trackAssessment("assessment_email_gate_view");
    }
  }, [currentQuestion?.id]);

  const percent = 12 + (stepIndex / Math.max(1, questions.length - 1)) * 88;

  useEffect(() => {
    if (!halfwayFired.current && percent >= 50) {
      halfwayFired.current = true;
      trackAssessment("assessment_50_percent");
    }
  }, [percent]);

  async function handleSelect(optionId: string) {
    if (!currentQuestion) return;
    const nextAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(nextAnswers);

    if (currentQuestion.id === "industry") {
      setTrack(optionId as Track);
    }

    window.setTimeout(async () => {
      // Row is created once both industry and revenue are known — everything
      // before that has nowhere to be saved yet.
      if (currentQuestion.id === "revenue" && !submissionId && !creatingSubmission.current) {
        creatingSubmission.current = true;
        const res = await fetch("/api/assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ track, answers: nextAnswers }),
        });
        const body = (await res.json().catch(() => ({}))) as { id?: string };
        if (body.id) setSubmissionId(body.id);
      } else if (submissionId) {
        const updated = await patchSubmission(submissionId, { answers: nextAnswers });
        if (updated) setSubmissionId(updated.id);
      }

      setStepIndex((i) => Math.min(i + 1, questions.length - 1));
    }, AUTO_ADVANCE_MS);
  }

  async function handleEmailGate(contact: AssessmentContact) {
    if (!submissionId) return;
    setSubmitting(true);
    const updated = await patchSubmission(submissionId, { answers, contact, finalize: true });
    if (updated) setSubmissionId(updated.id);
    trackAssessment("assessment_lead_created");
    setPhase("analyzing");
    window.setTimeout(() => {
      setSubmitting(false);
      setPhase("session");
    }, 2800);
  }

  async function handleBook(slot: TimeSlot, note: string) {
    if (!submissionId || resolvedRef.current) return;
    resolvedRef.current = true;
    setSubmitting(true);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const updated = await patchSubmission(submissionId, {
      requestedDatetime: slot.iso,
      requestedTimezone: timezone,
      requestedNote: note || undefined,
    });
    trackAssessment("assessment_calendar_time_selected");
    trackAssessment("assessment_session_requested");
    router.push(`/assessment/results/${updated?.id ?? submissionId}`);
  }

  async function handleSkip() {
    if (!submissionId || resolvedRef.current) return;
    resolvedRef.current = true;
    const updated = await patchSubmission(submissionId, { skippedSession: true });
    trackAssessment("assessment_calendar_skipped");
    router.push(`/assessment/results/${updated?.id ?? submissionId}`);
  }

  async function handleIdleAbandon() {
    if (!submissionId || resolvedRef.current) return;
    resolvedRef.current = true;
    await patchSubmission(submissionId, { skippedSession: true });
    trackAssessment("assessment_calendar_idle_abandon");
    setPhase("session-sent");
  }

  if (phase === "analyzing") {
    return (
      <div className="flex flex-col items-center gap-5 py-16 text-center">
        <div className="border-line border-t-teal size-8 animate-spin rounded-full border-2" aria-hidden="true" />
        <p className="text-muted text-[0.9375rem]">Analyzing your answers…</p>
      </div>
    );
  }

  if (phase === "session-sent") {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="text-ink text-[1.0625rem] font-medium">We sent your results to your email.</p>
        <p className="text-muted max-w-[36ch] text-[0.9375rem]">
          Come back anytime and book a free session straight from that email.
        </p>
      </div>
    );
  }

  if (phase === "session" && submissionId) {
    return (
      <RequestSessionCalendar
        onBook={handleBook}
        onSkip={handleSkip}
        onIdleAbandon={handleIdleAbandon}
        submitting={submitting}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col gap-10">
      <ProgressBar percent={percent} />
      {currentQuestion.type === "email_gate" ? (
        <EmailGateStep onSubmit={handleEmailGate} submitting={submitting} />
      ) : (
        <QuestionCard question={currentQuestion} value={answers[currentQuestion.id]} onSelect={handleSelect} />
      )}
    </div>
  );
}
