import './xuiShowcase.less';

let xuiShowcase = {
  template: require('./xuiShowcase.tpl.html'),
  transclude: true,
  bindings: {
    title: '<',
    mainDescription: '<',
    subDescription: '<',
    backgroundUrl: '<',
    rightPanelBackgroundColor: '<',
    rightPanelFlex: '='
  }
};

export default xuiShowcase;