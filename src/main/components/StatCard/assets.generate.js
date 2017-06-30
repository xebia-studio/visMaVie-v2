const path = require('path');
const { upperFirst, camelCase, uniq } = require('lodash');

const svgComponents = {};

uniq([
	...require('data/about/quelques-chiffres.json').data,
	...require('data/nos-creations/partager-connaissance.json').data
].map(stat => stat.picto)).forEach(picto => {
	svgComponents[upperFirst(camelCase(picto))] = path.join('assets/images/svg', picto+'.svg');
});

module.exports = {
	svgComponents
}