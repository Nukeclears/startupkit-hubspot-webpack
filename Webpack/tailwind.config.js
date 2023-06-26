const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['../yourHubspotProjectName/**/*.{html,js}', './Content/css/**/*'], //hubspot project name here
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
      },
    },
    screens: {
      'sm': '640px',    
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1340px',
    },
    fontFamily: {
      display: "Open Sans, sans-serif",
      body: '"Poppins", sans-serif',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      primary: 'hsl(var(--color-primary) / <alpha-value>)',
      'primary-hover': 'hsl(var(--color-primary-hover) / <alpha-value>)',
      secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
      'secondary-hover': 'hsl(var(--color-secondary-hover) / <alpha-value>)',
      accent: 'hsl(var(--color-accent) / <alpha-value>)',
      'accent-hover': 'hsl(var(--color-accent-hover) / <alpha-value>)',
      neutral: '#F2F2F2', 
      form: {
        border: '#E5E5E5',
        placeholder: '#CECECE',
      },
      dark: '#727272',
      border: '#E5E5E5', 
      error: '#E5141F',
      warning: '#ff9900',
      info: '#2094f3',          
      success: '#0F824C',         
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      'base+': '1.125rem',
      lg: '1.25rem',
      'xl': '1.5rem',
      '2xl': '2rem',
      '3xl': '2.375rem',
      '4xl': '3rem',
      'heading1': 'clamp(2rem, 6vw, 3rem)',
      'heading2': 'clamp(1.5rem, 7vw, 2.2rem)',
      'heading3': 'clamp(1.25rem, 6vw, 1.5rem)'
    },
    extend: {
      spacing: {
        'block': '1.5rem',
      },
      width: {
        'screen2x': '200vw',
      },
      borderRadius: {
          'theme': '5px',
          'theme-form': '3px',
      },
      boxShadow: {
        'header': '0px 3px 6px rgba(0,0,1,0.05)',
        'footer': '0px -3px 6px rgba(0,0,1,0.05)',
        'theme': '0px 0px 6px rgba(0, 0, 0, 0.1)',
        'theme-hover': '0px 4px 20px rgba(0,0,1,0.10)',
      },
      content: {
        'blank': '""',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-h1': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-h2': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-h3': 'hsl(var(--color-primary) / 100)',
            '--tw-prose-h4': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-lead': theme('colors.black'),
            '--tw-prose-links': 'hsl(var(--color-primary) / 100)',
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.black'),
            '--tw-prose-bullets': theme('colors.black'),
            '--tw-prose-hr': theme('colors.black'),
            '--tw-prose-quotes': theme('colors.black'),
            '--tw-prose-quote-borders': theme('colors.black'),
            '--tw-prose-captions': theme('colors.black'),
            '--tw-prose-code': theme('colors.black'),
            '--tw-prose-pre-code': theme('colors.black'),
            '--tw-prose-pre-bg': theme('colors.black'),
            '--tw-prose-th-borders': theme('colors.black'),
            '--tw-prose-td-borders': theme('colors.black'),
          },
        },
        light: {
          css: {
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-h1': theme('colors.white'),
            '--tw-prose-h2': theme('colors.white'),
            '--tw-prose-h3': theme('colors.white'),
            '--tw-prose-h4': theme('colors.white'),
            '--tw-prose-lead': theme('colors.white'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.white'),
            '--tw-prose-bullets': theme('colors.white'),
            '--tw-prose-hr': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.white'),
            '--tw-prose-quote-borders': theme('colors.white'),
            '--tw-prose-captions': theme('colors.white'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-bg': theme('colors.white'),
            '--tw-prose-th-borders': theme('colors.white'),
            '--tw-prose-td-borders': theme('colors.white'),
          },
        },
        dark: {
          css: {
            '--tw-prose-body': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-h1': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-h2': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-h3': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-h4': theme('colors.black'),
            '--tw-prose-lead': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-links': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-bold': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-counters': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-bullets': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-hr': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-quotes': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-quote-borders': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-captions': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-code': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-pre-code': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-pre-bg': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-th-borders': 'hsl(var(--color-secondary) / 100)',
            '--tw-prose-td-borders': 'hsl(var(--color-secondary) / 100)',
          },
        },

      }),
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
    plugin(function({ addUtilities }) {
      addUtilities({
        '.open-collapse': {
          'display': 'flex !important',
          'height': 'auto !important',
          'overflow': 'visible !important',
        },
        '.opacity-0-force': {
          'opacity': '0 !important',
        },
        '.flex-force' : {
          'display': 'flex !important',
        },
      })
    }),
  ],
}
