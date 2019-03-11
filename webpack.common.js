const path = require('path');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './index.js'),
        // login: path.resolve(__dirname, './src/login/index.jsx'),
    },
    resolve: {
		extensions: [".js",".jsx"],
		alias: {
			'components': path.resolve(__dirname,'./src/components'),
			'common': path.resolve(__dirname, './src/common'),
			'utils': path.resolve(__dirname, './src/common/utils'),
            'Api': path.resolve(__dirname, './src/common/api'),
            'pages': path.resolve(__dirname, './src/pages'),
		}
	},
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },

        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 2,
                    minSize: 0,
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: "vendor",
                    priority: 10,
                    enforce: true,
                }
            }
        }
    }
}