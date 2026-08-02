/**
 * Photography slots.
 *
 * Drop files into /public/photos and fill in the `src` below. Any slot with an
 * empty `src` simply doesn't render — the layout closes up around it — so the
 * page stays clean until real images exist. No placeholder graphics, no
 * invented product screenshots.
 *
 * Shoot list, roughly in order of impact:
 *   hero      — a crew on a roof or in a mechanical room, wide, room to crop
 *   intro     — an estimator at two monitors, over the shoulder
 *   work.*    — one per capability; job site, truck bay, shop floor, office
 */

export type Photo = { src: string; alt: string };

const none: Photo = { src: "", alt: "" };

export const photos: {
  hero: Photo;
  intro: Photo;
  work: Photo[];
} = {
  hero: none,
  intro: none,
  work: [none, none, none, none],
};

export const hasPhoto = (p: Photo) => p.src.length > 0;
