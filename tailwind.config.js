/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-white': 'rgb(var(--v-theme-textWhite))',
        'text-black': 'rgb(var(--v-theme-textBlack))',
        'context-blue': 'rgb(var(--v-theme-contextBlue))',
        'tooltip-background':'rgb(var(--v-theme-tooltipBackground))',
        'tooltip-text': 'rgb(var(--v-theme-tooltipText))',
      }
    },
  },
  plugins: [],
}