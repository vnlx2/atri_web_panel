/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#F2F7FE',
        'link': '#435ebe'
      },
      screens: {
        '2xl': '1562px',
        '3xl': '1920px',
      }
    },
  },
  plugins: [],
}

