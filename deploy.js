const fs = require('fs');
const path = require('path');
const assert = require('assert');

const glob = require('glob');
const isGzip = require('is-gzip');

const report = require('@alexistessier/report');

const {
	shell,
	bucket,
	bucketARN,
	allowBot,
	ignoreBuild
} = require('./aws/script-options');

/*------------------------*/
report('notice', '-- start deployment script --');
/*------------------------*/

if (!ignoreBuild) {
	shell.exec('npm run build', true);
}

const cacheMaxAge = 259200;
const cache = `--cache-control 'max-age=${cacheMaxAge}'`;

//create the gzip-dist directory
let gzipCommand = '';
let notGzippedCommand = '';

(()=>{
	const gzipped = [
		...glob.sync(path.join(__dirname, 'dist/static/js/*.gz')),
		...glob.sync(path.join(__dirname, 'dist/static/css/*.gz'))
	];

	const notGzipped = [
		...glob.sync(path.join(__dirname, 'dist/static/js/*.js')),
		...glob.sync(path.join(__dirname, 'dist/static/css/*.css'))
	].filter(filePath => {
		return gzipped.indexOf(filePath+'.gz') < 0;
	}).map(filePath => path.basename(filePath));

	//create gzip-dist directory and put gzipped files in
	const gzippedBasenames = [];
	if (gzipped.length) {
		shell.exec(`test -d gzip-dist || mkdir -p gzip-dist`);
		shell.exec(`test -d gzip-dist/static || mkdir -p gzip-dist/static`);
		shell.exec(`test -d gzip-dist/static/js || mkdir -p gzip-dist/static/js`);
		shell.exec(`test -d gzip-dist/static/css || mkdir -p gzip-dist/static/css`);

		gzipped.forEach(filePath => {
			let fileType;
			if(filePath.indexOf('dist/static/js/') >= 0){
				fileType = 'js';
			}
			else if(filePath.indexOf('dist/static/css/') >= 0){
				fileType = 'css';
			}

			assert(fileType === 'css' || fileType === 'js', 'gzipped files must be .js or .css only');

			const fileBasename = path.basename(filePath, '.gz');

			gzippedBasenames.push(fileBasename);

			shell.exec(`cp ${filePath} gzip-dist/static/${fileType}/${fileBasename}`);
		})
	}

	//create the commands to upadte the gzip files
	const baseOptions = [
		"--exclude '*'",
		"--region eu-central-1",
		cache
	];

	function baseCommand(localDist) {
		return [
			`aws s3 sync ${localDist} ${bucketARN}`, ...baseOptions
		].join(' ')
	};

	gzipCommand = [ baseCommand('gzip-dist'), '--content-encoding "gzip"', ...gzippedBasenames.map(include)
	].join(' ');

	notGzippedCommand = [ baseCommand('dist'), ...notGzipped.map(include)
	].join(' ');

	function include(fileName) {
		return '--include "**/'+fileName+'"';
	}
})();

//Copy robots.txt to the dist if necessary
if (!allowBot) {
	shell.exec(`test -d dist || mkdir -p dist && cp robots.txt dist/robots.txt`);
}

report('notice', `-- start deployment on ${bucketARN} --`);

//remove the old files from s3 bucket
shell.exec(`aws s3 rm ${bucketARN} --recursive --region eu-central-1`);

//sync the bucket policy
shell.exec(`aws s3api put-bucket-policy --bucket ${bucket} --policy file://aws/${bucket}/bucket-policy.json --region eu-central-1`);

//sync the file which are not gzipped or cached
shell.exec(`aws s3 sync dist ${bucketARN} --exclude '*' --include '*.html' --include '*.txt' --include '*.rtf' --include '*.ico' --include '*.json' --include '*.xml' --region eu-central-1`);

//sync the images
shell.exec(`aws s3 sync dist ${bucketARN} --exclude '*' --include '*.jpg' --include '*.png' --include '*.svg' ${cache} --region eu-central-1`);

shell.exec(gzipCommand);
shell.exec(notGzippedCommand);

report('success', `-- deployment script done on ${bucketARN} --`);