import uiRouter from 'angular-ui-router';
import xebiaHeader from './XebiaHeader.dir.js';
import XebiaHeaderController from './XebiaHeader.ctrl.js';

export default angular
  .module('xebiaHeaderMdl', [uiRouter])
  .controller('XebiaHeaderController', XebiaHeaderController)
  .directive('xebiaHeader', xebiaHeader)
  .name;