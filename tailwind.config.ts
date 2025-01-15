import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006876',
        primaryDark: '#031513',
        secondary: '#334A50',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      boxShadow: {
        custom: '-1px 4px 6px -2px rgba(0, 0, 0, 0.75)',
      },
    },
  },
  plugins: [],
} satisfies Config;
