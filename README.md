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

Dark, monochrome and warm. Tokens live once in `src/app/globals.css` under
`@theme inline` and are used as Tailwind utilities (`bg-bg`, `text-fg`,
`text-muted`, …).

| Token     | Hex       | Use                                            |
| --------- | --------- | ---------------------------------------------- |
| `bg`      | `#141111` | Page background, warm near-black               |
| `fg`      | `#F4F2F0` | Headlines, the pill button fill                |
| `muted`   | `#8B8683` | Body copy, secondary lines                     |
| `faint`   | `#4A4442` | Index numbers, labels, footer                  |
| `teal`    | `#17908D` | Held in reserve from the brand deck — unused   |

Type is Inter alone, at two tracking settings (`.display`, `.display-sm`). No
accent colour, no cards, no borders beyond hairline rules — the restraint is
the design, so be careful adding to it.

## Motion

Five pieces, all hand-rolled, no animation library:

| File                            | What it does                                                        |
| ------------------------------- | ------------------------------------------------------------------- |
| `components/Reveal.tsx`         | Observes every reveal target and drives the whole system            |
| `components/Split.tsx`          | Splits a heading into per-word masks that slide up in sequence      |
| `components/ScrollText.tsx`     | The statement that lights word by word as you scroll past it        |
| `components/Ambient.tsx`        | Warm light that eases toward the cursor, idling in a slow drift     |
| `components/Magnetic.tsx`       | Pill buttons that lean toward the pointer                           |

Mark up new elements with `data-split`, `data-fade` or `data-line`, and stagger
a group with an inline `--group-delay`.

Two rules the code already follows, worth keeping:

- **Hidden states are gated behind `.reveal-ready`**, a class only JS adds. With
  JS off or hydration broken, the page renders fully visible instead of blank.
- **Anything inside the first viewport reveals immediately** rather than waiting
  on the observer, whose negative bottom margin would otherwise strand a hero
  CTA on a short laptop screen.

Everything respects `prefers-reduced-motion`, and the pointer effects are
`(pointer: fine)` only — touch devices attach no listeners at all.

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
