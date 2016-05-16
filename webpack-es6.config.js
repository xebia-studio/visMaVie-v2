'use strict';

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
let CopyWebpackPlugin = require('copy-webpack-plugin');

const DIRNAME = __dirname;

let vendorCSS = new ExtractTextPlugin('styles/vendor.css');
let appCSS = new ExtractTextPlugin('styles/app.css');

export default {
  context: DIRNAME,
  entry: [
    path.join(DIRNAME, 'app', 'app.js')
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    vendorCSS,
    appCSS,
    new CopyWebpackPlugin([{
      from: 'assets',
      to: 'assets'
    }])
  ],
  output: {
    path: path.resolve(DIRNAME, "dist"),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].woff"},
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].woff2"},
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].ttf"},
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].eot"},
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].svg"},
      { test: /\.html$/, loader: "html-loader"},
      { test: /\.(png|jpg|gif)$/, loader: "file-loader?name=img/[name].[ext]"},
      { test: /\.css$/, exclude:'/app/', loader: vendorCSS.extract(['css']) },
      { test: /\.less$/, exclude:'/node_modules/', loader: appCSS.extract(['css', 'less']) }
    ]
  }
};