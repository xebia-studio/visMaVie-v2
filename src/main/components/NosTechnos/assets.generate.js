const path = require('path');
const readYaml = require('read-yaml');

const { upperFirst, camelCase } = require('lodash');

const svgComponents = {};

readYaml.sync(require.resolve('data/nous-rejoindre/technos.yaml')).technos.forEach(techno => {
	svgComponents[upperFirst(camelCase(techno))] = path.join('assets/images/svg', techno+'.svg');
});

module.exports = {
	svgComponents
}