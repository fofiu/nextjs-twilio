const path = require("path");

module.exports = {
	// distDir: 'dist',
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},

	// images: {
	//   domains: ['joiya.blob.core.windows.net']
	// },

	// future: {
	// 	webpack5: true,
	// },

	// webpack: (config, { dev, isServer }) => {
	//   // Replace React with Preact only in client production build
	//   if (!dev && !isServer) {
	//     Object.assign(config.resolve.alias, {
	//       react: 'preact/compat',
	//       'react-dom/test-utils': 'preact/test-utils',
	//       'react-dom': 'preact/compat'
	//     });
	//   }
	//   return config;
	// }
};
