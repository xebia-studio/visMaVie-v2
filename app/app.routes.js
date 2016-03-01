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
     url: '/joinUs',
     template: require('./pages/joinUs/joinUs.tpl.html'),
     controller: 'JoinUsController as join'
  });

}