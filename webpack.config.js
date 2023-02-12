const path = require('path');

module.exports = {
	// 'production' | 'development' | 'none'
	mode: 'production',

	entry: './src/js/script.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/assets/js'),
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
			},
		]
	},

	devtool: false,
  target: ['web', 'es5'],
};