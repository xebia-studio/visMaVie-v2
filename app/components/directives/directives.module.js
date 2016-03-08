import XebiaHeader from './XebiaHeader/XebiaHeader.mdl';
import XebiaFooter from './XebiaFooter/XebiaFooter.mdl';
import CardLink from './CardLink/CardLink.mdl';

// This module includes all the app directives
export default angular
  .module('visMaVieAppDirectives', [
    XebiaHeader,
    XebiaFooter,
    CardLink
  ])
  .name;