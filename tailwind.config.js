/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-grey': '#EFEEF0',
        'purple-color-app': '#6A3EA1',
        'gray-button': '#C8C5CB',
        'delete-red': '#CE3A54',
        'custome-black': '#180E25',
        'dark-grey': '#827D89'
      },
      height: {
        '21': '5.25rem'
      },
      fontFamily: {
        "Inter": "Inter",
        "InterMedium": "Inter Medium",
        "InterBold": "Inter Bold",
      }
    },
  },
  plugins: [],
}
