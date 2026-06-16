import { ImageResponse } from "next/og";

// Route segment config
export const alt = "Ta Duc Dung — Software Engineer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated social preview image (Open Graph). Code-generated so there's no
// binary asset to maintain; rendered at build time and cached.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 25% 20%, rgba(6,182,212,0.18), transparent 55%), radial-gradient(circle at 80% 90%, rgba(139,92,246,0.18), transparent 55%), #05070d",
          color: "#f8fafc",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#06b6d4",
          }}
        >
          [ SYS_STATUS: ACTIVE ]
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1.05,
            letterSpacing: -1,
          }}
        >
          Ta Duc Dung
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            marginTop: 18,
            color: "#a5b4fc",
          }}
        >
          Software Engineer · Systems & UI
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 40,
            color: "#71717a",
          }}
        >
          Go · TypeScript · Next.js · Microservices · ICPC
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 70,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 24,
            color: "#06b6d4",
          }}
        >
          github.com/dungta1610
        </div>
      </div>
    ),
    { ...size }
  );
}
