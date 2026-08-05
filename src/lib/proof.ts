/**
 * The two proof rows.
 *
 * `partners` are the platforms we build on and the partner programmes we're in
 * or applying to. Deliberately labelled "Partners & platforms" rather than
 * "Trusted by" — none of these are clients, and the page shouldn't imply they
 * are. Their marks live in /public/partners as single-colour glyphs and get
 * tinted to ink at render, so the row reads as one row instead of seven brands
 * shouting over each other.
 *
 * `clients` are real engagements, carried over from the Levron Labs site.
 * Nothing here is aspirational — if a name comes off the list, take it out of
 * this file rather than hiding it in the markup.
 */

export type Partner = {
  name: string;
  /** Mark in /public/partners. */
  src: string;
  /** Optical size trim — these marks don't share a common cap height. */
  scale?: number;
  /**
   * The asset is the brand's own wordmark, so it carries the name itself and
   * we don't set one beside it. Used where a company's glyph is too detailed
   * to survive at this size — ServiceTitan's mascot turns to mud at 24px.
   */
  wordmark?: boolean;
};

export const partners: Partner[] = [
  { name: "Google", src: "/partners/google.svg" },
  { name: "OpenAI", src: "/partners/openai.svg" },
  { name: "Anthropic", src: "/partners/anthropic.svg", scale: 0.92 },
  {
    name: "ServiceTitan",
    src: "/partners/servicetitan.png",
    wordmark: true,
  },
  { name: "Jobber", src: "/partners/jobber.png", scale: 1.02 },
  { name: "Buildxact", src: "/partners/buildxact.png", scale: 0.98 },
  { name: "Make", src: "/partners/make.svg" },
];

export type Client = {
  name: string;
  /** Sector, so the range reads at a glance. */
  sector: string;
  src: string;
  /**
   * Tile colour. These logos came from seven different places and several are
   * baked onto a background, so each one names the ground it needs rather than
   * fighting a single global choice.
   */
  bg: string;
};

export const clients: Client[] = [
  {
    name: "South Central Investment Group",
    sector: "General contractor",
    src: "/clients/south-central-investment-group.png",
    bg: "#ffffff",
  },
  {
    name: "Kung Fu Air Service",
    sector: "HVAC service",
    src: "/clients/kung-fu-air-service.png",
    bg: "#ffffff",
  },
  {
    name: "Bohanon Dentistry",
    sector: "Dental practice",
    src: "/clients/bohanon-dentistry.jpeg",
    bg: "#ffffff",
  },
  {
    name: "Auto Capital USA",
    sector: "Auto financing",
    src: "/clients/auto-capital-usa.jpeg",
    bg: "#0a0a0a",
  },
  {
    name: "Luxor Custom Jewelers",
    sector: "Luxury retail",
    src: "/clients/mansouri-custom-jewelers.jpg",
    bg: "#ffffff",
  },
  {
    // White monogram on a transparent ground — it needs a dark tile to exist.
    name: "LMS",
    sector: "Real estate",
    src: "/clients/logan-smith-properties.png",
    bg: "#1F2428",
  },
  {
    // A wide photographic banner rather than a logo — it letterboxes into the
    // tile like everything else rather than being cropped to fit.
    name: "Eagle Auto Body Parts",
    sector: "Parts wholesale",
    src: "/clients/eagle-auto-body-parts.png",
    bg: "#ffffff",
  },
];
