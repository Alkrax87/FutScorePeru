/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        xxs: "10px",
      },
      colors: {
        dark: "#1E2022",
        night: "#161513",
        nightfall: "#232323",
        brightnight: "#393939",
        crimson: "#dc143c",
        "crimson-hover": "#eb1a44",
        gold: "#d8b145",
        libertadores: "#FBBC04",
        sudamericana: "#27943C",
        relegation: "#C1272D",
        gpromotion: "#F1C13A",
        grelegation: "#11759C",
        promotion: "#34A853",
        quarter: "#a0d654",
        "map-light": "#DDDDDD",
        "map-dark": "#313131",
      },
      strokeWidth:{
        map: 5,
      },
      skew: {
        30: "30deg",
        50: "50deg",
      },
    },
  },
  plugins: [],
};
