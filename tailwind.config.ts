import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        "green-primary": "#147D73",
        "green-action": "#08822A",
        "black-grey": "#637381",
        "black-black": "#212B36"
      },
    },
  },
  plugins: [],
} satisfies Config;
