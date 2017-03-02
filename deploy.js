const report = require('@alexistessier/report');

const {
	shell,
	allowBot,
	ignoreBuild,
	ignoreGenerateSources,
	sshIdentifier,
	sshDirectory,
	sshDirectorySiteRoot
} = require('./deployment/script-options');

/*------------------------*/
report('notice', '-- start deployment script --');
/*------------------------*/

if (!ignoreGenerateSources) {
	shell.exec('rm -rf src/generated && npm run create-generated-sources', true);
}

if (!ignoreBuild) {
	shell.exec('rm -rf dist && npm run build', true);
}

//Copy robots.txt to the dist if necessary
if (!allowBot) {
	shell.exec(`test -d dist || mkdir -p dist && cp robots.txt dist/robots.txt`, true);
}

const sshTarget = `${sshDirectory}:${sshDirectorySiteRoot}`;

report('notice', `-- start deployment on ${sshTarget} --`);

shell.exec(`rsync -avhzr -e ssh ./dist/ ${sshIdentifier}@ssh.${sshTarget} --delete`);

report('success', `-- deployment script done on ${sshTarget} --`);