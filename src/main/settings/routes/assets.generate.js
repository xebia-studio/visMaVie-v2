const path = require('path');
const forEachPage = require('./for-each-simple-page');

const imagesToBlur = [];

function imagePath(src) {
	return path.join('assets/images', src);
}

forEachPage(([pagePath, page]) => {
	imagesToBlur.push(
		imagePath(page.image.default),
		imagePath(page.image.mobile)
	)
});

module.exports = {
	images: imagesToBlur,
	blurImages: imagesToBlur
}