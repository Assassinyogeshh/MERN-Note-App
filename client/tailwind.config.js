/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': {'min': '200px', 'max': '369px'},
      'xm':{'min':'370px', 'max':'640px'},
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}

