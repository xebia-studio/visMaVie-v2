import './XebiaFooter.less';
import '../../../../assets/images/footer-logo-xebia.png';
import '../../../../assets/images/logo-alliance-xebia-long.png';

let XebiaFooter = function(){
  return {
    template: require('./XebiaFooter.tpl.html'),
    controller: 'XebiaFooterController as footer',
    replace: true
  }
};

export default XebiaFooter;