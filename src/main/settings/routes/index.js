import App from 'components/App';

const routes = require('./app-routes');

module.exports = [
	{
		path:'/',
		component: App,
		children : routes
	}
];
