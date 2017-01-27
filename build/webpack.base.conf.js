'use strict';

const path = require('path');
const config = require('../config');
const utils = require('./utils');
const projectRoot = path.resolve(__dirname, '../');

const env = process.env.NODE_ENV;
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
const cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
const cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports = {
  entry: {
    app: './src/main/root.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/main/assets'),
      'components': path.resolve(__dirname, '../src/main/components'),
      'settings': path.resolve(__dirname, '../src/main/settings'),
      'generic': path.resolve(__dirname, '../src/main/generic'),
      'tools': path.resolve(__dirname, '../src/main/tools')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      "xebia-data": path.join(__dirname, "../node_modules/xebia-web-common/xebia-data-loader")
    }
  },
  module: {
    loaders: [
      {
        test: /.vue$/,
        loader: 'vue'
      },
      {
        test: /\.yaml$/,
        loader: 'xebia-data!json!yaml'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules(?!\/xebia-web-common)/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap })
  },
  stylus: {
    use: [require('nib')()],
    import: [
      '~src/main/tools/index.styl'
    ]
  },
  'xebia-data': {
    svgComponentBasePath: './src/main/tools/svg-component'
  }
};
