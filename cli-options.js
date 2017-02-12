const argv = require('minimist')(process.argv.slice(2));
const includes = require('lodash/includes');

const options = {
  noBlurryImage: includes(argv._, 'noBlurryImage')
};

module.exports = options;
