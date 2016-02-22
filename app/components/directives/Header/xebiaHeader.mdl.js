import uiRouter from 'angular-ui-router';
import xebiaHeader from './xebiaHeader.dir.js';

export default angular
  .module('xebiaHeaderMdl', [uiRouter])
  .directive('xebiaHeader', xebiaHeader)
  .name;