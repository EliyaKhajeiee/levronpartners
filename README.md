# Levron Labs

Site for Levron Labs — custom software for construction and HVAC operators.

> **The repo and domain still say "levronpartners".** The brand is Levron Labs;
> the wordmark, metadata and copy have all been moved over. What has *not* moved
> is `site.url` (`levronpartners.com`), `site.email` (`eliya@levronpartners.com`)
> and the GitHub remote — those are live and pointed at real records, so they're
> a deliberate decision rather than a rename. Note that `levronlabs.com` already
> serves the other Levron Labs site (`stotlefitness/Levron-Labs`), so the two
> need untangling before this one can take that domain.

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
layout follows. The two logo rows are data in **`src/lib/proof.ts`**.

### What the page claims

Still no invented metrics and no case studies. What it does now carry is the
proof block on the homepage — two rows, both edited in **`src/lib/proof.ts`**:

- **Partners & platforms.** Google, OpenAI, Anthropic, ServiceTitan, Jobber,
  Buildxact, Make. Labelled "Partners & platforms" and *not* "Trusted by" on
  purpose: none of them are clients, several are programmes still being applied
  to, and "trusted by" would read as a customer claim. The caption underneath
  says exactly what the row is. If a programme comes through, the row gets
  stronger without a word of it needing to change.
- **Companies we've worked with.** The seven real engagements, carried over
  from the Levron Labs site with their sectors. Only two are construction — the
  range is the point while the site stays horizontal. If a name comes off the
  list, delete it from `proof.ts` rather than hiding it in the markup.

  This row is a marquee. It drifts at about 23px/s, pauses on hover, and drops
  to a hand-scrollable row under `prefers-reduced-motion`.

  **It is shown through a 64rem window, not full-bleed, and that is load-bearing.**
  Seven tiles is only ~810px of unique content. Given the whole viewport, the
  same logos end up on screen two and three times over, which is the first
  thing anyone notices and the thing that makes seven clients look like three.
  At 64rem one pass roughly fills the clear area and the repeat stays inside
  the feathered edges.

  The track holds the list `SETS_PER_HALF × 2` times and animates to exactly
  `-50%`, so each half has to be at least as wide as that window or a gap walks
  across it at the wrap. Keep `SETS_PER_HALF` as low as the window allows —
  every extra set is another visible copy. Widen the window or shrink the tiles
  and both numbers need rechecking together.

### Positioning

The GTM is construction and home services. **The site is deliberately one step
broader than that.** Copy says "your operation", not "your construction
operation"; the trades lead the list on `/contact` but don't end it; the client
row shows dentistry and jewellery next to the GC and the HVAC shop. That's a
decision with a shelf life — when the vertical is worth committing to
exclusively, `src/lib/site.ts` and the `fit` list on `/contact` are where it
starts.

## Pages

Four static routes, not one long scroll.

| Route       | File                      | Carries                                   |
| ----------- | ------------------------- | ----------------------------------------- |
| `/`         | `src/app/page.tsx`        | Hero, the proof block, positioning, the brief artifact, the statement, two onward cards |
| `/work`     | `src/app/work/page.tsx`   | The four systems as scenes, split by a brand band |
| `/process`  | `src/app/process/page.tsx`| Map / Build / Compound, plus how we work   |
| `/contact`  | `src/app/contact/page.tsx`| Booking, what to expect, who it's for      |

### How `/work` is written

Each system leads with **`scene`** — the moment it exists to change, present
tense, specific enough that the reader recognises their own week — set at
display weight because it *is* the argument. **`mechanism`** sits underneath in
quiet type: what we actually build.

That order is the whole page. A list of features reads as four things we sell;
a list of moments reads as four days the reader has already had. If you add a
fifth, write the scene first and the capability second.

Two failure modes this page keeps drifting into. Both were live at one point,
and both read as a SaaS product page rather than a custom software firm:

1. **It starts to look like a menu.** Four titled blocks with tags is a pricing
   table if you squint. The intro opens with "there is nothing here to pick
   from" and the page closes on **"And whatever isn't on this page"** for
   exactly this reason — keep both. The old CTA read "Which one is costing you
   most?", which literally asks the reader to choose a module; it's now
   "Let's look at your week."
2. **It narrows to one industry.** Construction and home services is the GTM,
   but an operator in another trade has to see their own week here. Words like
   *drawings*, *crews*, *takeoff*, *the roof* quietly close it down — prefer
   *the scope*, *the time*, *everyone*. See the note on positioning above.

`Nav` and `Footer` live in `src/app/layout.tsx`, so every page gets them.
`ContactCta` is the shared dark closing block — pass `heading` and `body` to
tune it per page. The nav marks the current route in teal with a standing rule.

## Design system

The brand deck's palette, on a light cream ground. Tokens live in
`src/app/globals.css` under `@theme inline`. Token names are the short ones the
components already used; the deck's names are in the last column.

| Token   | Hex       | Use                                                | Deck name |
| ------- | --------- | -------------------------------------------------- | --------- |
| `paper` | `#F4EEE2` | Cream page background                              | Paper     |
| `ink`   | `#1F2428` | Charcoal type, the contact block                   | Carbon    |
| `teal`  | `#0E6E6E` | Accent — button hovers, tag hovers, section counts | Blueprint |
| `brass` | `#C0703B` | Reserved, currently unused                         | Foundry   |
| `muted` | `#6B7176` | Secondary copy                                     | —         |
| `line`  | `#D8D1C3` | Hairlines and tag outlines                         | —         |

### The mark and the lockup

`src/components/Mark.tsx` is the logo, traced off the deck onto a 292 × 100
grid: two bars with an 18-unit channel between them that steps down exactly one
channel-width on a 45° diagonal, about two-thirds across. Keep those numbers if
you redraw it — the diagonal, the channel and the step are all the same
measurement, which is why it looks resolved.

`src/components/Wordmark.tsx` builds the deck's two lockups from it —
`horizontal` (mark · hairline · LEVRON over ruled LABS) in the nav and footer,
and `stacked`. Everything sizes off the element's own `font-size`, so
`text-[0.875rem]` on the parent scales the whole lockup. The negative right
margins in `.wordmark` / `.wordmark-sub` claw back the trailing space that
letter-spacing adds after the last glyph; without them the words sit visibly
off-centre under the mark.

`src/app/icon.svg` is the same two paths on a Carbon rounded square.

### The flow rule

`src/components/FlowRule.tsx` is the deck's "expanded visual language" — a
stack of hairlines where some lines jog a lane on the mark's 45° diagonal, and
the ones that move are drawn in Blueprint. Three variants: `intervention`,
`flow`, `momentum`.

It keeps its aspect rather than stretching, so the diagonals stay at 45° at
every width — which means **height follows width at 7%**. Give it a bounded
column (the homepage uses `max-w-[34rem]`); run full-bleed it flattens into a
hairline smear and the lane change stops reading.

### Partner marks

`/public/partners` holds seven single-colour glyphs, flattened to ink at render
by `.logo-ink` so the row reads as one material rather than seven brands
competing. Two notes for whoever swaps one:

- They render with `unoptimized`. They're already trimmed to size and
  single-colour, so the optimizer has nothing to win and re-encoding hairline
  logo art at 24px only costs fidelity. It also means a replaced file shows up
  immediately instead of behind a cached variant.
- **ServiceTitan is the wordmark, not the mascot**, and carries `wordmark: true`
  so no name is set beside it. The mascot is far too detailed to survive at
  24px — it turns to mud. Jobber's glyph needed its white counters knocked out
  to transparent first, or flattening fills them in and it becomes a blob.
  Any replacement mark wants the same treatment: transparent counters, trimmed
  to the ink.

Type is Figtree, sentence case. `.display` is 800 weight at `-0.035em`
tracking and `0.86` leading. Headings were briefly set lowercase to echo the
reference site — that's been undone; the brand is "Levron Labs", set
normally.

### The artifact panel

`src/components/Artifact.tsx` is a framed surface that holds a document: a
chrome bar with a mono label and filename, a ruled `.blueprint-grid` ground,
the contents, and an optional footnote rule. It takes `label`, `title`,
`footnote` and `className`, and carries `data-rise` so it settles in with the
other media panels.

It is **not** an app window — no traffic lights, no toolbar — because anything
that mimics shipped software runs straight back into the fake-product-panel
problem below. The frame says "this is a thing we hand you"; keep what goes
inside true. The homepage instance (`engagement-brief.md`) holds the Map /
Build / Compound outline, which is real and also stated on `/process` — keep
the two in step.

The hero composition is deliberately the one from the original mockup:
headline, right-aligned qualifier beneath it, then the paragraph bottom-left
and the CTA bottom-right.

## Brand photography

`src/lib/brand-photos.ts` holds the five brand-application shots lifted out of
the deck — business card, embossed stationery, building signage, vehicle,
brass plaque. Two components use them:

- **`BrandStrip`** — four captioned panels staggered across a **Carbon** band.
  On the homepage as "Levron in the world". Equal rectangles in a row read as a
  contact sheet and give every image the same weight, so the sizes and vertical
  offsets vary; the offsets alternate rather than descend, or the row reads as
  a mistake and leaves dead corners.
- **`BrandBand`** — a dark full-width band with the photo dimmed to 22% behind
  a statement. On `/work`, carrying the brand line.

**They are ~250px wide in the deck**, so the upscale is the whole ballgame.
`scripts/brand-photos.py` runs **EDSR ×4 super-resolution**, downsamples the
result to 700px, then applies a light unsharp. Each step matters, and the
script's docstring explains why — the short version is that EDSR reconstructs
edges instead of interpolating them, and the plain LANCZOS-plus-heavy-unsharp
approach this used to take left visible ringing around the wordmarks that read
as grit. To rebuild:

```bash
python3 -m venv .venv && .venv/bin/pip install opencv-contrib-python pillow
curl -L -o EDSR_x4.pb \
  https://github.com/Saafke/EDSR_Tensorflow/raw/master/models/EDSR_x4.pb
EDSR_MODEL=EDSR_x4.pb .venv/bin/python scripts/brand-photos.py path/to/deck.png
```

Without OpenCV or the model it still runs, falling back to LANCZOS — worse, but
not broken.

**There is no higher-resolution original.** Both pitch-deck PDFs were checked —
they contain gradients, headshots, UI cards and the old italic LE logo, and
none of these mockups. The deck export is it.

So everything downstream is sized around ~250px of real detail, and the two
components each handle that a different way:

- `BrandStrip` shows the panels at **95–252px** on a **dark ground**. The SR
  pass buys real headroom, but it's reconstruction rather than detail anyone
  photographed, so ~260px is the ceiling. Residual softness is also far less
  legible against Carbon than against Paper.

  **That ceiling has to hold at every viewport width, not just desktop.** The
  worst blur in this component was never on desktop — it was a two-column grid
  stretching tablet panels to ~350px, wider than anything desktop rendered. The
  grid goes to four columns from `sm` and caps its own width below that for
  exactly this reason. If you touch the layout, measure the rendered panel
  width across breakpoints rather than eyeballing a desktop screenshot.
- `BrandBand` hides the softness under the overlay instead, which is why it
  sits at 22% and shouldn't be lifted much past that.

If these ever get re-rendered at print resolution, both constraints lift and
the panels can grow.

These are deliberately separate from `media.ts` below. Brand objects say "the
brand exists"; documentary photography of operators would say "this is who we
build for". Different jobs — keep the two files apart.

## Photography

**The page still has no photography of operators, and that is the main thing
holding it back.**

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
