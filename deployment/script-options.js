const assert = require('assert');

const shelljs = require('shelljs');

const report = require('@alexistessier/report');

const argv = require('../argv');

const currentBranchName = require('git-repo-info')().branch;

const env = argv['env'];

assert(typeof env === 'string' && env.length,
`You must define the env of deployment via the --env option (example :
	node deploy --env=production
)`);

assert(env === currentBranchName,
`You try to deploy on ${env} from the branch ${currentBranchName}. Checkout the ${env} branch.
`)

const sshDirectory = argv['ssh-directory'];
const sshIdentifier = argv['ssh-identifier'];
const sshDirectorySiteRoot = argv['ssh-directory-site-root'];

assert(typeof sshDirectory === 'string' && sshDirectory.length,
`You must provide a ssh directory via the --ssh-directory option (example :
	node deploy --ssh-directory="xxxx0.xxx.xxx.xx"
)`);

assert(typeof sshIdentifier === 'string' && sshIdentifier.length,
`You must provide a ssh identifier via the --ssh-identifier option (example :
	node deploy --ssh-identifier="xxxxxx"
)`);

assert(typeof sshDirectorySiteRoot === 'string' && sshDirectorySiteRoot.length,
`You must provide a ssh directory site root via the --ssh-directory-site-root option (example :
	node deploy --ssh-directory-site-root="www"
)`);

function isActive(option) {
	const optionsList = argv._ || [];
	return (argv[option] === true) || (optionsList.indexOf('--'+option) >= 0);
}

const allowBot = isActive('allow-bot')

const ignoreGenerateSources = isActive('ignore-generate-sources');

const ignoreBuild = isActive('ignore-build');

const execute = isActive('execute');

if (!execute) {
	report('warning', 'You must use the --execute option to really run the command. Without --execute option, the commands will only be logged');
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
	env,
	argv,
	allowBot,
	ignoreGenerateSources,
	ignoreBuild,
	sshDirectory,
	sshIdentifier,
	sshDirectorySiteRoot
}