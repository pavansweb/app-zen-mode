/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#111111',
        primary: '#00e5ff', // Cyan
        secondary: '#9d4edd', // Purple
        accent: '#0055ff', // Electric Blue
        text: '#ffffff',
        muted: '#888888',
        danger: '#ff3366',
        success: '#00ff88',
      },
    },
  },
  plugins: [],
}