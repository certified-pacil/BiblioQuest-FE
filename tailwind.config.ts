import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        fontFamily: {
            montserrat: ["Montserrat", "sans-serif"],
        }
    },
  },
  plugins: [],
} satisfies Config;
