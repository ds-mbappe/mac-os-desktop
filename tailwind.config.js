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
        'fake-black': 'rgb(var(--v-theme-fakeBlack))',
        'dark-grey': 'rgb(var(--v-theme-darkGrey))',
        'middle-grey': 'rgb(var(--v-theme-middleGrey))',
        'light-grey': 'rgb(var(--v-theme-lightGrey))',
        'very-light-grey': 'rgb(var(--v-theme-veryLightGrey))',
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
}