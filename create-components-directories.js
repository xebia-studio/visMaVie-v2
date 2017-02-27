const path = require('path');
const fs = require('fs');

const glob = require('glob');

const report = require('@alexistessier/report')

const saveFile = require('xebia-web-common/scripts/save-file');

const options = require('./cli-options');

const rawFiles = [
	...glob.sync(path.join(__dirname, 'src/main/components/*.vue')),
	...glob.sync(path.join(__dirname, 'src/main/components/*.js'))
];

const componentsDirectories = glob.sync(path.join(__dirname, 'src/main/components/*')).filter(dir => {
	return rawFiles.indexOf(dir) === -1;
});

componentsDirectories.forEach(dir => {
	const componentName = path.basename(dir);
	const indexJsFile = path.join(dir, 'index.js');
	const indexVueFile = path.join(dir, 'index.vue');

	const indexJsExists = fs.existsSync(indexJsFile);

	if(!fs.existsSync(indexVueFile) || options.override) {
		if (indexJsExists) {
			const indexJsContent = fs.readFileSync(indexJsFile, {encoding: 'utf-8'});

			saveFile({
				path: indexVueFile,
				content: (
`<script>
//this file was generated from ${__dirname}/${__filename}, don't override it
${indexJsContent}
</script>
`			
				)
			})
		}
		else{
			saveFile({
				path: indexVueFile,
				content: (
`<script>
//this file was generated from ${__dirname}/${__filename}, don't override it
export default require('./${componentName}');
</script>
`			
				)
			})
		}
	}

	if (options.removeExistingIndex && indexJsExists) {
		fs.unlink(indexJsFile, err => {
			report('warning', 'File deleted at path '+indexJsFile);
		});
	}
})