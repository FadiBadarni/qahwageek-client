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
          100: '#F0F2F5',
          200: '#E5E7EB',
          300: '#CBD5E1',
          400: '#9CA3AF',
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
          300: '#CBD5E1',
          400: '#9CA3AF',
          500: '#6B7280',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.dark.800'),
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
            table: {
              borderColor: theme('colors.neutral.400'),
              backgroundColor: theme('colors.light.100'),
            },
            'th, td': {
              borderColor: theme('colors.neutral.400'),
              color: theme('colors.dark.800'),
              borderStyle: 'solid',
              borderLeftWidth: '1px',
            },
            tr: {
              borderColor: theme('colors.neutral.400'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.light.100'),
            a: {
              color: '#3182ce',
            },
            h1: { color: theme('colors.light.100') },
            h2: { color: theme('colors.light.100') },
            h3: { color: theme('colors.light.100') },
            strong: { color: theme('colors.light.100') },
            u: { color: theme('colors.light.100') },
            code: { color: theme('colors.light.100') },
            blockquote: {
              color: theme('colors.light.400'),
              borderLeftColor: theme('colors.light.500'),
            },
            table: {
              borderColor: theme('colors.light.500'),
              backgroundColor: theme('colors.dark.800'),
            },
            'th, td': {
              borderColor: theme('colors.light.500'),
              color: theme('colors.light.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
