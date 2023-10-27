/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        backgroundColor: {
          'primary': '#FBF8EF',
        },
        // backgroundImage: {
        //   'dotted-bg': "url('data:image/svg+xml;utf8,<svg width=\"4\" height=\"4\" viewBox=\"0 0 4 4\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"2\" cy=\"2\" r=\"1\" fill=\"white\"/></svg>')",
        // },
        fontFamily: {
          'tiempos-headline': ['Tiempos Headline', 'serif']
        }
      }
    },
    plugins: []
  };