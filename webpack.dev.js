const webpack = require('webpack');//引入webpack
const opn = require('opn');//打开浏览器
const merge = require('webpack-merge');//webpack合并插件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseWebpackConfig = require('./webpack.common.js');//引入webpack基础通用配置
const webpackFile = require('./webpack.file.config.js');//引入一些webpack路径配置

let config = merge(baseWebpackConfig,{

	/*设置开发环境，默认为product*/
	mode: 'development',
	output: {
		path: path.resolve(__dirname,webpackFile.devDirectory),
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].js',
		publicPath: '/public/'
	},
	devtool: '#sourceMap',
	plugins: [
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'./index.html'),
			inject: 'body',
			favicon: './src/images/favicon.ico',
		}),
		/*设置热更新*/
		new webpack.HotModuleReplacementPlugin(),
	],

	module: {
		rules: [
			{
				test: /\.js|\.jsx$/,
				use: [
					'cache-loader',//设置缓存
					'babel-loader',				
					],
				exclude: [
					path.resolve(__dirname,'../node_modules')
				],
			},
			{
				test: /\.(css|pcss|scss)$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				],
				include:[
					path.resolve(__dirname,'src'),
					path.join(__dirname, './node_modules/antd'),
					path.join(__dirname, './node_modules/react-draft-wysiwyg')
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|ttf|eot|woff|svg|woff2|swf)$/i,
				use: [
					{
						loader: 'file-loader',
						query: {
							name:'[path][name].[ext]'
						}
					},
				]
			}
		]
	},

	/*设置API转发*/
	devServer: {
		host:'0.0.0.0',
		port: 8080,
		hot: true,
		inline: true,
		contentBase: path.resolve(__dirname,webpackFile.devDirectory),
		publicPath: '/public/',
		historyApiFallback:{
			index:'/public/index.html'
		},
		disableHostCheck: true,
		// proxy: [
		// 	{
		// 		context: ['/api/*'],
		// 		target: 'http://localhost:3000',
		// 		secure: true
		// 	},
		// ],
		/*打开浏览器并打开本项目网址*/
		after() {
			opn('http:localhost:'+this.port)
		}
	}
});

module.exports = config;