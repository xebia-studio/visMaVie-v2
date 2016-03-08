import xebiaHeader from './Header/XebiaHeader.mdl';
import xebiaFooter from './Footer/XebiaFooter.mdl';
import CardLink from './CardLink/CardLink.mdl';

// This module includes all the app directives
export default angular
  .module('visMaVieAppDirectives', [
    xebiaHeader,
    xebiaFooter,
    CardLink
  ])
  .name;