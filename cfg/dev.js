'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./default');

// Add needed plugins here
// 开发环境需要的 插件
// let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server/',
    './src/index.js'
  ],
  cache: true,
  // devtool: 'eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // debug 配置项需要使用插件的形式引入
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        drop_console: true
      },
      comments: false,
      beautify: false,
      sourceMap: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new BowerWebpackPlugin({
    //   searchResolveModulesDirectories: false
    // }),
    new webpack.NoErrorsPlugin(),
    new defaultSettings.ExtractTextPlugin('styles.css')
  ],
  module: defaultSettings.getDefaultModules()
})

// Add needed loaders to the defaults here
// 开发环境需要的 loaders
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'react-hot-loader!babel-loader'
  // include: [].concat(
  //   config.additionalPaths,
  //   [ path.join(__dirname, '/../src') ]
  // )
});

module.exports = config;
