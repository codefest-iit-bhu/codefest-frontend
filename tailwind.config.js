/** @type {import('tailwindcss').Config} */

import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content(),],
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
        quicksand: ['Quicksand', 'sans-serif'],
        'robo-slab': ['Roboto Slab', 'serif'],
        pixel: ['"Press Start 2P"', 'sans-serif'],
        pixelifySans: ['Pixelify Sans', 'sans-serif'],
      },
    },
  },
  plugins: [flowbite.plugin(),],
};
