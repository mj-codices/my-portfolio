import { ImageResponse } from "next/og";

// ---------------------------
// Link-preview image (Open Graph / Twitter)
// ---------------------------
// The card shown when the site URL is pasted into iMessage, email, LinkedIn,
// Slack, etc. Mirrors the BrandIntro title card: name, coral rule, role.
// Generated once at build time; twitter-image.tsx re-exports it.
// ---------------------------

export const alt = "Michael J. White — Front-End Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAME = "MICHAEL J. WHITE";
const ROLE = "FRONT-END DEVELOPER";

// Inter Bold, subset to just the characters on the card. Falls back to the
// built-in font if Google Fonts can't be reached during the build.
async function loadInter(text: string) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Inter:wght@700&text=${encodeURIComponent(text)}`
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return undefined;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return undefined;
  }
}

export default async function Image() {
  const inter = await loadInter(NAME + ROLE);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          fontFamily: inter ? "Inter" : undefined,
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 92, letterSpacing: "0.08em", color: "#f2f2f2" }}>
          {NAME}
        </div>
        <div
          style={{
            width: 220,
            height: 4,
            marginTop: 36,
            marginBottom: 36,
            background: "#ff5757",
          }}
        />
        <div style={{ fontSize: 30, letterSpacing: "0.35em", color: "#8f8f8f" }}>
          {ROLE}
        </div>
        {/* Favicon dot, bottom center */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            width: 22,
            height: 22,
            borderRadius: 11,
            background: "linear-gradient(135deg, #ff6f61, #ff5757 50%, #9e005d)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: inter ? [{ name: "Inter", data: inter, weight: 700, style: "normal" }] : [],
    }
  );
}
