import './styles/main.less';

//Elements
import xuiButton from './elements/xuiButton/xuiButton.mdl';
import xuiShowcase from './elements/xuiShowcase/xuiShowcase.mdl';

export default angular
  .module('xebiaUI', [
    xuiButton,
    xuiShowcase
  ])
  .name;