import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/renderer/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        panel: '#14141d',
        accent: '#76e4f7',
      },
    },
  },
  plugins: [],
} satisfies Config;
