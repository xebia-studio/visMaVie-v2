// Expose globals with webpack
import 'expose?jQuery!expose?$!jquery';
import 'expose?angular!angular';

import 'bootstrap/dist/css/bootstrap.css';

// Import polyfill for browsers compatibility
import 'babel-polyfill';

// Import modules dependencies here
import uiRouter from 'angular-ui-router';
import appDirectives from './components/directives/directives.module';
import appFilters from './components/filters/filters.module';
import appServices from './components/services/services.module';

// Import the main module css here
import './pages/homePage/homePage.less';

// Import the routes config
import routes from './app.routes.js';

// Import the project files here
import HomeController from './pages/homePage/homePage.ctrl';

export default angular
  .module('visMaVieApp', [
    uiRouter,
    appDirectives,
    appFilters,
    appServices
  ])
  .config(routes)
  .controller('HomeController', HomeController);