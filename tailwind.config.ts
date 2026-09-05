import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terracotta: { DEFAULT: "#C2603F", dark: "#A44E30", light: "#E08B6A" },
        ocre: { DEFAULT: "#D9A441", light: "#F0CB7E" },
        creme: { DEFAULT: "#FAF4EA", warm: "#F6EADB" },
        sable: "#F0E4D2",
        sauge: { DEFAULT: "#7E8F6E", light: "#A9B89A" },
        indigo: { DEFAULT: "#1F3A5F", light: "#2E5480" },
        encre: "#2B2320",
      },
      fontFamily: {
        serif: ["var(--font-title)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        blob: "38% 62% 55% 45% / 45% 40% 60% 55%",
      },
      boxShadow: {
        soft: "0 2px 4px rgba(43,35,32,.04), 0 12px 32px -12px rgba(43,35,32,.18)",
        lift: "0 6px 10px rgba(43,35,32,.06), 0 24px 48px -16px rgba(43,35,32,.28)",
      },
    },
  },
  plugins: [],
};
export default config;
