import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta navy + cian: azul marino profundo con acento cian eléctrico
        // (usado con moderación). El cian se reserva para lo importante.
        bg: {
          base: "#0A0E1A",
          subtle: "#121829",
          muted: "#1A2236",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          strong: "rgba(255,255,255,0.12)",
        },
        fg: {
          DEFAULT: "#F1F5F9",
          muted: "#94A3B8",
          subtle: "#64748B",
        },
        accent: {
          DEFAULT: "#22D3EE",
          hover: "#67E8F9",
          soft: "rgba(34,211,238,0.12)",
          glow: "rgba(34,211,238,0.15)",
        },
        // Colores semánticos del badge de precio.
        price: {
          free: "#34D399",
          freemium: "#22D3EE",
          paid: "#FBBF24",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
