/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // all files in app/
    "./components/**/*.{js,ts,jsx,tsx}", // all files in components/
  ],
  theme: {
    extend: {
      colors: {
        accent: "#2b6cb0",
        muted: "#6b7280",
        background: "#ffffff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: 'media', // uses system preference for dark mode
}
