/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	// purge: [
	//   './src/**/*.html',
	//   // './dist/**/*.vue'
	// ],

	important: true,
	theme: {
		container: {
			center: true,
		},
		// extend: {
		//   fontFamily: {
		//     sans: ['Inter', ...defaultTheme.fontFamily.sans],
		//   },
		// },
		// lineHeight: ,
		fontFamily: {
			sans: ["Inter", ...defaultTheme.fontFamily.sans],
			headers: ["Bitter"],
			// title: ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			colors: {
				brown: "#4D2802",
				joiya: "#FFCD00",
				"joiya-light": "#FBF9F8",
				"joiya-dark": "#ECAA00",
				dark: "#F8F3F1",
				yellow: "#FFCD00",
				tan: "#4D2802",
				"light-background": "#F8F3F1",
				"light-purple": "#706677",
				footer: "#46404A",
				"dark-yellow": "#ECAA00",
				rose: "#F43F5E",
				"rose-400": "#FB7185",
			},
			opacity: {
				10: ".1",
				40: ".4",
			},
			screens: {
				"max-xl": { max: "1279px" },
				// => @media (max-width: 1279px) { ... }

				"max-lg": { max: "1023px" },
				// => @media (max-width: 1023px) { ... }

				"max-md": { max: "767px" },
				// => @media (max-width: 767px) { ... }

				"max-sm": { max: "639px" },
				// => @media (max-width: 639px) { ... }

				"max-xs": { max: "374px" },
				// => @media (max-width: 374px) { ... }
			},
		},
	},
	variants: {},
	// plugins: [require('@tailwindcss/forms')],
	purge: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	// purge: {
	//   // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
	//   enabled: process.env.NODE_ENV === 'production',

	// 	// We prefixed with `example/` here since we run `nuxt example/` and working dir is '../' for PurgeCSS
	//   content: [
	// 		'./dist/**/*.html'
	//   ]
	// }
};
