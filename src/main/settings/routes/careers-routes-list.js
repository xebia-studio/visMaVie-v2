const carrieres = require('../../data/carriere/$settings.json').carrieres;

const carrieresRoutesList = [];
for(const carriere in carrieres){
	carrieresRoutesList.push('carriere/'+carrieres[carriere].url)
}

module.exports = carrieresRoutesList;