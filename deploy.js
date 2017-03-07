const report = require('@alexistessier/report');

const {
	shell,
	env,
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
	shell.exec('npm run build', true);
}

//Copy robots.txt to the dist if necessary
if (!allowBot) {
	shell.exec(`test -d dist/${env} || mkdir -p dist/${env} && cp robots.txt dist/${env}/robots.txt`, true);
}

//move root-files to dist
const glob = require('glob');
const path = require('path');

shell.exec(`cp -r root-files/${env}/hidden-files/ dist/${env}`, true);
shell.exec(`rm dist/${env}/.DS_Store`, true);

glob.sync(`root-files/${env}/*.*`).forEach(rootFile => {
	const fileName = path.basename(rootFile);
	shell.exec(`cp ${rootFile} dist/${env}/${fileName}`, true);
});

const sshTarget = `${sshDirectory}:${sshDirectorySiteRoot}`;

report('notice', `-- start deployment on ${sshTarget} --`);

shell.exec(`rsync -avhzr -e ssh ./dist/${env}/ ${sshIdentifier}@ssh.${sshTarget} --delete`);

report('success', `-- deployment script done on ${sshTarget} --`);