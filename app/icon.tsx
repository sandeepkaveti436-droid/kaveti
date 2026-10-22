import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Generate the favicon
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 16,
        background: "#0c0d10",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontWeight: 800,
        borderRadius: 8,
        border: "1.5px solid rgba(255, 255, 255, 0.2)",
        fontFamily: "sans-serif",
        letterSpacing: "-0.5px",
      }}
    >
      SK
    </div>,
    {
      ...size,
    },
  );
}
