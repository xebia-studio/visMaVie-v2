import './Showcase.less';

let CardLink = {
  template: require('./Showcase.tpl.html'),
  bindings: {
    title: '<',
    description: '<',
    linkText: '<'
  }
};

export default CardLink;