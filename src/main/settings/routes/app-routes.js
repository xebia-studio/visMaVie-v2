const genericPageRoutes = require('generated/settings/routes');

const {get, isUndefined, concat, includes} = require('lodash');

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
        next();
      }
		},
    {
      name : 'creations',
      path : '/creations',
      component : resolve => require(['components/NosCreations_page'], resolve),
      beforeEnter: (to, from, next) => {
        next();
      }
    },
    {
      name : 'integration',
      path : '/integration',
      component : resolve => require(['components/VotreIntegration_page'], resolve),
      beforeEnter: (to, from, next) => {
        next();
      }
    },
    {
      name : 'valeurs',
      path : '/valeurs',
      component : resolve => require(['components/NosValeurs_page'], resolve),
      beforeEnter: (to, from, next) => {
        next();
      }
    },
    {
      name : 'carriere',
      path : '/carriere',
      component : resolve => require(['components/Career_page'], resolve),
      beforeEnter: (to, from, next) => {
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
        return (isUndefined(jobParam) || isAValidJob(jobParam))
          ? next()
          : next('/nous-rejoindre/');
      },
    }
  ]
);
