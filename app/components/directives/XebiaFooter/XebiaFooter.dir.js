import './XebiaFooter.less';
import '../../../../assets/images/footer-logo-xebia.svg';
import '../../../../assets/images/logo-alliance-xebia-long.svg';

let XebiaFooter = function(){
  return {
    restrict: 'AE',
    template: require('./XebiaFooter.tpl.html'),
    controller: 'XebiaFooterController as footer',
    replace: true
  }
};

export default XebiaFooter;