/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'homepage-bg':"url('/src/assets/homepage_bg.jpg')",
      }
    },
  },
  plugins: [],
}

