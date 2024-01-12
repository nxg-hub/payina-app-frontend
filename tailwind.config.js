/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#FFFFFF',
      secondary: '#00678F',
      yellow: '#FFCB05',
      lightBlue: '#006181',
      neutral: '#1A1D1F'
    },
    keyframes: {
      slideBottom: {
        '0%': { transform: 'translateY(-25%)', transform: 'translateY(-25%)' },
        '100%': { transform: 'translate(0)' }
      }
    },
    animation: {
      slideBottom: 'slideBottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
    },
    extend: {}
  },
  plugins: []
};
