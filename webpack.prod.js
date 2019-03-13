const merge = require('webpack-merge'),//webpack合并插件
	path = require('path'),
	os = require('os'),
	DllReferencePlugin = require('webpack/lib/DllReferencePlugin'),
	ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'),//并行压缩js
	HappyPack = require('happypack');

// 自动生成html模板文件
const HtmlWebpackPlugin = require('html-webpack-plugin'),
	cleanWebpackPlugin = require('clean-webpack-plugin'),// 清除文件
	copyWebpackPlugin = require('copy-webpack-plugin'),// webpack复制插件
	optimizeCssPlugin = require('optimize-css-assets-webpack-plugin'),// optimizeCssPlugin CSS文件压缩插件
	MiniCssExtractPlugin = require("mini-css-extract-plugin");// css 代码提取到独立.css文件

const baseWebpackConfig = require('./webpack.common.js'),//引入webpack基础通用配置
	webpackFile = require('./webpack.file.config.js'),//引入一些webpack路径配置
	happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); //构建共享进程池，包含5个进程

const extractSCSS = new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name]_[contenthash:8].css',
			fallback:'style-loader'
		});

let config = merge(baseWebpackConfig, {
	/*设置生产环境*/
	mode: 'production',

	output: {
		path: path.resolve(webpackFile.proDirectory),
		publicPath: '/',
		filename: "js/[name].[chunkhash:8].js",
		chunkFilename: "js/[name]-[id].[chunkhash:8].js",
	},
	plugins: [
		// 提取CSS文件
		extractSCSS,
		// 告诉webpack使用了哪些动态链接库
		new DllReferencePlugin({
			manifest: require('./dll/react.manifest.json')
		}),
		new DllReferencePlugin({
			manifest: require('./dll/utils.manifest.json')
		}),
		// happypack并行处理
		new HappyPack({
			// 用唯一ID来代表当前HappyPack是用来处理一类特定文件的，与rules中的use对应
			id: 'babel',
			loaders: ['babel-loader?cacheDirectory'],
			//threadPool: happyThreadPool
		}),
		new HappyPack({
			// 用唯一ID来代表当前HappyPack是用来处理一类特定文件的，与rules中的use对应
			id: 'css',
			loaders: [
				'css-loader',
				'postcss-loader',
				'sass-loader'],
				//threadPool: happyThreadPool
		}),
		new optimizeCssPlugin({
			assetNameRegExp: /\.css$/g,
					cssProcessor: require('cssnano'),
					cssProcessorOptions: { discardComments: { removeAll: true } },
					canPrint: true
		}),
	],
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
		},
		minimizer: [
			new ParallelUglifyPlugin({
				cacheDir: '.cache/',
				uglifyJS:{
					output: {
						 // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
						beautify: false,
						 //是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
						comments: false
					},
					compress: {
						//是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出
						warnings: false,
						//是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
						drop_console: true,
						//是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 1, 默认为否
						collapse_vars: true,
					}
				},
			}),
		]
},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ['happypack/loader?id=babel'],
				exclude: path.resolve(__dirname,' ./node_modules'),
			},
			{
			  test: /\.(scss|css)$/,
			  use: [MiniCssExtractPlugin.loader,'happypack/loader?id=css'],
				include:[
					path.resolve(__dirname,'src'),
					path.join(__dirname, './node_modules/antd')
				]
			},
			
			{
				test: /\.(png|jpg|jpeg|svg)/,
				exclude: path.resolve(__dirname,' ./node_modules'),
				loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&outputPath='+webpackFile.resource+'/'
			},
		]
	}

});

/*生成html文件*/
const getHtml = {
		filename:  `index.html`,
		template: 'index.html',
		inject: 'body',
		title: "星婴美",
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAtrributeQuotes: true
		},
		chunks: ['manifest', 'vendor','index'],
		hash: false,
		chunksSortMode: 'dependency'
};
//配置页面
	config.plugins.push(new HtmlWebpackPlugin(getHtml));

/*清除dist文件夹*/
config.plugins.push(new cleanWebpackPlugin([webpackFile.proDirectory],{
	root: path.resolve(__dirname, './'),
	verbose: true,
	dry: false
}));

/*不需要编译的静态文件拷贝*/
let copyObj = [
	// 网站favicon.ico
	{
		from: './src/images/favicon.ico',
		to: './'
	},
	{
		from: './dll',
		to: './'
	}
];
let copyArr = [];
copyObj.map((data) => {
	copyArr.push(
		new copyWebpackPlugin([
			{
				from: data.from,
				to: data.to,
				ignore: ['.*']
			}
		])
	)
});

/*拷贝静态文件*/
copyArr.map(function (data) {
	return config.plugins.push(data)
})

module.exports = config;