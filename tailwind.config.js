/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{jsx,tsx}", "src/lib/utils.ts"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          // DEFAULT: "var(--s-green-6)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          // DEFAULT: "var(--s-green-6)",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        "f-green-0": {
          DEFAULT: "var--f-green-0)",
          foreground: "var(--foreground)",
        },
        "f-green-1": {
          DEFAULT: "var(--f-green-1)",
          foreground: "var(--foreground)",
        },
        "f-green-1.5": {
          DEFAULT: "var(--f-green-1.5)",
          foreground: "var(--foreground)",
        },
        "f-green-4": {
          DEFAULT: "var(--f-green-4)",
          foreground: "var(--foreground)",
        },
        "f-green-5": {
          DEFAULT: "var(--f-green-5)",
          foreground: "var(--foreground)",
        },
        "f-green-6": {
          DEFAULT: "var(--f-green-6)",
          foreground: "var(--foreground)",
        },
        "f-green-7": {
          DEFAULT: "var(--f-green-7)",
          foreground: "var(--foreground)",
        },
        "f-green-8": {
          DEFAULT: "var(--f-green-8)",
          foreground: "var(--foreground)",
        },
        "f-green-8.5": {
          DEFAULT: "var(--f-green-8.5)",
          foreground: "var(--foreground)",
        },
        "f-green-9": {
          DEFAULT: "var(--f-green-9)",
          foreground: "var(--foreground)",
        },
        sand: {
          DEFAULT: "var(--sand)",
          foreground: "var(--foreground)",
        },
        "s-green-0": {
          DEFAULT: "var(--s-green-0)",
          foreground: "var(--foreground)",
        },
        "s-green-1": {
          DEFAULT: "var(--s-green-1)",
          foreground: "var(--foreground)",
        },
        "s-green-1.5": {
          DEFAULT: "var(--s-green-1.5)",
          foreground: "var(--foreground)",
        },
        "s-green-4": {
          DEFAULT: "var(--s-green-4)",
          foreground: "var(--foreground)",
        },
        "s-green-5": {
          DEFAULT: "var(--s-green-5)",
          foreground: "var(--foreground)",
        },
        "s-green-6": {
          DEFAULT: "var(--s-green-6)",
          foreground: "var(--foreground)",
        },
        "s-green-7": {
          DEFAULT: "var(--s-green-7)",
          foreground: "var(--foreground)",
        },
        "s-green-8.5": {
          DEFAULT: "var(--s-green-8.5)",
          foreground: "var(--foreground)",
        },
        "s-green-9": {
          DEFAULT: "var(--s-green-9)",
          foreground: "var(--foreground)",
        },
        "blue-0": {
          DEFAULT: "var(--blue-0)",
          foreground: "var(--foreground)",
        },
        "blue-5": {
          DEFAULT: "var(--blue-5)",
          foreground: "var(--foreground)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
