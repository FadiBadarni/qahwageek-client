/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#60A5FA',
          accent: '#BFDBFE',
          background: '#111827',
          layer: '#1F2937',
          text: '#F9FAFB',
          border: '#374151',
          input: '#1F2937',
        },
        light: {
          primary: '#2563EB',
          accent: '#E0E7FF',
          background: '#F9FAFB',
          layer: '#d6dee7',
          text: '#1F2937',
          border: '#D1D5DB',
          input: '#F3F4F6',
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
          100: '#F9FAFB',
          200: '#E5E7EB',
          300: '#CBD5E1',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
        },
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.accent.500'),
              },
            },
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
            h1: { color: theme('colors.text') },
            h2: { color: theme('colors.text') },
            h3: { color: theme('colors.text') },
            strong: { color: theme('colors.text') },
            u: { color: theme('colors.text') },
            code: {
              color: theme('colors.text'),
              backgroundColor: theme('colors.light.input'),
              padding: '0.25rem',
              borderRadius: '0.2rem',
            },
            blockquote: {
              color: theme('colors.text'),
              borderLeftColor: theme('colors.border'),
            },
            table: {
              borderColor: theme('colors.neutral.400'),
              backgroundColor: theme('colors.light.layer'),
            },
            'th, td': {
              borderColor: theme('colors.neutral.400'),
              color: theme('colors.text'),
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
            color: theme('colors.dark.text'),
            a: {
              color: theme('colors.dark.primary'),
              '&:hover': {
                color: theme('colors.dark.accent'),
              },
            },
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
            h1: { color: theme('colors.dark.text') },
            h2: { color: theme('colors.dark.text') },
            h3: { color: theme('colors.dark.text') },
            strong: { color: theme('colors.dark.text') },
            u: { color: theme('colors.dark.text') },
            code: {
              color: theme('colors.dark.text'),
              backgroundColor: theme('colors.dark.border'),
              padding: '0.25rem',
              borderRadius: '0.2rem',
            },
            pre: { backgroundColor: theme('colors.dark.border') },
            blockquote: {
              color: theme('colors.dark.text'),
              borderLeftColor: theme('colors.dark.border'),
            },
            table: {
              borderColor: theme('colors.dark.border'),
              backgroundColor: theme('colors.dark.layer'),
            },
            'th, td': {
              borderColor: theme('colors.dark.border'),
              color: theme('colors.dark.text'),
            },
            tr: {
              borderColor: theme('colors.dark.border'),
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
