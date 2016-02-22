'use strict';

import webpack from 'webpack';
import path from 'path';

const DIRNAME = __dirname;

export default {
  context: DIRNAME,
  entry: [
    path.join(DIRNAME, 'app', 'app.js')
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(DIRNAME, "dist"),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.css$/, loaders: [ 'style', 'css', 'resolve-url'] },
      { test: /\.scss$/, loaders: [ 'style', 'css', 'resolve-url', 'sass?sourceMap'] },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
      { test: /\.html$/, loader: "html-loader"},
      { test: /\.(png|jpg|gif)$/, loader: "file-loader?name=img/[name].[ext]"},

      // Bootstrap 4
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }
    ]
  }
};