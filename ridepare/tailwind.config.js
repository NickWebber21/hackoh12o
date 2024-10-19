/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#C4A77D", // Light Brown
        secondary: "#EF946C", // Light Orange
        accent:"#998888", // Light Grey
        light: "#EADEDA", // Light Purple
        neutral: "#A29393" // Dark Grey
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Set Poppins as the default sans font
      },


    },
  },
  plugins: [],
}
