const path = require('path');

const glob = require('glob');
const readYaml = require('read-yaml');

const simplePages = glob.sync(
    path.join(path.dirname(require.resolve('xebia-web-common/dataset/gdpr')), '*.json')
).map(filePath => [filePath, readYaml.sync(filePath)]);

module.exports = function (callback) {
    simplePages.forEach(callback);
}
