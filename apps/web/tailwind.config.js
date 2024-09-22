/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./styles/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", '../../packages/react-components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#17B16B',
        secondary: '#D5F263',
        focus: '#FBAB4C',
        gray: {
          100: '#EAEAEA',
          300: '#B7B7B7',
          500: '#444444',
          700: '#191919',
          900: '#121212',
        }
      }
    },
  },
  plugins: [],
};
