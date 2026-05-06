// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "4rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        // Volya palette
        cream: "#FAF8F4",
        ink: "#1A1A2E",
        navy: "#0F3460",
        gold: "#C9A96E",
        "gold-light": "#E8C98A",
        mute: "#9090AA",
        line: "#EFEAE0",
        // legacy compatibility (на випадок, якщо десь у твоєму коді є text-primary)
        primary: {
          DEFAULT: "#1A1A2E",
          foreground: "#FAF8F4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "'Cormorant Garamond'", "serif"],
      },
      maxWidth: {
        page: "1320px",
      },
      boxShadow: {
        card: "0 24px 60px -30px rgba(15,52,96,0.20)",
        elev: "0 30px 80px -20px rgba(0,0,0,0.6)",
        dropdown: "0 30px 70px -20px rgba(15,52,96,0.22)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [
    heroui(),
    // якщо у тебе підключений tailwindcss-animate — додай сюди:
    // require("tailwindcss-animate"),
  ],
};
