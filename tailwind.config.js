/** @type {import('tailwindcss').Config} */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lpka: {
          primary: '#1e40af',
          'primary-fg': '#ffffff',
          green: '#047857',
          'green-fg': '#ffffff',
          gold: '#d97706',
          'gold-fg': '#ffffff',
          bg: '#f8fafc',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'official': '0.375rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'govt': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}
