/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  safelist: ["bg-variant-bold"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#f8f5f2",
          100: "#f4f0ed",
        },
        brown: {
          DEFAULT: "#634832",
          accent: "#8b4513",
        },
      },
      fontFamily: {
        hero: ['"Permanent Marker"', "cursive"],
        hand: ['"Architects Daughter"', "cursive"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cream-gradient": "linear-gradient(135deg, #f8f5f2 0%, #f4f0ed 100%)",
        "blueprint-grid":
          "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "20px 20px",
      },
    },
  },
  plugins: [],
};
