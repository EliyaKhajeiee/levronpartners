"use client";

import type { Question } from "@/lib/assessment/types";

type QuestionCardProps = {
  question: Question;
  value: string | undefined;
  onSelect: (optionId: string) => void;
};

/**
 * Single-select question. Auto-advances ~300ms after a pick so most steps
 * never need an explicit "Continue" click — the click itself is the
 * confirmation.
 */
export function QuestionCard({ question, value, onSelect }: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="display-md text-ink max-w-[26ch] text-[clamp(1.5rem,3vw,2.25rem)]">
          {question.prompt}
        </h2>
        {question.subtext && (
          <p className="text-muted mt-3 max-w-[42ch] text-[0.9375rem] leading-[1.6]">{question.subtext}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {question.options?.map((option) => {
          const active = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={active}
              className={`group flex items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left text-[0.9375rem] transition-colors duration-300 ${
                active
                  ? "border-teal bg-teal/[0.06] text-ink"
                  : "border-line hover:border-teal/50 text-ink/90 bg-white/40"
              }`}
            >
              <span>{option.label}</span>
              <span
                className={`arrow-shift shrink-0 transition-opacity duration-300 ${
                  active ? "text-teal opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
                }`}
                aria-hidden="true"
              >
                →
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
