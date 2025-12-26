/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0096C7', // Ocean Blue
        },
        secondary: {
          DEFAULT: '#FF6B6B', // Sunset Coral
        },
        accent: {
          DEFAULT: '#FFE66D', // Surfboard Yellow
        },
        highlight: {
          DEFAULT: '#2EC4B6', // Jungle Green
        },
        background: {
          DEFAULT: '#FFFFFF', // White
        },
        text: {
          DEFAULT: '#333333', // Mountain Slate
        }
      }
    },
  },
  plugins: [],
}