import './XebiaHeader.less';

let XebiaHeader = function(){
  return {
    restrict: 'AE',
    template: require('./XebiaHeader.tpl.html'),
    replace: true,
    controller: 'XebiaHeaderController as header'
  }
};

export default XebiaHeader;