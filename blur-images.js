const path = require('path');
const _ = require('lodash');

const blurImages = require('xebia-web-common/scripts/blur-images');

function imagePath(imageName) {
  return path.join(__dirname, './src/main/assets/images', imageName);
}

const outputDirectory = path.join(__dirname, './src/generated/assets/images/blur');

const imagesToBlur = [];

/*---------------------------*/
/* Blur simple pages headers */
/*---------------------------*/
const pagesToBlur = ['nous-rejoindre', 'home', 'votre-integration', 'nos-creations'];

_.forEach(pagesToBlur, page => {
  const header = require(`./src/main/assets/data/${page}/header.json`);
  imagesToBlur.push(imagePath(header.image.default), imagePath(header.image.mobile));
});

blurImages(_.uniq(imagesToBlur), outputDirectory);
