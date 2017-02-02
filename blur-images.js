var path = require('path');
var blurImages = require('xebia-web-common/scripts/blur-images');
var readYaml = require('read-yaml');

var _ = require('lodash');

function imagePath(imageName) {
  return path.join(__dirname, './src/main/assets/images', imageName)
}

var outputDirectory = path.join(__dirname, './src/generated/assets/images/blur');

var imagesToBlur = [];

/*---------------------------*/
/* Blur simple pages headers */
/*---------------------------*/
_.forEach(['nous-rejoindre'], function (page) {
  var header = require('./src/main/assets/data/'+page+'/header.json');
  imagesToBlur.push(imagePath(header.image.default), imagePath(header.image.mobile));
});

blurImages(_.uniq(imagesToBlur), outputDirectory);