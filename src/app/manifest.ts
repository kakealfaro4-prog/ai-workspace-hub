import type { MetadataRoute } from "next";

/**
 * Web App Manifest: convierte la web en una PWA instalable en el móvil.
 * Next lo sirve automáticamente en /manifest.webmanifest. Al instalarla, se
 * abre a pantalla completa (standalone) con su propio icono, como una app.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Tools Hub — Herramientas de IA",
    short_name: "AI Tools Hub",
    description:
      "Accede, organiza y abre más de 100 herramientas de IA desde un solo lugar.",
    start_url: "/app",
    display: "standalone",
    background_color: "#0A0E1A",
    theme_color: "#0A0E1A",
    lang: "es",
    categories: ["productivity", "utilities"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
