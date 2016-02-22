import xebiaFooterDir from './xebiaFooter.dir.js';
import XebiaFooterController from './xebiaFooter.ctrl.js';

export default angular
  .module('xebiaFooterMdl', [])
  .controller('XebiaFooterController', XebiaFooterController)
  .directive('xebiaFooter', xebiaFooterDir)
  .name;