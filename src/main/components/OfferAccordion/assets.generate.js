const path = require('path');
const glob = require('glob');

const { upperFirst, camelCase } = require('lodash');

const svgComponents = {
	IconCircledArrowDown: 'assets/images/svg/icon-circled-arrow-down.svg'
};

const bulletList = [
	...glob.sync(
		path.join(
			path.dirname(require.resolve('assets/images/svg/bullet-blue-1.svg')),
			'bullet-blue-*.svg'
	)),
	...glob.sync(
		path.join(
			path.dirname(require.resolve('assets/images/svg/bullet-transparent-orange-1.svg')),
			'bullet-transparent-orange-*.svg'
	)),
	...glob.sync(
		path.join(
			path.dirname(require.resolve('assets/images/svg/bullet-transparent-white-1.svg')),
			'bullet-transparent-white-*.svg'
	))
];

bulletList.forEach(filePath => {
	const basename = path.basename(filePath, '.svg');
	svgComponents[upperFirst(camelCase(basename))] = path.join('assets/images/svg/'+basename+'.svg');
})

module.exports = {
	svgComponents
}