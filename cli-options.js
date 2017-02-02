var argv = require('minimist')(process.argv.slice(2));
var includes = require('lodash/includes');

var options = {
  noBlurryImage: includes(argv._, "noBlurryImage")
}

module.exports = options;