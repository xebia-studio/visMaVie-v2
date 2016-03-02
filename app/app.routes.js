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

}