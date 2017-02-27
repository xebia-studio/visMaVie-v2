const path = require('path');
const glob = require('glob');

const { upperFirst, camelCase } = require('lodash');

const svgComponents = {};

const bulletBlueList = glob.sync(
	path.join(
		path.dirname(require.resolve('assets/images/svg/bullet-blue-1.svg')),
		'bullet-blue-*.svg'
));

bulletBlueList.forEach(filePath => {
	const basename = path.basename(filePath, '.svg');
	svgComponents[upperFirst(camelCase(basename))] = path.join('assets/images/svg/'+basename+'.svg');
})

module.exports = {
	svgComponents
}