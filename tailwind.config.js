/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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

    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
