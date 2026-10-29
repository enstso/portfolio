import { ImageResponse } from "next/og";

export const alt = "Enstso J — Software Engineer, Agentic AI and Cloud Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ alignItems: "center", background: "linear-gradient(135deg, #0a0f1b 0%, #111827 58%, #172554 100%)", color: "#f8fafc", display: "flex", height: "100%", justifyContent: "center", padding: "80px", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "980px" }}>
        <div style={{ color: "#60a5fa", display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 5, marginBottom: 30 }}>ENSTSO.</div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 750, letterSpacing: -3, lineHeight: 1.03 }}>Building intelligent systems that solve real-world problems.</div>
        <div style={{ color: "#cbd5e1", display: "flex", fontSize: 28, lineHeight: 1.35, marginTop: 34 }}>Software Engineering · Agentic AI · Cloud</div>
      </div>
    </div>,
    size,
  );
}
