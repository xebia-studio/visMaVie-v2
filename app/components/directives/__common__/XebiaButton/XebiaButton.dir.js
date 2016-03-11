import './XebiaButton.less';

let XebiaButton = {
  template: require('./XebiaButton.tpl.html'),
  transclude: true,
  bindings: {
    color: '@', // values: [default(purple), grey]
    shape: '@', // values: [default, round, link]
    size: '@', // values: [default, big, small, extraSmall]
    onClick: '&?',
    isDisabled: "=?"
  },
  controller: function(){
    let prefix = 'XebiaButton--';

    this.colorClass = this.color ? prefix + this.color : 'XebiaButton--purple';
    this.shapeCLass = this.shape ? prefix + this.shape : '';
    this.sizeClass = this.size ? prefix + this.size : '';
  }
};

export default XebiaButton;