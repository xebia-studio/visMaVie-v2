const path = require('path');
const generateStyles = require('xebia-web-common/scripts/generate-generic-styles');

const cliOptions = require('./cli-options');

// Special scripts
for(const scriptPath of [
  path.join(__dirname, 'generate-modernizr.js'),
  path.join(__dirname, 'generate-fonts.js'),
]){
    require(scriptPath);
}

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

require('xebia-web-common/scripts/generate-layers')({
  mainDirectoryPath: path.join(__dirname, 'src/main'),
  generatedDirectoryPath: path.join(__dirname, 'src/generated'),
  layersGeneratorsDirectory: path.join(__dirname, 'layers-generators')
});