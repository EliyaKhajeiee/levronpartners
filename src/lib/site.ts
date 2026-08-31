export const site = {
  name: "Levron Partners",
  domain: "levronpartners.com",
  url: "https://levronpartners.com",
  tagline: "Same crew. More capacity.",

  /**
   * Deliberately says "operation" and not "construction operation".
   * Construction and home services are where we're selling, and the copy
   * leans that way — but the site stays legible to the operator in another
   * trade who lands on it, because those are still deals we take.
   */
  description:
    "We find where your operation is leaking hours, then build the software that removes them. Custom to how your business actually runs.",

  /** The two lines carried over from the brand deck. */
  promise: "We redesign how work flows.",
  line: "Small interventions. Disproportionate outcomes.",

  email: "eliya@levronpartners.com",

  /** Internal recipients for lead/assessment notifications — everyone who should see a new lead land. */
  notifyEmails: ["aristotle@levronlabs.com", "eliya@levronpartners.com"],

  // Unused for now — every CTA routes to the /contact form instead. Kept
  // around in case a real booking link comes back into the funnel later.
  bookingUrl: "https://cal.com/levron/intro",
} as const;
