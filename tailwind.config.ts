import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pink-soft": "#ffc9d9",
        "pink-medium": "#ffb3c6",
        "pink-warm": "#ff8fab",
        cream: "#fff5f7",
        "red-warm": "#ff6b9d",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
