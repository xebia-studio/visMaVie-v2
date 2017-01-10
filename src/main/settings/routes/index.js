import App from 'components/App'
import { concat } from 'lodash'

const routes = concat(
	[
		{
			name: 'home',
			path: '/',
			component: resolve => require(['components/Tester.vue'], resolve)
		}
	],
	require('./test-block')
);

module.exports = [
	{
		path:'/',
		component: App,
		children : routes
	}
]
