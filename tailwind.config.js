/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#FBF8EF",
      },
      colors: {
        "primary": "#FBF8EF",
        "cool-grey": "#CFCCC4",
        "soft-grey": "#706F6B",
        "dark-grey": "#1f1f1f",
      },
      fontFamily: {
        "tiempos-headline": ["Tiempos Headline", "serif"],
        glyphworld: ["GlyphWorld"],
        "sf-mono": ["SF Mono", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
