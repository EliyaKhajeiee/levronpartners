/**
 * The two proof rows.
 *
 * `partners` mirrors the "Proudly Partnered With" row on levronlabs.com — a
 * slow marquee of partner-programme badges, each already rendered in a single
 * ink colour by the brand itself. Buildxact isn't part of that programme list
 * but stays in because it's real; its mark is flattened to ink at render
 * (`brightness-0`) so it sits at the same visual weight as the rest instead of
 * standing out as the one colour logo in the row.
 *
 * `clients` are real engagements, carried over from the Levron Labs site.
 * Nothing here is aspirational — if a name comes off the list, take it out of
 * this file rather than hiding it in the markup.
 */

export type Partner = {
  name: string;
  /** Mark in /public/partners. */
  src: string;
  width: number;
  height: number;
  /** Rendered height per breakpoint — these marks don't share a cap height. */
  className: string;
  /** Set when the mark is an icon alone and needs its name set beside it. */
  label?: string;
  /** Forces a colour mark to the page's ink, for the one brand without a flat mark. */
  flatten?: boolean;
};

export const partners: Partner[] = [
  {
    name: "Google Cloud Partner",
    src: "/partners/google-cloud.png",
    width: 757,
    height: 184,
    className: "h-8 sm:h-10",
  },
  {
    name: "OpenAI Select Partner",
    src: "/partners/openai.png",
    width: 395,
    height: 154,
    className: "h-10 sm:h-14",
  },
  {
    name: "Microsoft AI Cloud Partner",
    src: "/partners/microsoft.png",
    width: 590,
    height: 120,
    className: "h-8 sm:h-10",
  },
  {
    name: "Zapier Solution Partner",
    src: "/partners/zapier.png",
    width: 993,
    height: 126,
    className: "h-5 sm:h-6",
  },
  {
    name: "Buildxact",
    src: "/partners/buildxact.png",
    width: 32,
    height: 51,
    className: "h-8 sm:h-10",
    label: "Buildxact",
    flatten: true,
  },
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
