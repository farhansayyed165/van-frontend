/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        "button-orange":"#FF8C38",
        "body-bg":"#FFF7ED"
      },
      fontFamily:{
        "Inter":"Inter sans-serif",
        "Karla":"Karla sans-serif",
        "Lato":"Lato sans-serif"
      },
      fontSize:{
        "clamph1":"min(1.5rem, 5vw)",
        "clampHome":"min(2.5rem, 8vw)",
      }
    },
  },
  plugins: [],
}

