/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "250px",
      sm: "380px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1600px",
    },

    extend: {
        
      colors: {
        mainclr: "#4F45E4",
        mainhvr: "#4337C9",
      },
     
      backgroundImage: {
        // "home-bg": "url('./assets/images/heera-bg.webp')",
      },
    },
  },
  plugins: [],
};