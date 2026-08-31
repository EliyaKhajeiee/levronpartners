/**
 * Self-serve session scheduler. Not wired to a real calendar — booking a
 * slot stores the requested time and notifies the team by email, the same
 * "no-calendar-integration-yet" shape as the reference implementation.
 *
 * Business hours are fixed in America/New_York regardless of where the
 * visitor is; slots are labeled back in whichever timezone their browser
 * reports.
 */

const BUSINESS_TZ = "America/New_York";
const START_HOUR = 10;
const END_HOUR = 20; // 8:00 PM
const STEP_MINUTES = 30;
const DAYS_AHEAD = 21;

export type TimeSlot = {
  /** ISO instant, UTC. */
  iso: string;
  /** Rendered in the visitor's local timezone. */
  label: string;
};

function offsetFor(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(date);
  const raw = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+00:00";
  return raw.replace("GMT", "") || "+00:00";
}

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Weekday check performed against the ET calendar date, since that's where business hours are anchored. */
function isWeekendInBusinessTz(date: Date): boolean {
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: BUSINESS_TZ, weekday: "short" }).format(date);
  return weekday === "Sat" || weekday === "Sun";
}

/** Tomorrow through +21 days, weekdays only, as midday UTC anchors (avoids DST edge cases at midnight). */
export function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const now = new Date();
  for (let i = 1; i <= DAYS_AHEAD; i++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + i, 12));
    if (!isWeekendInBusinessTz(d)) dates.push(d);
  }
  return dates;
}

/** All 30-minute slots (10am–8pm ET) for the ET calendar date `dayAnchor` resolves to. */
export function generateSlotsForDate(dayAnchor: Date): TimeSlot[] {
  const etDateKey = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(dayAnchor)
    .reduce((acc, p) => {
      if (p.type === "year") acc.y = p.value;
      if (p.type === "month") acc.m = p.value;
      if (p.type === "day") acc.d = p.value;
      return acc;
    }, {} as Record<"y" | "m" | "d", string>);

  const noonAnchor = new Date(`${etDateKey.y}-${etDateKey.m}-${etDateKey.d}T12:00:00Z`);
  const offset = offsetFor(noonAnchor, BUSINESS_TZ);

  const slots: TimeSlot[] = [];
  for (let minutes = START_HOUR * 60; minutes < END_HOUR * 60; minutes += STEP_MINUTES) {
    const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mm = String(minutes % 60).padStart(2, "0");
    const iso = `${etDateKey.y}-${etDateKey.m}-${etDateKey.d}T${hh}:${mm}:00${offset}`;
    const instant = new Date(iso);
    slots.push({
      iso: instant.toISOString(),
      label: instant.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
    });
  }
  return slots;
}

export function formatDateKey(date: Date): string {
  return dateKey(date);
}
