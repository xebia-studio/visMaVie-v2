import App from 'components/App'
import { concat } from 'lodash'

const routes = concat(
	[
		{
			name: 'home',
			path: '/',
			component: resolve => require(['components/Home_page.vue'], resolve)
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