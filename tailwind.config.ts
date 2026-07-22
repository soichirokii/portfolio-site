import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F4ED",
        text: "#2C2C2A",
        sub: "#888780",
        accent: "#6B97AC",
        accent2: "#DDBD4B",
        border: "#D8D4C9",
      },
      fontFamily: {
        // 英字 = Quicksand（暫定）、和文 = Zen Maru Gothic
        sans: ["var(--font-quicksand)", "var(--font-zen-maru)", "sans-serif"],
        jp: ["var(--font-zen-maru)", "sans-serif"],
      },
      maxWidth: {
        content: "1164px",
      },
      screens: {
        md: "768px",
      },
    },
  },
  plugins: [],
};
export default config;
