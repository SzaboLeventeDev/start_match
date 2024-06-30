/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,vue}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'night-blue': '#14213d'
      }
    },
    keyframes: {
      slideIn: {
        '0%': { transform: 'translateX(100%)', opacity: '0', width: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1', width: 'auto' }
      },
      slideOut: {
        '0%': { transform: 'translateX(0)', opacity: '1', width: 'auto' },
        '100%': { transform: 'translateX(100%)', opacity: '0', width: '0' }
      }
    },
    animation: {
      slideIn: 'slideIn 0.5s ease-in forwards',
      slideOut: 'slideOut 0.5s ease-out forwards'
    }
  },
  plugins: []
}
