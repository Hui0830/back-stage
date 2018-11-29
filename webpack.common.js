const path = require('path');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './index.js'),
    },
    resolve: {
		extensions: [".js",".jsx"],
		alias: {
			'components': path.resolve(__dirname,'./src/components'),
			'common': path.resolve(__dirname, './src/common'),
			'utils': path.resolve(__dirname, './src/common/utils'),
			'Api': path.resolve(__dirname, './src/common/api'),
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
                styles: {
                    name: 'styles',
                    test: /\.scss$/,
                    chunks: 'all',
                    enforce: true,
                },
                vendor: {
                    test: /node_moudules/,
                    chunks: 'initial',
                    priority: 10,
                    enforce: true,
                }
            }
        }
    }
}