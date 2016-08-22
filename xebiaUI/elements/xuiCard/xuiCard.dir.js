import './xuiCard.less';

let xuiCard = {
  template: require('./xuiCard.tpl.html'),
  bindings: {
    title: '<',
    topContent: '<',
    bottomContent: '<',
    imageUrl: '<',
    backgroundUrl: '<'
  }
};

export default xuiCard;