require('babel-core/register');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.dev');
var Router = require('react-router');
var express = require('express');
var app = new require('express')();
var port = 3003;

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: false,
  hot: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  contentBase: path.join('src'),
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static('public'));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
