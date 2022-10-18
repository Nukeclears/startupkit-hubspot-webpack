const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['../yourHubspotProjectName/**/*'], //hubspot project name here
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '2rem',
        xl: '4rem',
        '2xl': '5rem',
      },
    },
    screens: {
      'sm': '640px',    
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      padding: {
        'blockSpacing': '1.5rem',
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#000',
      'white': '#fff',
      // 'blue': {
      //     100: '#008D9D',
      //     200: '#006B90',
      //     300: '#00566C',
      //     400: '#0F629A',
      // },  
    },
  },
  safelist: [
    {
      pattern: /col-(span|start)-{1,12}/,
      variants: ['lg'],
    },
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
