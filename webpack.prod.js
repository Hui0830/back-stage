const merge = require('webpack-merge');//webpack合并插件
const path = require('path');
const baseWebpackConfig = require('./webpack.common.js');//引入webpack基础通用配置
const webpackFile = require('./webpack.file.config.js');//引入一些webpack路径配置

// 自动生成html模板文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 清除文件
const cleanWebpackPlugin = require('clean-webpack-plugin');

// webpack复制插件
const copyWebpackPlugin = require('copy-webpack-plugin');

// optimizeCssPlugin CSS文件压缩插件
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
// css 代码提取到独立.css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractSCSS = new MiniCssExtractPlugin({
			filename: 'css/[name].[md5:contenthash:hex:8].css',
			chunkFilename: 'css/[name]_[id].css',
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
		// css文件压缩
		new optimizeCssPlugin({
			assetNameRegExp: /\.css$/g,
	        cssProcessor: require('cssnano'),
	        cssProcessorOptions: { discardComments: { removeAll: true } },
	        canPrint: true
		}),
	],

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					'babel-loader',
				],
				exclude: path.resolve(__dirname,' ./node_modules'),
			},
			// {
			// 	test: /\.css$/,
			// 	use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader'],
			// 	include:[
			// 		path.resolve(__dirname,' ./src'),
			// 		path.join(__dirname, './node_modules/antd')
			// 	]
			// },
			{
			    test: /\.(scss|css)$/,
			    use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
				include:[
					path.resolve(__dirname,'src'),
					path.join(__dirname, './node_modules/antd')
				]
			},
			
			{
				test: /\.(png|jpg|jpeg|png|gif|woff|svg|eot|ttf)/,
				loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&outputPath='+webpackFile.resource+'/'
			},
			{
				test: /\.swf$/,
				loader: 'file?name=js/[name].[ext]'
			},
		]
	}

});

/*生成html文件*/
	let cof = {
		filename:  'index.html',
		template: 'index.html',
		inject: true,
		title: "星婴美",
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAtrributeQuotes: true
		},
		chunks: '*',
		hash: false,
		chunksSortMode: 'dependency'
	};
	config.plugins.push(new HtmlWebpackPlugin(cof))

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