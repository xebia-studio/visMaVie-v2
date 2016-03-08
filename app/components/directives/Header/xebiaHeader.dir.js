import './XebiaHeader.less';

let XebiaHeader = function(){
  return {
    restrict: 'AE',
    template: require('./XebiaHeader.tpl.html'),
    replace: true
  }
};

export default XebiaHeader;