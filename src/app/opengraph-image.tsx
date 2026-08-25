import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `Portfolio ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "white",
          background:
            "linear-gradient(135deg, #020617 0%, #0f2f70 58%, #0284c7 100%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 520,
            right: -100,
            top: -180,
            background: "rgba(56, 189, 248, 0.2)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 86,
                height: 86,
                borderRadius: 24,
                background: "linear-gradient(145deg, #2563eb, #0284c7)",
                border: "3px solid rgba(255,255,255,0.3)",
                fontSize: 27,
                fontWeight: 800,
              }}
            >
              MGW
            </div>
            <div
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 999,
                background: "rgba(37,99,235,0.45)",
                border: "1px solid rgba(186,230,253,0.35)",
                textTransform: "uppercase",
                letterSpacing: 4,
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Professional Portfolio
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                maxWidth: 970,
                fontSize: 72,
                lineHeight: 1,
                letterSpacing: -3,
                fontWeight: 800,
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 32,
                color: "#bae6fd",
                fontWeight: 600,
              }}
            >
              {siteConfig.title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                gap: 14,
                fontSize: 20,
                color: "#cbd5e1",
              }}
            >
              <span>Web & Enterprise Systems</span>
              <span>|</span>
              <span>Flutter Mobile</span>
              <span>|</span>
              <span>Application Security</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
