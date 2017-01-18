import SizeClassHelper from 'xebia-web-common/tools/size-class-helper'

let sizeClassHelper = null;

export const config = {
  'width-compact': {
    minWidth:0,
    maxWidth:767
  },
  'width-regular': {
    minWidth:768,
    maxWidth:1199
  },
  'width-large': {
    minWidth: 1200
  },
  'height-compact': {
    minHeight:0,
    maxHeight:700
  }
};

export const mixin = {
  methods: {
    getSizeClassHelper: function () {
      return sizeClassHelper || (function () {
          sizeClassHelper = new SizeClassHelper();

          for(let sizeClassName in config){
            sizeClassHelper.setSizeClass(sizeClassName, config[sizeClassName]);
          }

          return sizeClassHelper;
        })();
    }
  }
};