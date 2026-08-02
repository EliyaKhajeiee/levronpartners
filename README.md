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

## The product panels

`src/components/Panels.tsx` draws six panels in pure markup: a takeoff drawing,
an estimate sheet, a dispatch board, a cost variance chart, a document
extraction and a follow-up thread.

They exist because **ode's richness comes from photography and client work, and
this site has neither.** The panels illustrate the kind of thing we build. They
are not screenshots of any client's system and must not be captioned as if they
were. The numbers and names in them are invented.

**Replacing them with real imagery is the single biggest upgrade available to
this page.** Worth shooting: crews and job sites, an estimator at two monitors,
a truck bay at 6am. Real photography in these slots would close most of the
remaining distance to the reference.

Note that panels are nested inside display headings, so `.card` resets the
inherited tracking, leading, weight and `text-transform` — without that reset
their small text gets crushed.

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
