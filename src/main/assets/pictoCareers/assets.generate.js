const path = require('path')

const { upperFirst, camelCase } = require('lodash');

const svgComponents = {};

const carrieres = require('data/carriere/$settings.json').carrieres;

for(const key in carrieres){
	const carriere = carrieres[key];
	const svg_picto = carriere.svg_picto;
	if (svg_picto) {
		svgComponents[upperFirst(camelCase(svg_picto))] = path.join('assets', 'images', 'svg', svg_picto+'.svg');
	}
}

module.exports = {
	svgComponents
}