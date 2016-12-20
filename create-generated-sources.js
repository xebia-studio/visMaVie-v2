var path = require('path');

var sourcesGenerators = [
	path.join(__dirname, 'generate-images.js'),
	path.join(__dirname, 'generate-modernizr.js'),
	path.join(__dirname, 'generate-colors.js'),
	path.join(__dirname, 'generate-fonts.js'),
	path.join(__dirname, 'generate-components-settings.js')
];

for(var i = 0, imax = sourcesGenerators.length; i < imax; i++){
	require(sourcesGenerators[i]);
}