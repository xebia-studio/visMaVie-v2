const genericPageRoutes = require('generated/settings/routes');

import {get, isUndefined, concat, includes} from 'lodash';

const jobRoutesList = require('./job-routes-list');

function isAValidJob(job) {
  return includes(jobRoutesList, job);
}

module.exports = concat(
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
    ...genericPageRoutes,
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
