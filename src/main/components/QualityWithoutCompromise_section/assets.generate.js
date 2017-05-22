const path = require('path');

const {upperFirst, camelCase} = require('lodash');

function imagePath(imageName) {
  return path.join('assets/images/svg', imageName+'.svg');
}

const keyPoints = require(`data/nos-valeurs/quality-without-compromise.json`).key_points;

const svgComponents = {};

for(label in keyPoints){
	const icon = keyPoints[label];
	svgComponents[upperFirst(camelCase(icon))] = imagePath(icon);
}

module.exports = {
	svgComponents
}