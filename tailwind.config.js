/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vermilion: '#e74c3c', // Replace with your actual vermilion color
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        'robo-slab': ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
}