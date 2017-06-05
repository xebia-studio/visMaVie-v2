const path = require('path');

const imagesToBlur = [];

function imagePath(imageName) {
  return path.join('assets/images', imageName);
}

const header = require(`data/carriere/header.json`);
imagesToBlur.push(imagePath(header.image.default), imagePath(header.image.mobile));

module.exports = {
	images: imagesToBlur,
	blurImages: imagesToBlur,
	svgComponents: {
		ArrowBottom: 'assets/images/svg/arrow-bottom.svg'
	}
}