routes.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function routes($urlRouterProvider, $locationProvider, $stateProvider){
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');

  // Defining the routes here
  $stateProvider.state('home', {
    url: '/home',
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

  $stateProvider.state('yourDebut', {
     url: '/yourDebut',
     template: require('./pages/yourDebut/yourDebut.tpl.html'),
     controller: 'YourDebutController as yourDebut'
  });

  $stateProvider.state('showcase', {
    url: '/showcase',
    template: require('./pages/componentsShowcase/componentsShowcase.tpl.html')
  });
}