const path = require('path');

const imagesToBlur = [];

function imagePath(imageName) {
  return path.join('assets/images', imageName);
}

const header = require(`data/home/header.json`);
imagesToBlur.push(imagePath(header.image.default), imagePath(header.image.mobile));

module.exports = {
	blurImages: imagesToBlur,
	svgComponents: {
		LogoXebiaVisMaVie: imagePath('svg/logo-xebia-vis-ma-vie.svg')
	}
}