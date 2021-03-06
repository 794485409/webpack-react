'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./default');

// Add needed plugins here
// 生产环境所需额外插件

// let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  // devtool: 'sourcemap',
  devtool: 'hidden-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    // new BowerWebpackPlugin({
    //   searchResolveModulesDirectories: false
    // }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new defaultSettings.ExtractTextPlugin('styles.css')
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
// 生产环境所需额外 loades
config.module.rules.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/
  // include: [].concat(
  //   config.additionalPaths,
  //   [ path.join(__dirname, '/../src') ]
  // )
});

module.exports = config;
