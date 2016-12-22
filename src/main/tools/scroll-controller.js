import ScrollController from 'xebia-web-common/tools/scroll-controller'

let scrollController = null;

export const mixin = {
    methods: {
        getScrollController: function () {
            return scrollController || (function () {
                scrollController = new ScrollController();

                return scrollController;
            })();
        }
    }
};
