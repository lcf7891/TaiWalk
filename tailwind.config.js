/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue, js}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#646464',     // primary
        'secondary': '#7F977B',   // secondary
        'tertiary': '#FF725E',    // tertiary
        'quaternary': '#65895F',  // quaternary
        'quinary': '#6E7D60',     // quinary
        'info': '#F9F9F9',        // info
        'line': '#E0DA48',        // 底線
        'tag': '#BEA363',         // tag
        'light': '#E5E5E5',       // light border
        'dark': '#1E1E1E',        // dark 文字預設
        'bullet': '#C4C4C4',      // carousel
        'menu': '#A8B8A5',        // mobile menu
      },
      height: {
        '46': '11.5rem',
        '100': '25rem',
      },
      boxShadow: {
        'radiant': '0 0 10px, 0 0 20px, 0 0 40px',
      },
      animation: {
        'wander': 'wander 1s infinite',
        'rotateCircle': 'rotateCircle 10s linear infinite',
        'elementScaling': 'elementScaling 1s linear infinite',
      },
      keyframes: {
        wander: {
          '0%, 100%': {
            transform: 'translateX(-25%) rotate(-45deg)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(25%) rotate(-45deg)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        rotateCircle: {
          '0%': {
            filter: 'hue-rotate(0deg)',
          },
          '100%': {
            filter: 'hue-rotate(360deg)',
          },
        },
        elementScaling: {
          '0%': {
            transform: 'scale(1)',
          },
          '60%, 100%': {
            transform: 'scale(0)',
          },
        },
      },
      margin: {
        '15': '3.75rem',
      },
    },
  },
  plugins: [],
}

