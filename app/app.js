// Expose globals with webpack
import 'expose?jQuery!expose?$!jquery';
import 'expose?angular!angular';

// Import polyfill for browsers compatibility
import 'babel-polyfill';

// Import modules dependencies here
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import appDirectives from './components/directives/directives.module';
import appFilters from './components/filters/filters.module';
import appServices from './components/services/services.module';

// Common styles
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/mainStyles.less';

// Import the main module css here
import './pages/boostYourCareer/boostYourCareer.less';
import './pages/home/home.less';
import './pages/joinUs/joinUs.less';
import './pages/ourCreations/ourCreations.less';
import './pages/ourPassions/ourPassions.less';
import './pages/ourValues/ourValues.less';
import './pages/visit3D/visit3D.less';

// Import the routes config
import routes from './app.routes.js';

// Import the project files here
import BoostYourCareerController from './pages/boostYourCareer/boostYourCareer.ctrl';
import HomeController from './pages/home/home.ctrl';
import JoinUsController from './pages/joinUs/joinUs.ctrl';
import CreationsController from './pages/ourCreations/ourCreations.ctrl';
import OurPassionsController from './pages/ourPassions/ourPassions.ctrl';
import OurValuesController from './pages/ourValues/ourValues.ctrl';
import Visit3DController from './pages/visit3D/visit3D.ctrl';

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
  .controller('CreationsController', CreationsController)
  .controller('OurPassionsController', OurPassionsController)
  .controller('OurValuesController', OurValuesController)
  .controller('Visit3DController', Visit3DController);