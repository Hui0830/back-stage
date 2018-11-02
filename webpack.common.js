const path = require('path');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './index.js'),
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