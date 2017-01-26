import App from 'components/App'
import { concat, includes, keys, kebabCase } from 'lodash'

import annonces from 'assets/data/nous-rejoindre/annonces.yaml'

const routes = concat(
	[
		{
			name: 'home',
			path: '/',
			component: resolve => require(['components/Tester.vue'], resolve)
		},
    {
      name: 'nous-rejoindre',
      path: '/nous-rejoindre/:job?',
      component: resolve => require(['components/NousRejoindre.vue'], resolve),
      beforeEnter: (to, from, next) => {
        if ( to.params.job === undefined || includes(keys(annonces).map((jobKey) => kebabCase(jobKey)), to.params.job) ) {
          next();
        } else {
          next('/nous-rejoindre/');
        }
      },
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
];
