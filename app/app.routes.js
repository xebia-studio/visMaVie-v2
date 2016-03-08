routes.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function routes($urlRouterProvider, $locationProvider, $stateProvider){
  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  // Defining the routes here
  $stateProvider.state('home', {
    url: '/',
    template: require('./pages/home/home.tpl.html'),
    controller: 'HomeController as home'
  });
  
  $stateProvider.state('boostYourCareer', {
     url: '/boostYourCareer',
     template: require('./pages/boostYourCareer/boostYourCareer.tpl.html'),
     controller: 'BoostYourCareerController as boostYourCareer'
  });

  $stateProvider.state('join', {
     url: '/join',
     template: require('./pages/joinUs/joinUs.tpl.html'),
     controller: 'JoinUsController as join'
  });

  $stateProvider.state('creations', {
     url: '/creations',
     template: require('./pages/ourCreations/ourCreations.tpl.html'),
     controller: 'CreationsController as creations'
  });

  $stateProvider.state('passions', {
     url: '/ourPassions',
     template: require('./pages/ourPassions/ourPassions.tpl.html'),
     controller: 'OurPassionsController as passions'
  });

  $stateProvider.state('values', {
     url: '/values',
     template: require('./pages/ourValues/ourValues.tpl.html'),
     controller: 'OurValuesController as values'
  });

  $stateProvider.state('visit3D', {
     url: '/visit3D',
     template: require('./pages/visit3D/visit3D.tpl.html'),
     controller: 'Visit3DController as visit3D'
  });
}