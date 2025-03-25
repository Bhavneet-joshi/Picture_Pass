/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          900: '#121212', // Main background
          800: '#1E1E1E', // Secondary background
          700: '#2D2D2D', // Card background
          600: '#3D3D3D', // Border color
        },
        'primary': {
          500: '#3B82F6', // Primary blue
          600: '#2563EB', // Hover state
        },
        'accent': {
          500: '#F97316', // Orange accent
        },
        'gray': {
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      spacing: {
        '128': '32rem',
      },
      container: {
        center: true,
        padding: '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}
