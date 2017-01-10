import SizeClassHelper from 'xebia-web-common/tools/size-class-helper'

let sizeClassHelper = null;

export const mixin = {
    methods: {
        getSizeClassHelper: function () {
            return sizeClassHelper || (function () {
                sizeClassHelper = new SizeClassHelper();

                sizeClassHelper.setSizeClass('width-compact', {
                    minWidth:0,
                    maxWidth:767
                });

                sizeClassHelper.setSizeClass('width-regular', {
                    minWidth:768,
                    maxWidth:1199
                });

                sizeClassHelper.setSizeClass('width-large', {
                    minWidth: 1200
                });

                sizeClassHelper.setSizeClass('height-compact', {
                    minHeight:0,
                    maxHeight:800
                });

                return sizeClassHelper;
            })();
        }
    }
};
