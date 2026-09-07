import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Market Pulse — Digital Marketing & Brand Building Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #04070F 0%, #0D1730 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          MARKET <span style={{ color: "#3E7BFF", marginLeft: 12 }}>PULSE</span>
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 800, marginTop: 24, maxWidth: 900 }}>
          Turn Your Brand Into A Market Force.
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 28, color: "#98A5BD" }}>
          Digital Growth &amp; Brand Building
        </div>
      </div>
    ),
    { ...size }
  );
}
