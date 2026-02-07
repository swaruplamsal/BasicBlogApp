/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-source-serif)", "Georgia", "Times New Roman", "serif"],
      },
      colors: {
        // Brand Colors - Emerald + Mint Theme
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5", 
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981", // Primary brand color
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        mint: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4", 
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6", // Secondary accent
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e56",
          900: "#134e4a",
        },
        // Modern Neutrals
        neutral: {
          0: "#ffffff",
          50: "#fafafa",
          100: "#f5f5f5", 
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          850: "#1c1c1c",
          900: "#171717",
          925: "#0f0f0f",
          950: "#0a0a0a",
        },
        // Semantic Colors
        success: {
          50: "#ecfdf5",
          500: "#10b981",
          600: "#059669",
          900: "#064e3b",
        },
        warning: {
          50: "#fffbeb",
          500: "#f59e0b", 
          600: "#d97706",
          900: "#78350f",
        },
        error: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626", 
          900: "#7f1d1d",
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem", 
        112: "28rem",
        128: "32rem",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        "3xl": ["1.75rem", { lineHeight: "2.125rem" }], 
        "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
        "5xl": ["3rem", { lineHeight: "3.5rem" }],
        "6xl": ["3.75rem", { lineHeight: "4.25rem" }],
        "7xl": ["4.5rem", { lineHeight: "5rem" }],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em", 
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "medium": "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "large": "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        "brand": "0 10px 40px -10px rgba(16, 185, 129, 0.15), 0 20px 25px -5px rgba(16, 185, 129, 0.1)",
        "glow": "0 0 15px rgba(16, 185, 129, 0.4), 0 0 30px rgba(16, 185, 129, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out", 
        "scale-in": "scaleIn 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glow: {
          "0%": { "box-shadow": "0 0 5px rgba(16, 185, 129, 0.2)" },
          "100%": { "box-shadow": "0 0 20px rgba(16, 185, 129, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
