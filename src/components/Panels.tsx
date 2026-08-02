/**
 * Stylised product panels, drawn in markup rather than shot with a camera.
 *
 * These stand in for the photography and product imagery a studio site would
 * normally carry. They illustrate the kind of thing we build — they are not
 * screenshots of a client's system, and shouldn't be captioned as if they are.
 */

const rows = [
  { d: "Ductwork — rectangular, galv", q: "1,840 lb", c: "$14,720" },
  { d: "VAV terminals w/ reheat", q: "34 ea", c: "$41,140" },
  { d: "Rooftop unit — 25 ton", q: "2 ea", c: "$78,400" },
  { d: "Hydronic piping — 2\" CU", q: "610 lf", c: "$22,570" },
  { d: "Controls + commissioning", q: "1 ls", c: "$18,900" },
];

export function EstimatePanel() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-line flex items-center justify-between border-b px-5 py-4">
        <div>
          <div className="text-ink text-[0.8125rem] font-semibold">
            Building C — Mechanical
          </div>
          <div className="text-muted mt-0.5 text-[0.6875rem]">
            Invitation received 8:04 AM
          </div>
        </div>
        <div className="bg-teal/10 text-teal rounded-full px-2.5 py-1 text-[0.6875rem] font-medium">
          Priced 2h 14m
        </div>
      </div>

      <div className="flex-1 px-5 py-2">
        {rows.map((r) => (
          <div
            key={r.d}
            className="border-line/70 flex items-center justify-between border-b py-[0.6rem] last:border-0"
          >
            <div className="text-ink/85 min-w-0 flex-1 truncate pr-3 text-[0.75rem]">
              {r.d}
            </div>
            <div className="text-muted w-20 shrink-0 text-right text-[0.6875rem] tabular-nums">
              {r.q}
            </div>
            <div className="text-ink w-20 shrink-0 text-right text-[0.75rem] font-medium tabular-nums">
              {r.c}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-ink flex items-center justify-between px-5 py-3.5">
        <span className="text-[0.6875rem] tracking-[0.08em] text-white/55 uppercase">
          Bid total
        </span>
        <span className="text-[1.0625rem] font-semibold text-white tabular-nums">
          $175,730
        </span>
      </div>
    </div>
  );
}

const techs = [
  { n: "Reyes, M.", blocks: [[0, 3, "teal"], [4, 3, "amber"]] },
  { n: "Okafor, D.", blocks: [[1, 4, "clay"], [6, 2, "teal"]] },
  { n: "Bianchi, L.", blocks: [[0, 2, "amber"], [3, 4, "teal"]] },
  { n: "Novak, P.", blocks: [[2, 5, "teal"]] },
] as const;

const shade: Record<string, string> = {
  teal: "bg-teal",
  amber: "bg-amber",
  clay: "bg-clay",
};

export function DispatchPanel() {
  return (
    <div className="bg-ink flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <div className="text-[0.8125rem] font-semibold text-white">
          Dispatch — Thursday
        </div>
        <div className="text-[0.6875rem] text-white/45">14 calls · 4 techs</div>
      </div>

      <div className="mt-5 flex-1 space-y-2.5">
        {techs.map((t) => (
          <div key={t.n} className="flex items-center gap-3">
            <div className="w-16 shrink-0 truncate text-[0.6875rem] text-white/55">
              {t.n}
            </div>
            <div className="relative h-6 flex-1 overflow-hidden rounded-[0.3rem] bg-white/[0.06]">
              {t.blocks.map(([start, span, tone], i) => (
                <div
                  key={i}
                  className={`absolute top-0 bottom-0 rounded-[0.3rem] ${shade[tone]}`}
                  style={{
                    left: `${(start / 9) * 100}%`,
                    width: `${(span / 9) * 100}%`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[0.6875rem] text-white/45">Unassigned</span>
        <span className="text-[0.6875rem] font-medium text-white">0</span>
      </div>
    </div>
  );
}

export function ThreadPanel() {
  return (
    <div className="flex h-full flex-col bg-white p-5">
      <div className="text-muted text-[0.6875rem] tracking-[0.08em] uppercase">
        Inbound — 6:42 PM
      </div>

      <div className="mt-4 flex-1 space-y-3">
        <div className="bg-paper text-ink/80 max-w-[85%] rounded-[0.9rem] rounded-tl-sm px-3.5 py-2.5 text-[0.75rem]">
          Missed call — (415) 555‑0142. No voicemail.
        </div>

        <div className="bg-teal ml-auto max-w-[88%] rounded-[0.9rem] rounded-tr-sm px-3.5 py-2.5 text-[0.75rem] text-white">
          Hi — sorry we missed you. This is Levron HVAC. Is this about a service
          call or a quote? We can get someone out tomorrow.
        </div>

        <div className="bg-paper text-ink/80 max-w-[85%] rounded-[0.9rem] rounded-tl-sm px-3.5 py-2.5 text-[0.75rem]">
          Service — no cooling upstairs, 2 story
        </div>

        <div className="bg-teal ml-auto max-w-[70%] rounded-[0.9rem] rounded-tr-sm px-3.5 py-2.5 text-[0.75rem] text-white">
          Booked you 8–10 AM. Confirmation sent.
        </div>
      </div>

      <div className="border-line mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-muted text-[0.6875rem]">Response time</span>
        <span className="text-teal text-[0.6875rem] font-semibold">41 sec</span>
      </div>
    </div>
  );
}

const bars = [
  { l: "Sheet metal", e: 72, a: 68 },
  { l: "Equipment", e: 88, a: 91 },
  { l: "Labor", e: 54, a: 79 },
  { l: "Controls", e: 40, a: 38 },
];

export function CostPanel() {
  return (
    <div className="flex h-full flex-col bg-white p-5">
      <div className="flex items-baseline justify-between">
        <div className="text-ink text-[0.8125rem] font-semibold">
          Estimated vs actual
        </div>
        <div className="text-muted text-[0.6875rem]">Job 2417</div>
      </div>

      <div className="mt-5 flex-1 space-y-4">
        {bars.map((b) => (
          <div key={b.l}>
            <div className="text-muted mb-1.5 flex items-center justify-between text-[0.6875rem]">
              <span>{b.l}</span>
              <span
                className={
                  b.a > b.e + 8 ? "text-clay font-medium" : "text-muted"
                }
              >
                {b.a > b.e ? "+" : ""}
                {b.a - b.e}%
              </span>
            </div>
            <div className="relative h-1.5 rounded-full bg-[#ECE8E2]">
              <div
                className="bg-ink/25 absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${b.e}%` }}
              />
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${
                  b.a > b.e + 8 ? "bg-clay" : "bg-teal"
                }`}
                style={{ width: `${b.a}%`, opacity: 0.9 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-line mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-muted text-[0.6875rem]">Labor overrun caught</span>
        <span className="text-ink text-[0.6875rem] font-semibold">Day 3</span>
      </div>
    </div>
  );
}

export function TakeoffPanel() {
  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="border-line flex items-center justify-between border-b px-5 py-3.5">
        <div className="text-ink text-[0.8125rem] font-semibold">
          M‑201 — Level 2 supply
        </div>
        <div className="text-muted text-[0.6875rem]">Auto‑measured</div>
      </div>

      <div className="relative flex-1">
        <svg
          viewBox="0 0 400 260"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* grid */}
          <defs>
            <pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="#EFEBE5" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="260" fill="url(#g)" />

          {/* rooms */}
          <g stroke="#CFC9C1" strokeWidth="1.5" fill="none">
            <rect x="28" y="28" width="150" height="96" rx="2" />
            <rect x="28" y="140" width="150" height="92" rx="2" />
            <rect x="196" y="28" width="176" height="204" rx="2" />
          </g>

          {/* duct trunk + branches */}
          <g fill="none" strokeLinecap="round">
            <path
              d="M60 190 L60 76 L150 76 L150 52"
              stroke="#0E6E6E"
              strokeWidth="7"
              opacity="0.9"
            />
            <path
              d="M60 130 L300 130 L300 70"
              stroke="#0E6E6E"
              strokeWidth="7"
              opacity="0.9"
            />
            <path d="M240 130 L240 196" stroke="#0E6E6E" strokeWidth="5" opacity="0.55" />
            <path d="M330 130 L330 196" stroke="#0E6E6E" strokeWidth="5" opacity="0.55" />
          </g>

          {/* diffusers */}
          <g fill="#C98A2E">
            {[
              [150, 46],
              [300, 64],
              [240, 202],
              [330, 202],
            ].map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x - 7} y={y - 7} width="14" height="14" rx="2" />
            ))}
          </g>

          {/* dimension line */}
          <g stroke="#171614" strokeWidth="1">
            <path d="M60 246 L300 246" />
            <path d="M60 241 L60 251 M300 241 L300 251" />
          </g>
        </svg>

        <div className="border-line absolute right-4 bottom-3 rounded-full border bg-white/90 px-2.5 py-1 text-[0.6875rem] font-medium backdrop-blur">
          <span className="text-ink tabular-nums">248 lf</span>
          <span className="text-muted"> trunk</span>
        </div>
      </div>
    </div>
  );
}

const fields = [
  { k: "Model", v: "RTU‑25‑HE", hit: true },
  { k: "Tonnage", v: "25 ton", hit: true },
  { k: "Lead time", v: "14 weeks", hit: true },
  { k: "Voltage", v: "460/3/60", hit: false },
];

export function DocPanel() {
  return (
    <div className="flex h-full flex-col bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="text-ink text-[0.8125rem] font-semibold">
          Submittal — 23 74 13
        </div>
        <div className="bg-teal/10 text-teal rounded-full px-2 py-0.5 text-[0.6875rem] font-medium">
          Read
        </div>
      </div>

      {/* redacted document body */}
      <div className="mt-4 space-y-1.5">
        {[100, 92, 74, 96, 60].map((w, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full bg-[#EFEBE5]"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>

      <div className="mt-5 flex-1 space-y-2">
        {fields.map((f) => (
          <div
            key={f.k}
            className={`flex items-center justify-between rounded-[0.55rem] px-2.5 py-2 text-[0.75rem] ${
              f.hit ? "bg-teal/[0.07]" : "bg-paper"
            }`}
          >
            <span className="text-muted">{f.k}</span>
            <span
              className={`font-medium tabular-nums ${
                f.hit ? "text-teal" : "text-ink/70"
              }`}
            >
              {f.v}
            </span>
          </div>
        ))}
      </div>

      <div className="border-line mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-muted text-[0.6875rem]">Flagged to PM</span>
        <span className="text-clay text-[0.6875rem] font-semibold">
          Lead time slip
        </span>
      </div>
    </div>
  );
}
