import uiRouter from 'angular-ui-router';
import xebiaHeader from './XebiaHeader.dir.js';

export default angular
  .module('xebiaHeaderMdl', [uiRouter])
  .directive('xebiaHeader', xebiaHeader)
  .name;