var argv = require('./argv');

var options = Object.assign({}, require('xebia-web-common/cli-options'), {
	//create-components-directories options
	override: argv._ ? (argv._.indexOf("override") >= 0) : false,
	removeExistingIndex: argv._ ? (argv._.indexOf("removeExistingIndex") >= 0) : false
});

module.exports = options;