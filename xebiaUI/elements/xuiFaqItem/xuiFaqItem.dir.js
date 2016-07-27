import './xuiFaqItem.less';

let xuiFaqItem = {
  template: require('./xuiFaqItem.tpl.html'),
  bindings: {
    question: '<',
    answersTemplates: '<',
    headerPicture: '<'
  }
};

export default xuiFaqItem;