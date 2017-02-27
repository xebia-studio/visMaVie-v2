const assert = require('assert');

const shelljs = require('shelljs');

const report = require('@alexistessier/report');

const argv = require('../argv');

assert(typeof argv.bucket === 'string' && argv.bucket.length,
`You must provide a bucket name via the --bucket option (example :
	node deploy --bucket="s3://project-bucket/"
)`);

const bucket = argv.bucket;
const bucketARN = `s3://${bucket}/`;

const allowBot = (argv.allowbot === true);

const ignoreBuild = (argv.ignoreBuild === true);

const execute = (argv.execute === true);

if (!execute) {
	report('warning', 'You must use the --execute option to really run the command. Without --execute option, the commands only will be logged');
}

const shell = {
	exec: function shellExec(cmd, force = false) {
		const sep = '--------------------';
		report('notice', '\n'+sep+'\n'+cmd);
		if(execute || force) {
			shelljs.exec(cmd)
		}
		report('notice', sep)
	}
};

module.exports = {
	shell,
	argv,
	bucket,
	bucketARN,
	allowBot,
	ignoreBuild
}