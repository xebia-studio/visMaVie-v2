// const path = require('path');
// const appModulePath = require('app-module-path');

// appModulePath.addPath(path.join(__dirname, '../src'));
// appModulePath.addPath(path.join(__dirname, '../src/main'));

// const appRoutes = require('settings/routes/app-routes');

// const expertisesRoutesList = require('settings/routes/expertises-routes-list');

// const excludeRoutes = [];

// let prerenderedRoutes = [];

// const hook = {
// 	expertise: function () {
// 		expertisesRoutesList.forEach(route => {
// 			prerenderedRoutes.push('/'+route);
// 		})
// 	}
// }

// appRoutes.filter(route => ( excludeRoutes.indexOf(route.name) === -1 )
// ).forEach(route => {
// 	hook[route.name] ? hook[route.name](route.path) : prerenderedRoutes.push(route.path);
// });

const prerenderedRoutes = [];

module.exports = prerenderedRoutes;