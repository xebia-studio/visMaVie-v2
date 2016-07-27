//Elements
import xuiButton from './elements/xuiButton/xuiButton.mdl';
import xuiFaq from './elements/xuiFaq/xuiFaq.mdl';
import xuiShowcase from './elements/xuiShowcase/xuiShowcase.mdl';
import xuiCard from './elements/xuiCard/xuiCard.mdl';

export default angular
  .module('xebiaUI', [
    xuiButton,
    xuiShowcase,
    xuiCard,
    xuiFaq
  ])
  .name;