import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          gradient: "linear-gradient(90deg, #43B7FE 0%, #4F48E6 100%)",
          500: "#42BBFF",
          800: "#0C3247",
          900: "rgba(66, 187, 255, 0.9)",
        },
        dark: {
          600: "#2E3757",
          700: "#1D2032",
          800: "#131625",
          900: "#10121E",
        },
        light: {
          100: "#ffffff",
          300: "#ADB3CC",
          500: "#55597D",
        },
        purple: {
          500: "#9542FF",
          900: "rgba(149, 66, 255, 0.9)",
        },
        green: {
          400: "#68D1BF",
          500: "#42FF77",
          900: "rgba(66, 255, 119, 0.9)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
