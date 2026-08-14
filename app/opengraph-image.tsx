import { ImageResponse } from "next/og";

export const alt = "Enstso JANVIER — IT Engineer & Analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 52%, #dbeafe 100%)",
          color: "#0f172a",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "80px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "980px" }}>
          <div style={{ color: "#2563eb", display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 2, marginBottom: 28 }}>
            ENSTSO JANVIER
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>
            IT Engineer &amp; Analyst
          </div>
          <div style={{ color: "#475569", display: "flex", fontSize: 32, lineHeight: 1.35, marginTop: 32 }}>
            Software Engineering · AI &amp; Agentic Systems · Data · Cloud &amp; Platform
          </div>
        </div>
      </div>
    ),
    size,
  );
}
