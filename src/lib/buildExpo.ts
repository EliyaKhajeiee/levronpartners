/**
 * BuildExpo visitors — 2026-10-28 (same behaviour as levronlabs.com).
 *
 * Someone who arrives from BuildExpo (levronpartners.com/buildexpo → redirect
 * in next.config.ts adds ?utm_source=buildexpo) gets a one-time welcome popup
 * with the 5-minute video on whatever page they land on.
 *
 * localStorage: people scan at the booth and come back days later on the same
 * phone. The flag lasts 30 days; once the popup has been shown it never shows
 * again in that browser. `?buildexpo=preview` forces it every time (for review).
 */

const STORAGE_KEY = "levronpartners:buildExpo";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

type Stored = { firstSeen: number; shown: boolean };

function read(): Stored | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Stored;
    if (Date.now() - value.firstSeen > TTL_MS) return null;
    return value;
  } catch {
    return null;
  }
}

function write(value: Stored) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked — the popup can still show for this page view.
  }
}

function isBuildExpo(value: string | null) {
  return !!value && value.toLowerCase().replace(/[\s_-]/g, "") === "buildexpo";
}

export function urlMarksBuildExpo(search: string): { match: boolean; preview: boolean } {
  const params = new URLSearchParams(search);
  const preview = params.get("buildexpo") === "preview";
  const match =
    preview ||
    params.get("buildexpo") === "1" ||
    ["utm_source", "ref", "from"].some((key) => isBuildExpo(params.get(key)));
  return { match, preview };
}

/** Call when the popup would show. True if it should show now (and marks it shown). */
export function consumeBuildExpoWelcome(search: string): boolean {
  const { match, preview } = urlMarksBuildExpo(search);
  if (preview) return true;
  const stored = read();
  if (!match && !stored) return false;
  if (stored?.shown) return false;
  write({ firstSeen: stored?.firstSeen ?? Date.now(), shown: true });
  return true;
}

export const BUILDEXPO_ASSESSMENT_HREF =
  "/assessment/start?utm_source=buildexpo&utm_medium=popup&utm_campaign=buildexpo_2026";
