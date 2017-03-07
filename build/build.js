// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
env.NODE_ENV = 'production'

const path = require('path')
const config = require('../config')
const ora = require('ora')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

const currentBranchName = require('../branchname');

if (!config.host[currentBranchName]) {
  throw new Error(`Please define the host for the branch "${currentBranchName}", in config/index.js`);
}

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

const spinner = ora('building for production...')
spinner.start()

const assetsPath = path.join(config.build.distDirectory, config.build.assetsSubDirectory)
rm('-rf', config.build.distDirectory)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  if (stats.compilation.warnings.length) {
    throw stats.compilation.warnings[0];
  }

  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
