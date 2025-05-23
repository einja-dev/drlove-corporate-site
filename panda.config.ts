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
      },
    },
    extend: {},
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
