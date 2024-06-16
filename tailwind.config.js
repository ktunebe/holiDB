/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,handlebars}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        bg: 'var(--color-bg)',
      },
      fontFamily: {
        broadway: ['Broadway3D', 'sans-serif'],
        undeveloped: ['Undeveloped', 'sans-serif'],
        ringbearer: ['Ringbearer', 'sans-serif'],
        test: ['Test', 'sans-serif'],
        theme: 'var(--font-theme)'
      },
    },
  },
  plugins: [require("daisyui")],
}