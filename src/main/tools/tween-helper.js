import TweenHelper from 'xebia-web-common/tools/tween-helper'

let tweenHelper = null;

export const mixin = {
    methods: {
        getTweenHelper: function () {
            return tweenHelper || (function () {
                tweenHelper = new TweenHelper();

                return tweenHelper;
            })();
        }
    }
};
