import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The brand palette, straight from globals.css — Paper / Carbon / Blueprint.
// Paper background: both `mark.png` and `wordmark.png` are dark-ink marks
// meant to sit on Paper (that's how they render in the nav) — on Carbon
// they're invisible.
const CARBON = "#1F2428";
const PAPER = "#F4EEE2";
const TEAL = "#0E6E6E";
const LINE = "rgba(31,36,40,0.12)";

/**
 * The site-wide default OG image — every page inherits this unless it
 * defines its own. Composited at request time from the real brand mark
 * (no separate design asset to keep in sync), so if `/brand/mark.png` or
 * `/brand/wordmark.png` change, this updates with them.
 */
export default async function Image() {
  const [mark, wordmark] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/mark.png")),
    readFile(join(process.cwd(), "public/brand/wordmark.png")),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
  const wordmarkSrc = `data:image/png;base64,${wordmark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={markSrc} width={72} height={29} alt="" />
          <img src={wordmarkSrc} width={220} height={54} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 4,
              background: TEAL,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              color: CARBON,
              lineHeight: 1.15,
              maxWidth: 920,
              letterSpacing: "-0.02em",
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "rgba(31,36,40,0.65)",
              maxWidth: 780,
            }}
          >
            {site.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            borderTop: `1px solid ${LINE}`,
            fontSize: 20,
            color: "rgba(31,36,40,0.55)",
          }}
        >
          <div style={{ display: "flex" }}>{site.domain}</div>
          <div style={{ display: "flex" }}>
            Construction &amp; home service operations
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
