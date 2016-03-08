import xebiaFooterDir from './XebiaFooter.dir.js';
import XebiaFooterController from './XebiaFooter.ctrl.js';

export default angular
  .module('xebiaFooterMdl', [])
  .controller('XebiaFooterController', XebiaFooterController)
  .directive('xebiaFooter', xebiaFooterDir)
  .name;