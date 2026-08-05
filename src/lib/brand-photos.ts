/**
 * Levron in the world — the brand-deck application shots.
 *
 * These are brand objects, not product screenshots, which is why they're here
 * and not in `media.ts`. That file's slots are still reserved for documentary
 * photography of operators at work, and still empty. Keep the two separate:
 * these say "the brand exists"; those would say "this is who we build for".
 *
 * Source resolution is modest — the deck renders them ~250px wide, and
 * `scripts/brand-photos.py` reconstructs them with EDSR ×4 rather than plain
 * interpolation. That buys headroom up to roughly 260px on screen, no more.
 * Use them at panel size or behind an overlay; **don't run one full-bleed
 * across a wide viewport** — there isn't the detail for it.
 */

export type BrandPhoto = {
  src: string;
  alt: string;
  caption: string;
  /**
   * Intrinsic width ÷ height. Panels size themselves from this so the
   * browser never crops the file a second time — these crops are already
   * composed, and a uniform box was cutting the wordmark off the van.
   * `scripts/brand-photos.py` prints the current values.
   */
  aspect: number;
};

export const brandPhotos = {
  businessCard: {
    src: "/brand/business-card.webp",
    alt: "Levron Labs business cards, blueprint edge painted",
    caption: "Business card",
    aspect: 1.48,
  },
  stationery: {
    src: "/brand/stationery.webp",
    alt: "The Levron Labs mark blind-embossed into paper stock",
    caption: "Embossed stationery",
    aspect: 1.493,
  },
  signage: {
    src: "/brand/signage.webp",
    alt: "The Levron Labs mark mounted on a concrete wall",
    caption: "Building signage",
    aspect: 1.842,
  },
  vehicle: {
    src: "/brand/vehicle.webp",
    alt: "A Levron Labs van, wordmark along the panel",
    caption: "Vehicle graphic",
    aspect: 1.795,
  },
  plaque: {
    src: "/brand/plaque.webp",
    alt: "The Levron Labs mark cast into a brass plaque",
    caption: "Metal plaque",
    aspect: 1.613,
  },
} satisfies Record<string, BrandPhoto>;
