/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        custom: {
          primary_bg: '#FFFFFF',
          secondary_bg: '#F4F7FD',
          button_hover_bg: '#EFEFF9',
          button_bg: '#635fc7',
          primary_text: '#fff',
          secondary_text: '#828FA3',
          dark_primary_bg: '#2B2C37',
          dark_secondary_bg: '#20212C',
          dark_secondary_text: '#828FA3',
        },
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
