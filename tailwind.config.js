/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      transparent: 'transparent',
      emerald: colors.emerald,
      red: colors.red,
      cyan: colors.cyan,
      green: colors.green,
      sky: colors.sky,
      'git':{
        950: '#010409',
        800: '#0D1117',
        700: '#161B22',
        600: '#2A2F37',
        500: '#292e36',
        400: '#30363D',
        300: '#C9D1D9',
        'text-primary': '#E6EDF3',
        'text-secondary': '#8D96A0',
        'text-blue': '#4493F8',
        'red':'#F78166'
      }
    }
  },
  plugins: [],
}

