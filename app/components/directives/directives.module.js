import xebiaUI from '../../../xebiaUI/xebiaUI.mdl';
import XebiaHeader from './XebiaHeader/XebiaHeader.mdl';
import XebiaFooter from './XebiaFooter/XebiaFooter.mdl';
import CardLink from './CardLink/CardLink.mdl';
import Showcase from './Showcase/Showcase.mdl';

// This module includes all the app directives
export default angular
  .module('visMaVieAppDirectives', [
    xebiaUI,
    XebiaHeader,
    XebiaFooter,
    CardLink,
    Showcase
  ])
  .name;