import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F4ED",
        text: "#2C2C2A",
        sub: "#888780",
        accent: "#4A9EBF",
        border: "#D8D4C9",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mincho: ["var(--font-shippori)", "serif"],
        serif: ["var(--font-dm-serif)", "serif"],
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
