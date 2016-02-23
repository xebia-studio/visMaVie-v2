'use strict';

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
    appCSS
  ],
  output: {
    path: path.resolve(DIRNAME, "dist"),
    publicPath: '/',
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
      { test: /\.html$/, loader: "html-loader"},
      { test: /\.(png|jpg|gif)$/, loader: "file-loader?name=img/[name].[ext]"},
      { test: /\.css$/, exclude:'/app/', loader: vendorCSS.extract(['css']) },
      { test: /\.less$/, exclude:'/node_modules/', loader: appCSS.extract(['css', 'less']) },

      // Bootstrap 4
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }
    ]
  }
};