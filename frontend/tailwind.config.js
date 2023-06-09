/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'media',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
