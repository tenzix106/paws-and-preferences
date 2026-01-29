/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFD6E8',
          blue: '#C4E7FF',
          purple: '#E6D9FF',
          yellow: '#FFF4C4',
          green: '#D4F4DD',
          peach: '#FFE5D9',
          lavender: '#E8DEF8',
          mint: '#D0F4DE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
