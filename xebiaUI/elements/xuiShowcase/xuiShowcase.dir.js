import './xuiShowcase.less';

let xuiShowcase = {
  template: require('./xuiShowcase.tpl.html'),
  transclude: true,
  bindings: {
    title: '<',
    mainDescription: '<',
    subDescription: '<',
    backgroundUrl: '<',
    backgroundColor: '<',
    rightPanelFlex: '=',
    bottomButton: '<'
  }
};

export default xuiShowcase;