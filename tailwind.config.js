/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        backgroundColor: {
          'primary': '#FBF8EF',
        },
        fontFamily: {
          'tiempos-headline': ['Tiempos Headline', 'serif']
        }
      }
    },
    plugins: []
  };