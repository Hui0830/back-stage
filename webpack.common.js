const path = require('path');
const Jarvis = require("webpack-jarvis");

module.exports = {
    entry: {
        index: path.resolve(__dirname, './index.js'),
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
		extensions: [".jsx",".js"],
		alias: {
			'components': path.resolve(__dirname,'./src/components'),
			'common': path.resolve(__dirname, './src/common'),
			'utils': path.resolve(__dirname, './src/common/utils'),
            'Api': path.resolve(__dirname, './src/common/api'),
            'pages': path.resolve(__dirname, './src/pages'),
		}
    },
    plugins: [
        new Jarvis({
			watchOnly: true,
			port: 3001 // optional: set a port
		}),
    ],
}