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
      animation: {
        'wander': 'wander 1s infinite',
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
        }
      }
    },
  },
  plugins: [],
}

