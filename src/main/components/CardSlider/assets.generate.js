const path = require('path');
const { upperFirst, camelCase, uniq } = require('lodash');

const svgComponents = {};

uniq(require('data/nos-creations/projets-varies.json').data.map(projet => projet.image)
).forEach(picto => {
	svgComponents[upperFirst(camelCase(picto))] = path.join('assets/images/svg', picto+'.svg');
});

module.exports = {
	svgComponents
}