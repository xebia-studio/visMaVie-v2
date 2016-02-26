import xebiaHeader from './Header/xebiaHeader.mdl';
import xebiaFooter from './Footer/xebiaFooter.mdl';
import CardLink from './CardLink/CardLink.mdl';

// This module includes all the app directives
export default angular
  .module('visMaVieAppDirectives', [
    xebiaHeader,
    xebiaFooter,
    CardLink
  ])
  .name;