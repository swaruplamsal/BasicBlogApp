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
        lora: ["var(--font-lora)", "Lora", "sans-serif"],
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
