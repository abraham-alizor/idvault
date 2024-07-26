/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",  // Include all JS, JSX, TS, and TSX files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}",  // Include all JS, JSX, TS, and TSX files in the components folder]
    "./app/(tabs)/**/*.{js,jsx,ts,tsx}",
    "./app/(tabs)/(home)/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}"  ,
  ],
  theme: {
    extend: {
      colors: {
        "light-green": "#E5EAE7",
        "brand": "#008643",
        "dark-green": "#083C2F",
        "neutral-bg": "#F5F4F3",
      }
    },
  },
  plugins: [],
}

