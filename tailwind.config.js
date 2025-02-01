/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        night: "#161513",
        nightfall: "#232323",
        brightnight: "#393939",
        crimson: "#dc143c",
        gold: "#d8b145",
        libertadores: "#FBBC04",
        sudamericana: "#34A853",
        relegation: "#C1272D",
        promotion: "#27943C",
        semifinal: "#F1C13A",
        quarter: "#11759C",
      },
      skew: {
        "30": "30deg",
        "50": "50deg",
      }
    },
  },
  plugins: [],
};
