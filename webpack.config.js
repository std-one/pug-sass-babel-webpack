const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	// 'production' | 'development' | 'none'
	mode: 'development',

	entry: './src/js/script.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/assets/js'),
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env'
							]
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
			},
		]
	},

	devtool: 'source-map',

	plugins: [
		new UglifyJSPlugin({
			sourceMap: true,
		}),
	],
};