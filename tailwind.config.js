/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'transition',
    'dark:bg-gray-900',
    'dark:text-gray-50'
  ],
}

