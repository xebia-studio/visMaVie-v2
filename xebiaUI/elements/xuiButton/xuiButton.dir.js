import './xuiButton.less';

let xuiButton = {
  template: require('./xuiButton.tpl.html'),
  transclude: true,
  bindings: {
    color: '<', // values: [default(purple), cyan]
    type: '@', // values: [default, round, link]
    size: '@', // values: [default, big, small, extraSmall]
    onClick: '&?',
    isDisabled: "=?"
  },
  controller: function(){
    let prefix = 'xuiButton--';
    this.typeCLass = this.type ? prefix + this.type : '';
    this.sizeClass = this.size ? prefix + this.size : '';
  }
};

export default xuiButton;