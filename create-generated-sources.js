var path = require('path');
var generateStyles = require('xebia-web-common/scripts/generate-generic-styles');
var generateImages = require('xebia-web-common/scripts/generate-images');

// Generic settings

generateStyles({
  settingsFiles : [
    path.join(__dirname, 'src/main/settings/colors.js'),
    path.join(__dirname, 'src/main/settings/components.js'),
    path.join(__dirname, 'src/main/settings/layout.js'),
    path.join(__dirname, 'src/main/settings/fonts-sizes.js')
  ],
  outputPath: path.join(__dirname, 'src/generated/settings')
});

generateImages({
  inputPath: path.join(__dirname, './src/main/assets/images/svg'),
  toolsOutputPath: path.join(__dirname, './src/generated/tools/svgComponent.styl'),
  outputPath: path.join(__dirname, './src/generated/components'),
  sizeAliases: require(path.join(__dirname, './src/main/assets/images/svg/size-aliases.js'))
});

// Special settings

var sourcesGenerators = [
	path.join(__dirname, 'generate-modernizr.js'),
	path.join(__dirname, 'generate-fonts.js'),
];

for(var i = 0, imax = sourcesGenerators.length; i < imax; i++){
    require(sourcesGenerators[i]);
}


