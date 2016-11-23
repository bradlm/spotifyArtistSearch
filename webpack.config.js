var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/dist');
var APP_DIR = path.resolve(__dirname, 'client/src');

module.exports = {
  devtool: 'inline-source-map',
  entry: APP_DIR,
  output: {
    path: BUILD_DIR,
    publicPath: BUILD_DIR,
    filename: 'bundle.js',
  },
  resolve: {
    modulesDirectories: ['client/src'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'babel?presets[]=es2015'
      },
    ]
  }
};