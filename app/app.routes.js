routes.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function routes($urlRouterProvider, $locationProvider, $stateProvider){
  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');

  // Defining the routes here
  $stateProvider.state('home', {
    url: '/accueil',
    template: require('./pages/home/home.tpl.html'),
    controller: 'HomeController as home'
  });
  
  $stateProvider.state('boostYourCareer', {
     url: '/carriere',
     template: require('./pages/boostYourCareer/boostYourCareer.tpl.html'),
     controller: 'BoostYourCareerController as career'
  });

  $stateProvider.state('join', {
     url: '/nous-rejoindre',
     template: require('./pages/joinUs/joinUs.tpl.html'),
     controller: 'JoinUsController as join'
  });

  $stateProvider.state('creations', {
     url: '/creations',
     template: require('./pages/ourCreations/ourCreations.tpl.html'),
     controller: 'CreationsController as creations'
  });

  $stateProvider.state('passions', {
     url: '/passions',
     template: require('./pages/ourPassions/ourPassions.tpl.html'),
     controller: 'OurPassionsController as passions'
  });

  $stateProvider.state('values', {
     url: '/valeurs',
     template: require('./pages/ourValues/ourValues.tpl.html'),
     controller: 'OurValuesController as values'
  });

  $stateProvider.state('visit3D', {
     url: '/visite-3D',
     template: require('./pages/visit3D/visit3D.tpl.html'),
     controller: 'Visit3DController as visit3D'
  });

  $stateProvider.state('yourDebut', {
     url: '/integration',
     template: require('./pages/yourDebut/yourDebut.tpl.html'),
     controller: 'YourDebutController as yourDebut'
  });
}