/**
 * Welcome video popup — 2026-10-28.
 *
 * Every visitor gets the popup with the 5-minute video the moment they land
 * (Eliya, 2026-10-28: "a straight popup on every single one, so the video pops
 * up right away"). It shows once per visit: closing it means it doesn't come
 * back while they click around, and it shows again on their next visit
 * (sessionStorage, per browser tab).
 *
 * BuildExpo visitors (the booth link levronpartners.com/buildexpo → ?utm_source=buildexpo,
 * also ref/from=buildexpo or ?buildexpo=1) get the "Good to meet you at
 * BuildExpo" greeting; that is remembered for 30 days (localStorage) so a later
 * visit still greets them. `?buildexpo=preview` forces the popup every time.
 *
 * Client-only; every storage call is wrapped (private mode can block it).
 */

const EXPO_KEY = "levronpartners:buildExpo";
const SHOWN_KEY = "levronpartners:welcomeVideoShown";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

function isBuildExpo(value: string | null) {
  return !!value && value.toLowerCase().replace(/[\s_-]/g, "") === "buildexpo";
}

/** True when the current URL marks a BuildExpo visit. */
export function urlMarksBuildExpo(search: string): { match: boolean; preview: boolean } {
  const params = new URLSearchParams(search);
  const preview = params.get("buildexpo") === "preview";
  const match =
    preview ||
    params.get("buildexpo") === "1" ||
    ["utm_source", "ref", "from"].some((key) => isBuildExpo(params.get(key)));
  return { match, preview };
}

function rememberedExpo(): boolean {
  try {
    const raw = window.localStorage.getItem(EXPO_KEY);
    if (!raw) return false;
    const value = JSON.parse(raw) as { firstSeen: number };
    return Date.now() - value.firstSeen <= TTL_MS;
  } catch {
    return false;
  }
}

function rememberExpo() {
  try {
    if (!rememberedExpo()) window.localStorage.setItem(EXPO_KEY, JSON.stringify({ firstSeen: Date.now() }));
  } catch {
    // Storage blocked — the greeting still works for this page view.
  }
}

function shownThisVisit(): boolean {
  try {
    return window.sessionStorage.getItem(SHOWN_KEY) === "1";
  } catch {
    return false;
  }
}

function markShown() {
  try {
    window.sessionStorage.setItem(SHOWN_KEY, "1");
  } catch {
    // Storage blocked — it may show again on the next page; better than never.
  }
}

/**
 * Call on landing. `show`: open the popup now (and it's marked as shown for
 * this visit). `buildExpo`: greet them as a BuildExpo visitor.
 */
export function consumeWelcomeVideo(search: string): { show: boolean; buildExpo: boolean } {
  const { match, preview } = urlMarksBuildExpo(search);
  if (match) rememberExpo();
  const buildExpo = match || rememberedExpo();
  if (preview) return { show: true, buildExpo: true };
  if (shownThisVisit()) return { show: false, buildExpo };
  markShown();
  return { show: true, buildExpo };
}

/** UTMs so the assessment lead record shows it came from the popup (and from the expo, when it did). */
export function welcomeAssessmentHref(buildExpo: boolean) {
  return buildExpo
    ? "/assessment/start?utm_source=buildexpo&utm_medium=popup&utm_campaign=buildexpo_2026"
    : "/assessment/start?utm_source=site&utm_medium=video_popup&utm_campaign=welcome_video";
}
