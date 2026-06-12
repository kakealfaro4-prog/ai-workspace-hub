import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta tipo Linear/Vercel: superficies oscuras con un acento sobrio.
        bg: {
          base: "#0a0a0b",
          subtle: "#0f0f11",
          muted: "#16161a",
        },
        border: {
          DEFAULT: "#26262b",
          strong: "#34343b",
        },
        fg: {
          DEFAULT: "#ededef",
          muted: "#a1a1aa",
          subtle: "#71717a",
        },
        accent: {
          DEFAULT: "#6366f1",
          hover: "#7c7ff5",
          soft: "rgba(99,102,241,0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
      },
    },
  },
  plugins: [],
};

export default config;
