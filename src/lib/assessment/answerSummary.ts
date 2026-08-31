import { getQuestionsForTrack } from "./questions";
import type { Track } from "./types";

export type AnswerSummaryRow = { question: string; answer: string };

/** Question/answer pairs for the print appendix, in wizard order, skipping the email gate. */
export function buildAnswerSummary(track: Track, answers: Record<string, string>): AnswerSummaryRow[] {
  return getQuestionsForTrack(track)
    .filter((q) => q.type !== "email_gate")
    .map((q) => {
      const selectedId = answers[q.id];
      const option = q.options?.find((o) => o.id === selectedId);
      return { question: q.prompt, answer: option?.label ?? "—" };
    });
}
