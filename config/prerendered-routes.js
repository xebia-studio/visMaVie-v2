const path = require('path');
const appModulePath = require('app-module-path');

appModulePath.addPath(path.join(__dirname, '../src'));
appModulePath.addPath(path.join(__dirname, '../src/main'));

const appRoutes = require('settings/routes/app-routes');

const jobRoutesList = require('settings/routes/job-routes-list');
const careersRoutesList = require('settings/routes/careers-routes-list');

const excludeRoutes = [];

let prerenderedRoutes = [];

const hook = {
	['nous-rejoindre']: function () {
		prerenderedRoutes.push('/nous-rejoindre');
		jobRoutesList.forEach(route => {
			prerenderedRoutes.push('/nous-rejoindre/'+route);
		})
	},
	['carriere']: function () {
		prerenderedRoutes.push('/carriere');
		careersRoutesList.forEach(route => {
			prerenderedRoutes.push('/'+route);
		})
	}
}

appRoutes.filter(route => ( excludeRoutes.indexOf(route.name) === -1 )
).forEach(route => {
	hook[route.name] ? hook[route.name](route.path) : prerenderedRoutes.push(route.path);
});

module.exports = prerenderedRoutes;