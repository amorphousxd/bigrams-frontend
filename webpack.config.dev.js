var path = require('path');
var webpack = require('webpack');
require('babel-core/register');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src', 'index'),
  ],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'app.js',
    publicPath: '/static/'
  },
  plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.optimize.DedupePlugin(),
  ],
	resolve: {
		root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.json', '.jsx', '.css', '.svg'],
	},
  module: {
    loaders: [{
      test: /(.js$|.jsx$)/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }]
  }
};
