var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    path.join(__dirname, 'src', 'index'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /(.js$|.jsx$)/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }]
  },
  resolve: {
    root: path.join(__dirname, `src`),
    extensions: [``, `.js`, `.json`, `.jsx`],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify("production"),
    }),
  ],
};
