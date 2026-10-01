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
        light: "#f5f5f5",
        night: "#161513",
        nightfall: "#232323",
        brightnight: "#393939",
        main: "#dc143c",
        "main-hover": "#eb1a44",
        gold: "#d8b145",
        libertadores: "#FBBC04",
        sudamericana: "#27943C",
        relegation: "#C1272D",
        gpromotion: "#F1C13A",
        grelegation: "#11759C",
        promotion: "#34A853",
        quarter: "#a0d654",
        nextround: "#FE4E3B",
        "map-light": "#DDDDDD",
        "map-dark": "#313131",
      },
      keyframes: {
        zoomInOut: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        }
      },
      animation: {
        zoomInOut: "zoomInOut 30s ease-in-out infinite",
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
