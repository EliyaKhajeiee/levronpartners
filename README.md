# Levron Partners

One-page site for Levron Partners — custom software for construction and HVAC operators.

Next.js 16 (App Router) · Tailwind CSS v4 · statically prerendered · deploys to Vercel.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Things to change before launch

Everything you'll want to touch first lives in **`src/lib/site.ts`**:

| Field        | Currently                      | Do this                                                                                        |
| ------------ | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| `bookingUrl` | `https://cal.com/levron/intro` | **Placeholder — swap in your real Cal.com / Calendly link.** Every CTA on the page points here. |
| `email`      | `eliya@levronpartners.com`     | Confirm this inbox exists                                                                       |
| `url`        | `https://levronpartners.com`   | Used for OG tags / `metadataBase`                                                               |

Page content lives in two plain arrays at the top of **`src/app/page.tsx`** —
`work` and `beats` — plus the headings written inline. Edit the copy there; the
layout follows.

### Copy that isn't yet true

Nothing on the page claims a result you haven't delivered — there are no
metrics, logos or case studies, deliberately. When you have a client win worth
naming, that's the thing to add.

## Design system

Light and typographic, in the register of ode.partners. Tokens live in
`src/app/globals.css` under `@theme inline`.

| Token   | Hex       | Use                                       |
| ------- | --------- | ----------------------------------------- |
| `paper` | `#F4F2EF` | Page background                           |
| `ink`   | `#171614` | Type, dark panels, the contact block      |
| `muted` | `#6F6A64` | Secondary copy, labels                    |
| `line`  | `#DEDAD3` | Hairlines, card borders, tag outlines     |
| `teal` / `amber` / `clay` | — | **Inside the product panels only.** Never page chrome. |

Type is Figtree — a stand-in for ode's Raptor Text, which is licensed. The
display style is 800 weight, `-0.042em` tracking, `0.86` leading, lowercase.

## Photography

**The page has no imagery yet, and that is the main thing holding it back.**

An earlier pass filled the image slots with product panels drawn in markup —
fake estimate sheets and dispatch boards. They read as obviously fake and were
removed. There are no placeholder graphics now: `src/lib/media.ts` defines the
slots, and any slot with an empty `src` simply does not render, so the layout
closes up and the page stays clean until real photographs exist.

To turn the slots on, drop files into `/public/photos` and fill in `src` and
`alt` in `src/lib/media.ts`. Shoot list, in order of impact:

| Slot      | What to shoot                                              |
| --------- | ---------------------------------------------------------- |
| `hero`    | A crew on a roof or in a mechanical room — wide, room to crop |
| `intro`   | An estimator at two monitors, over the shoulder             |
| `work[0]` | Drawings, a plan table, takeoff in progress                 |
| `work[1]` | Truck bay or shop floor at the start of a shift             |
| `work[2]` | Paperwork, submittals, a jobsite trailer desk               |
| `work[3]` | Someone on the phone in the office                          |

Shoot wide with headroom — every slot crops with `object-cover`. Real,
slightly-imperfect documentary photography will look far better here than
anything staged or stock.

## Deploy

```bash
git remote add origin https://github.com/EliyaKhajeiee/levronpartners.git
git branch -M main
git push -u origin main
```

Then on [vercel.com/new](https://vercel.com/new), import the repo. Vercel detects
Next.js automatically — no build settings, no environment variables needed. Add
`levronpartners.com` under Project → Settings → Domains and point your registrar
at the records Vercel gives you.
