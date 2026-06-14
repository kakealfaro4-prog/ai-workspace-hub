import { ImageResponse } from "next/og";

import { approxToolCount } from "@/data/tools";
import { CATEGORIES } from "@/data/categories";

export const runtime = "edge";

export const alt =
  "AI Workspace Hub — Todas tus herramientas de IA en un solo lugar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagen Open Graph generada dinámicamente (la que se ve al compartir el
 * enlace en redes/chats). Misma estética que la landing: oscuro + gradiente
 * azul/púrpura, con datos reales del catálogo.
 */
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
            "linear-gradient(135deg, #0A0E1A 0%, #0c1a2e 45%, #0e4a5e 100%)",
          color: "#ededef",
          fontFamily: "sans-serif",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 30,
            color: "#c7c7d1",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#22D3EE",
            }}
          />
          {approxToolCount()} herramientas de IA · {CATEGORIES.length} categorías
        </div>

        {/* Título */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 36,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <span>Todas tus herramientas de IA.</span>
          <span style={{ color: "#67E8F9" }}>En un único lugar.</span>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 32,
            color: "#a1a1aa",
            maxWidth: 900,
          }}
        >
          Accede, organiza y abre las mejores IA del mercado desde una sola web.
        </div>

        {/* Marca */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: 56,
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #06B6D4, #22D3EE)",
              fontSize: 22,
              fontWeight: 700,
              color: "#0A0E1A",
            }}
          >
            AI
          </div>
          AI Workspace Hub
        </div>
      </div>
    ),
    { ...size },
  );
}
