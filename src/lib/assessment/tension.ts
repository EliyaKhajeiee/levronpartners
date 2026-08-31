import type { Scores } from "./types";

/**
 * Coarse, defensible personalization for email copy — buckets, not
 * fine-grained claims about a specific dimension score, since the model
 * behind these numbers is directional rather than measured.
 */
export function tensionLine(scores: Scores): string {
  const { infrastructure, metrics } = scores.dimensions;

  if (infrastructure < 35) {
    return "the tools not talking to each other";
  }
  if (metrics < 35) {
    return "not knowing the numbers until after the job's closed";
  }
  if (scores.adjustedTotal < 30) {
    return "how much of the week goes to work that isn't actually building anything";
  }
  return "where the hours are actually going";
}
