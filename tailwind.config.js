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
        sudamericana: "#27943C",
        relegation: "#C1272D",
        gpromotion: "#F1C13A",
        grelegation: "#11759C",
        promotion: "#34A853",
      },
      skew: {
        30: "30deg",
        50: "50deg",
      },
    },
  },
  plugins: [],
};
