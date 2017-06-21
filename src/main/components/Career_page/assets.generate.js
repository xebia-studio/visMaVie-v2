const path = require('path');
const {uniq, camelCase, upperFirst} = require('lodash');

const imagesToBlur = [];

function imagePath(imageName) {
  return path.join('assets/images', imageName);
}

const header = require(`data/carriere/header.json`);
imagesToBlur.push(imagePath(header.image.default), imagePath(header.image.mobile));

const careers = require('data/carriere/$settings.json').carrieres;
const profilePhotos = uniq(Object.keys(careers).map(key => careers[key]).map(career => imagePath(career.photo)));

const svgComponents = {
	ArrowBottom: 'assets/images/svg/arrow-bottom.svg'
};

uniq(Object.keys(careers)).map(key => careers[key]).forEach(career => {
	if (career.passions) {
		career.passions.forEach(passion => {
			svgComponents[upperFirst(camelCase(passion))] = 'assets/images/svg/'+passion+'.svg'
		})
	}
});

module.exports = {
	images: [...imagesToBlur, ...profilePhotos],
	blurImages: imagesToBlur,
	svgComponents
}