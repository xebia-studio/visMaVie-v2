import XebiaHeader from './XebiaHeader/XebiaHeader.mdl';
import XebiaFooter from './XebiaFooter/XebiaFooter.mdl';
import CardLink from './CardLink/CardLink.mdl';
import XebiaButton from './__common__/XebiaButton/XebiaButton.mdl';

// This module includes all the app directives
export default angular
  .module('visMaVieAppDirectives', [
    XebiaHeader,
    XebiaFooter,
    CardLink,
    XebiaButton
  ])
  .name;