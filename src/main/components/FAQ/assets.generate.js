const path = require('path');
const glob = require('glob');

const { upperFirst, camelCase } = require('lodash');

const svgComponents = {
	IconCircledArrowUp: 'assets/images/svg/icon-circled-arrow-up.svg',
	IconCircledArrowDown: 'assets/images/svg/icon-circled-arrow-down.svg'
}

const bulletTransparentList = glob.sync(
	path.join(
		path.dirname(require.resolve('assets/images/svg/bullet-transparent-white-1.svg')),
		'bullet-transparent-white-*.svg'
));

bulletTransparentList.forEach(filePath => {
	const basename = path.basename(filePath, '.svg');
	svgComponents[upperFirst(camelCase(basename))] = path.join('assets/images/svg/'+basename+'.svg');
})

module.exports = {
	svgComponents
}