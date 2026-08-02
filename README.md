# Levron Partners

Marketing site for Levron Partners — AI systems for construction and HVAC contractors.

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

Page content lives in plain arrays at the top of **`src/app/page.tsx`** —
`capabilities`, `steps`, `outcomes`, `faqs`, `fit`, `marquee`. Edit the copy
there; the layout follows.

### About the numbers in the "What we aim at" section

`outcomes` in `src/app/page.tsx` is written as **targets you commit to**, not as
results you've already delivered ("Same day bid turnaround", "< 60 sec lead
response"). That framing is deliberate and honest while you have no case studies
published. Once you have real client results, swap that section for named
outcomes with the client's permission — it will convert harder than targets do.

## Design system

Palette A, "Blueprint Teal", from the brand deck. Tokens are defined once in
`src/app/globals.css` under `@theme inline` and used as Tailwind utilities
(`bg-teal`, `text-ink`, `bg-cream`, `text-brass`, …).

| Token       | Hex       | Use                                       |
| ----------- | --------- | ----------------------------------------- |
| `teal`      | `#0E6E6E` | Primary accent, hovers, eyebrows          |
| `teal-lit`  | `#17908D` | Accent on dark sections                   |
| `cream`     | `#F4EEE2` | Alternating section bands                 |
| `cream-lit` | `#FBF8F2` | Page background                           |
| `ink`       | `#1E2428` | Body text, dark sections                  |
| `brass`     | `#C0703B` | Reserved — currently unused, keep it rare |

Type: Instrument Serif (display) · Inter (body) · JetBrains Mono (eyebrows/labels).

### Scroll animation

`src/components/Reveal.tsx` drives every `data-reveal` element. The hidden state
is gated behind a `.reveal-ready` class that only JavaScript adds, so if JS is
off or hydration fails **the page still renders fully visible** rather than
blank. Stagger a group by setting `--reveal-delay` inline.

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
