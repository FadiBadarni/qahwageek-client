/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0D1117',
          800: '#161B22',
          700: '#21262D',
        },
        light: {
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#E2E8F0',
          400: '#CBD5E1',
          500: '#94A3B8',
        },
        brand: {
          500: '#2563EB',
          400: '#3B82F6',
          300: '#60A5FA',
          200: '#BFDBFE',
          100: '#EFF6FF',
        },
        accent: {
          600: '#22D3EE',
          500: '#67E8F9',
          400: '#BAE6FD',
        },
        neutral: {
          100: '#E0E0E0',
          200: '#A1A1AA',
          300: '#71717A',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
