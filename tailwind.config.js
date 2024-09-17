/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { 
    
    extend: { 
      colors: {
        primary: "#09165a",

        gold: {
          light_100: "#F8DC7C",
          light_200: "#f5d48b",
          light_300: "#f3b66b",
          light_400: "#bb914a",

          dark_100: "#bb914a",
          dark_200: "#c5a25e",
        },
        blue: {
          dark: "#030c3b",
          light: "#09165a",
          main: "#21759b",
          secondary: "#8b9ae5",
        },

        link: {
          water: "#eff4fb",
        },
      },

      keyframes: {
        glowing: {
          "0%": {
            backgroundColor: "#bb914a",
            boxShadow: "0 0 3px #bb914a",
          },
          "50%": {
            backgroundColor: "#bb914a",
            boxShadow: "0 0 15px #bb914a",
          },
          "100%": {
            backgroundColor: "#bb914a",
            boxShadow: "0 0 1px #bb914a",
          },
        },
      },

      animation: {
        glowing: "glowing 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
