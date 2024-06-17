/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js,handlebars}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				accent: "var(--color-accent)",
				bg: "var(--color-bg)",
			},
			fontFamily: {
				undeveloped: ["Undeveloped", "sans-serif"],
			},
		},
	},
	plugins: [require("daisyui")],
};
