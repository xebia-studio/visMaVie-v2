import './xuiCard.less';

let xuiCard = {
  template: require('./xuiCard.tpl.html'),
  bindings: {
    title: '<',
    content: '<',
    imageUrl: '<',
    backgroundUrl: '<'
  }
};

export default xuiCard;