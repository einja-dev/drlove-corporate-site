import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        orangeHeading: { value: '#FF8A5C' },
        blueHeading: { value: '#618BFF' },
        greenHeading: { value: '#A2E0AE' },
        background: { value: '#fff' },
      },
      shadows: {
        card: {
          default: { value: '0 0 24px 0 rgba(0,0,0,0.06)' },
          hover: { value: '0 8px 32px 0 rgba(97,139,255,0.18)' },
        },
      },
    },
    breakpoints: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },

  // The output directory for your css system
  outdir: 'src/styled-system',
});
