import { ImageResponse } from "next/og";

// SNS シェア用の OG 画像（開演OPと同じ雰囲気：ブルー地 + SOICHIRO KII）
export const alt = "SOICHIRO KII — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#6B97AC",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: 14,
            paddingLeft: 14,
          }}
        >
          SOICHIRO KII
        </div>
        <div style={{ width: 120, height: 3, background: "#ffffff", marginTop: 36 }} />
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            marginTop: 30,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          PORTFOLIO
        </div>
      </div>
    ),
    { ...size }
  );
}
