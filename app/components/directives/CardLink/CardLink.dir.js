import './CardLink.less';

let CardLink = {
  template: require('./CardLink.tpl.html'),
  bindings: {
    title: '<',
    link: '<',
    linkText: '<'
  }
};

export default CardLink;