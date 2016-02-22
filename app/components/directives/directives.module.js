import xebiaHeader from './Header/xebiaHeader.mdl.js';
import xebiaFooter from './Footer/xebiaFooter.mdl.js';

// This module includes all the app directives
export default angular
  .module('visMaVieAppDirectives', [
    xebiaHeader,
    xebiaFooter
  ])
  .name;