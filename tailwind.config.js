/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      'git':{
        950: '#010409',
        800: '#0D1117',
        700: '#161B22',
        600: '#30363D',
        'text-primary': '#E6EDF3',
        'text-secondary': '#8D96A0',
        'text-blue': '#4493F8'
      }
    }
  },
  plugins: [],
}

