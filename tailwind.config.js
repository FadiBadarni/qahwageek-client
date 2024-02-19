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
          // Slightly off-white background to reduce glare
          100: '#F0F2F5',
          // Soft gray for secondary elements, less stark than pure white
          200: '#E5E7EB',
          // Neutral for subtle borders and dividers
          300: '#D1D5DB',
          // Light gray for inputs and other form elements
          400: '#9CA3AF',
          // Darker gray for text to ensure good contrast without being too harsh
          500: '#6B7280',
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
          100: '#F0F2F5',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            ul: {
              listStyleType: 'disc',
              marginRight: '1rem',
            },
            ol: {
              listStyleType: 'decimal',
              marginRight: '1rem',
            },
            li: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
          },
        },
        dark: {
          css: {
            color: '#fff',
            a: {
              color: '#3182ce',
            },
            h1: { color: '#fff' },
            h2: { color: '#fff' },
            h3: { color: '#fff' },
            strong: { color: '#fff' },
            u: { color: '#fff' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
