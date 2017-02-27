import {get, isUndefined, concat, includes, keys, kebabCase} from 'lodash';

import App from 'components/App';
import annonces from 'data/nous-rejoindre/annonces.yaml';

function isAValidJob(job) {
  return includes(keys(annonces).map((jobKey) => kebabCase(jobKey)), job);
}

const routes = concat(
	[
		{
			name: 'home',
			path: '/',
			component: resolve => require(['components/Home_page'], resolve),
      beforeEnter: (to, from, next) => {
        const title = document.querySelector('title');
        title.innerHTML = 'Vis Ma Vie - Xebia France';
        next();
      }
		},
    {
      name : 'creations',
      path : '/creations',
      component : resolve => require(['components/NosCreations_page'], resolve),
      beforeEnter: (to, from, next) => {
        const title = document.querySelector('title');
        title.innerHTML = 'Vis Ma Vie - Nos créations';
        next();
      }
    },
    {
      name : 'integration',
      path : '/integration',
      component : resolve => require(['components/VotreIntegration_page'], resolve),
      beforeEnter: (to, from, next) => {
        const title = document.querySelector('title');
        title.innerHTML = 'Vis Ma Vie - Votre intégration';
        next();
      }
    },
    {
      name : 'nous-rejoindre',
      path : '/nous-rejoindre/:job?',
      component : resolve => require(['components/NousRejoindre_page'], resolve),
      beforeEnter : (to, from, next) => {
        const jobParam = get(to, 'params.job');
        const title = document.querySelector('title');
        title.innerHTML = 'Vis Ma Vie - Nous rejoindre';
        return (isUndefined(jobParam) || isAValidJob(jobParam))
          ? next()
          : next('/nous-rejoindre/');
      },
    }
  ]
);

module.exports = [
	{
		path:'/',
		component: App,
		children : routes
	}
];
