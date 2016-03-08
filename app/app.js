// Expose globals with webpack
import 'expose?jQuery!expose?$!jquery';
import 'expose?angular!angular';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

// Import polyfill for browsers compatibility
import 'babel-polyfill';

// Import modules dependencies here
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import appDirectives from './components/directives/directives.module';
import appFilters from './components/filters/filters.module';
import appServices from './components/services/services.module';

// Common styles
import './styles/mainStyles.less';

// Import the main module css here
import './pages/boostYourCareer/boostYourCareer.less';
import './pages/home/home.less';
import './pages/joinUs/joinUs.less';
import './pages/ourCreations/ourCreations.less';


// Import the routes config
import routes from './app.routes.js';

// Import the project files here
import BoostYourCareerController from './pages/boostYourCareer/boostYourCareer.ctrl';
import HomeController from './pages/home/home.ctrl';
import JoinUsController from './pages/joinUs/joinUs.ctrl';
import CreationsController from './pages/ourCreations/ourCreations.ctrl';

export default angular
  .module('visMaVieApp', [
    uiRouter,
    uiBootstrap,
    appDirectives,
    appFilters,
    appServices
  ])
  .config(routes)
  .controller('BoostYourCareerController', BoostYourCareerController)
  .controller('HomeController', HomeController)
  .controller('JoinUsController', JoinUsController)
  .controller('CreationsController', CreationsController);