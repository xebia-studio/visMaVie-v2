const path = require('path');

const images = [];

function imagePath(imageName) {
  return path.join('assets/images', imageName);
}

require(`data/nos-valeurs/sharing-knowledge.json`).facts.forEach(fact => {
	images.push(imagePath(fact.image));
});

module.exports = {
	images
}