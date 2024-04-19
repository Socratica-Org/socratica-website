import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#FBF8EF",
      },
      colors: {
        primary: "#FBF8EF",
        "cool-grey": "#CFCCC4",
        "soft-grey": "#706F6B",
        "dark-grey": "#1f1f1f",
      },
      fontFamily: {
        "tiempos": ["Tiempos Headline", "serif"],
        glyphworld: ["GlyphWorld"],
        "sf-mono": ["SF Mono", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
