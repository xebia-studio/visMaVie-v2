const path = require('path');

const timelineItems = require('data/home/timeline-items.json').data;

const svgComponents = {};

const { upperFirst, camelCase } = require('lodash');

timelineItems.forEach(({image}) => {
	svgComponents[upperFirst(camelCase(image))] = path.join('assets/images/svg', image+'.svg');
})

module.exports = {
	svgComponents
}