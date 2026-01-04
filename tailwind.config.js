/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vermilion: "#e74c3c",
        brown: {
          500: "#8B4513", // Example medium brown
          600: "#A0522D", // Example dark brown
        }, // Replace with your actual vermilion color
      },
      fontFamily: {
        rye: ['Rye', 'serif'],
        'great-vibes': ['Great Vibes', 'cursive'],
        'mate-sc': ['Mate SC', 'serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        'robo-slab': ['Roboto Slab', 'serif'],
        pixel: ['"Press Start 2P"', 'sans-serif'],
        pixelifySans: ['Pixelify Sans', 'sans-serif'],
        engagement:['Engagement','serif'],
        alegreya:['Alegreya','serif'],
        bree:['Bree Serif','serif'],
      },
    },
  },
  plugins: [],
};
