/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-blue': '#0B1426',
        'cosmic-purple': '#2D1B69',
        'star-gold': '#FFD700',
        'nebula-pink': '#FF69B4',
      }
    },
  },
  plugins: [],
}
