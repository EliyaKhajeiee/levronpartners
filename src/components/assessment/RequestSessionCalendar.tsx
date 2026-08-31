"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDateKey, generateSlotsForDate, getAvailableDates, type TimeSlot } from "@/lib/assessment/slots";

const IDLE_TIMEOUT_MS = 15 * 60 * 1000;

type RequestSessionCalendarProps = {
  onBook: (slot: TimeSlot, note: string) => void;
  onSkip: () => void;
  /** Fired once, 15 minutes after mount, if neither book nor skip has happened yet. */
  onIdleAbandon: () => void;
  submitting: boolean;
};

export function RequestSessionCalendar({ onBook, onSkip, onIdleAbandon, submitting }: RequestSessionCalendarProps) {
  const dates = useMemo(() => getAvailableDates(), []);
  const [selectedDateKey, setSelectedDateKey] = useState(() => formatDateKey(dates[0]));
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(onIdleAbandon, IDLE_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
    // Intentionally fires once per mount — re-arming on every keystroke would
    // let an abandoned tab sit open indefinitely.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedDate = dates.find((d) => formatDateKey(d) === selectedDateKey) ?? dates[0];
  const slots = useMemo(() => generateSlotsForDate(selectedDate), [selectedDate]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="display-md text-ink max-w-[24ch] text-[clamp(1.5rem,3vw,2.25rem)]">
          Want to talk through it?
        </h2>
        <p className="text-muted mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.6]">
          Free 45-minute session, no pitch. Pick a time and we&rsquo;ll confirm — or skip for now and come back to your
          results whenever.
        </p>
      </div>

      <div>
        <p className="text-muted mb-3 text-[0.75rem] font-medium tracking-[0.06em] uppercase">Date</p>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {dates.map((d) => {
            const key = formatDateKey(d);
            const active = key === selectedDateKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedDateKey(key);
                  setSelectedSlot(null);
                }}
                className={`shrink-0 rounded-lg border px-4 py-2.5 text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-300 ${
                  active ? "border-teal bg-teal/[0.08] text-ink" : "border-line text-muted hover:border-teal/50"
                }`}
              >
                {d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-muted mb-3 text-[0.75rem] font-medium tracking-[0.06em] uppercase">Time</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {slots.map((slot) => {
            const active = selectedSlot?.iso === slot.iso;
            return (
              <button
                key={slot.iso}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-lg border px-3 py-2.5 text-[0.8125rem] font-medium transition-colors duration-300 ${
                  active ? "border-teal bg-teal/[0.08] text-ink" : "border-line text-muted hover:border-teal/50"
                }`}
              >
                {slot.label}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-muted text-[0.75rem] font-medium tracking-[0.06em] uppercase">
          Anything we should know? (optional)
        </span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="border-line focus:border-teal resize-none rounded-lg border bg-transparent px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-300"
        />
      </label>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="button"
          disabled={!selectedSlot || submitting}
          onClick={() => selectedSlot && onBook(selectedSlot, note)}
          className="bg-ink pill hover:bg-teal inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.9375rem] font-semibold text-white transition-colors duration-500 disabled:opacity-50"
        >
          {submitting ? "Requesting…" : "Request this time"}
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={submitting}
          className="link-quiet text-[0.875rem] font-medium disabled:opacity-50"
        >
          Skip for now — just show me my results
        </button>
      </div>
    </div>
  );
}
