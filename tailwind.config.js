/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      gray: {
        100: '#E2E4E3',
        200: '#F6F7F9',
        500: '#7b7a88',
        600: '#4D4C5F',
      },
      blue: {
        300: '#3E6BF7',
        900: '#062256',
      },
      red: {
        500: '#EF4444',
        100: '#FFE7E7',
      },
      orange: {
        300: '#FDA353',
      },
      green: {
        500: '#79D510',
      },
      white: '#fff',
      transparent: '#ffffff00',
    },
    extend: {},
  },
  plugins: [],
};
