const path = require('path');
const generateStyles = require('xebia-web-common/scripts/generate-generic-styles');
const generateImages = require('xebia-web-common/scripts/generate-images');

const cliOptions = require('./cli-options');

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

const sourcesGenerators = [
	path.join(__dirname, 'generate-modernizr.js'),
	path.join(__dirname, 'generate-fonts.js'),
];

for(let i = 0, imax = sourcesGenerators.length; i < imax; i++){
    require(sourcesGenerators[i]);
}

if (!cliOptions.noBlurryImage) {
  require('./blur-images');
}


