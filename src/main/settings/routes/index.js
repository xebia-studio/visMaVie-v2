import {get, isUndefined, concat, includes, keys, kebabCase} from 'lodash';

import App from 'components/App';
import annonces from 'assets/data/nous-rejoindre/annonces.yaml';

function isAValidJob(job) {
  return includes(keys(annonces).map((jobKey) => kebabCase(jobKey)), job);
}

const routes = concat(
	[
		{
			name: 'home',
			path: '/',
			component: resolve => require(['components/pages/Home/Home.vue'], resolve)
		},
    {
      name : 'creations',
      path : '/creations',
      component : resolve => require(['components/pages/NosCreations/NosCreations.vue'], resolve)
    },
    {
      name : 'integration',
      path : '/integration',
      component : resolve => require(['components/pages/VotreIntegration/VotreIntegration.vue'], resolve)
    },
    {
      name : 'nous-rejoindre',
      path : '/nous-rejoindre/:job?',
      component : resolve => require(['components/pages/NousRejoindre/NousRejoindre.vue'], resolve),
      beforeEnter : (to, from, next) => {
        const jobParam = get(to, 'params.job');
        return (isUndefined(jobParam) || isAValidJob(jobParam))
          ? next()
          : next('/nous-rejoindre/');
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
