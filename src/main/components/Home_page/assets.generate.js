const path = require('path');

const imagesToBlur = [];

function imagePath(imageName) {
  return path.join('assets/images', imageName);
}

const header = require(`data/home/header.json`);
function blur(src) {
	return {
		src,
		blur: 2
	}
}

imagesToBlur.push(blur(imagePath(header.image.default)), blur(imagePath(header.image.mobile)));

const images = header.consultants.map(consultant => imagePath(consultant.image));

module.exports = {
	images,
	blurImages: imagesToBlur,
	svgComponents: {
		LogoXebiaVisMaVie: imagePath('svg/logo-xebia-vis-ma-vie.svg'),
		ArrowBottom: imagePath('svg/arrow-bottom.svg')
	}
}