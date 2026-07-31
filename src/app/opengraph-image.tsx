import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Pragmatic Labs AI — Most of your problems don't need AI. Three of them probably do.";

// Hardcoded hex here (not CSS vars) is deliberate: this file renders outside
// the DOM via satori, which can't resolve custom properties. Values mirror
// src/styles/design-tokens.css.
const PAPER = "#F7F3EA";
const INK = "#221F19";
const INK_FAINT = "#948B76";
const RULE = "#DDD4BF";
const ACCENT = "#2C614C";

// Fonts are read from the same self-hosted TTFs the site uses (src/app/fonts)
// — no network fetch, so this route builds despite the Google Fonts TLS issue.
async function loadFonts() {
  const dir = path.join(process.cwd(), "src", "app", "fonts");
  const [besley, interBold] = await Promise.all([
    readFile(path.join(dir, "besley-500.ttf")),
    readFile(path.join(dir, "inter-700.ttf")),
  ]);
  return { besley, interBold };
}

export default async function OpengraphImage() {
  const { besley, interBold } = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          backgroundColor: PAPER,
        }}
      >
        {/* Name + working label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontFamily: "Inter", fontSize: 30, color: INK }}>
            Pragmatic Labs AI
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontSize: 21,
              color: ACCENT,
              border: `2px solid ${ACCENT}`,
              borderRadius: 8,
              padding: "8px 18px",
            }}
          >
            Working software in weeks
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            maxWidth: 1000,
            fontFamily: "Besley",
            fontWeight: 500,
            fontSize: 70,
            lineHeight: 1.1,
            color: INK,
          }}
        >
          Most of your problems don&apos;t need AI. Three of them probably do.
        </div>

        {/* Foot line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderTop: `1px solid ${RULE}`,
            paddingTop: 18,
          }}
        >
          <div style={{ display: "flex", fontFamily: "Inter", fontSize: 21, color: ACCENT }}>
            Built on the systems your team already runs
          </div>
          <div style={{ display: "flex", fontFamily: "Inter", fontSize: 21, color: INK_FAINT }}>
            pragmaticlabs.ai
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Besley", data: besley, weight: 500, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    }
  );
}
