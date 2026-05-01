/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sv: { red: '#E50914', dark: '#0f0f0f', card: '#1a1a1a', border: '#2a2a2a' }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
        'shimmer':  'shimmer 1.5s infinite linear',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'none' } },
        shimmer: { from: { backgroundPosition: '-700px 0' }, to: { backgroundPosition: '700px 0' } },
      },
    },
  },
  plugins: [],
}
