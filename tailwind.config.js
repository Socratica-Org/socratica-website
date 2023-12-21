/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        backgroundColor: {
          'primary': '#FBF8EF',
        },
        colors: {
          'cool-grey': '#CFCCC4',
          'soft-grey': '#706F6B'
        },
        fontFamily: {
          'tiempos-headline': ['Tiempos Headline', 'serif'],
          'glyphworld': ['GlyphWorld'],
          'sf-mono': ['SF Mono', 'Menlo', 'monospace'],
        },
      }
    },
    plugins: []
  };