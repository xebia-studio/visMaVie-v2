const genericPageRoutes = require('generated/settings/routes');

const {get, isUndefined, concat, includes} = require('lodash');

const jobRoutesList = require('./job-routes-list');
const careersRoutesList = require('./careers-routes-list');

function isAValidJob(job) {
  return includes(jobRoutesList, job);
}

function random(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
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
      name : 'carrieres',
      path : '/carriere',
      component: { template: "<div></div>" },
      beforeEnter: (to, from, next) => {
        if (window.navigator && (/PhantomJS/.test(window.navigator.userAgent))) {
          next('/'+careersRoutesList[0]);
          return;
        }

        const availableCareersRoutesList = careersRoutesList.filter(expertise => {
          return expertise !== from.path.replace('/', '');
        });

        next('/'+availableCareersRoutesList[random(0, availableCareersRoutesList.length - 1)])
      }
    },
    {
      name : 'carriere',
      path : '/carriere/:career',
      component : resolve => require(['components/Career_page'], resolve),
      beforeEnter: (to, from, next) => {
        next();
      }
    },
    {
      name : 'a-propos',
      path : 'a-propos',
      component : resolve => require(['components/About_page'], resolve),
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
