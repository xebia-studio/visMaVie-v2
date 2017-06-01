'use strict';

const path = require('path');
const config = require('../config');
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin');

const routesToPrerender = require('../config/prerendered-routes');

const currentBranchName = require('../branchname');

const env = config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.distDirectory,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.join(config.build.distDirectory, 'index.html'),
      template: 'index.html',
      inject: 'head',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: 'src/main/assets/images/favicon/favicon.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'icons-[hash]/',
      // Emit all stats of the generated icons
      emitStats: true,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#ff6444',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'Vis ma vie'
    }),
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'defer'
    // }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('xebia-web-common') < 0 &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new PrerenderSpaPlugin(
      config.build.distDirectory,
      routesToPrerender,
      {
        //captureAfterDocumentEvent: 'prerender-page',
        captureAfterTime: 5000,
        maxAttempts: 10,

        postProcessHtml: function (context) {
          return context.html.replace('class="js', 'class="no-js').replace(
            /http(s?):\/\/localhost:([0-9]*)\//g,
            config.host[currentBranchName]+'/'
          )
          .replace('<div id="sizeClassHelper_screenFrame" style="z-index:-120;display:block;position:fixed;top:0;left:0;width:100%;height:100%;"></div>', '')
          .replace('<script async="" src="https://www.google-analytics.com/analytics.js"></script>', '')
          .replace('<script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>', '');
        }
      }
    ),
    new ImageminPlugin({
      jpegtran: {
        progressive: true
      },
      pngquant: {
        quality: '65-90',
        speed: 4
      }
    })
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path][query].gz',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

module.exports = webpackConfig;
