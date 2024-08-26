import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "defaultBackground": "#121214",        
        "grayBase": "#202024",
        "brand": "#00875F",
        "lightGreen": "#1EA483",
        "lightPurple": "#7465D4"
      },
      boxShadow: {
        'cardShadow': '0 0 60px 0px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
};
export default config;
