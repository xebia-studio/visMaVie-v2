import WheelWatcher from 'xebia-web-common/tools/wheel-watcher';

let wheelWatcher = null;

export const mixin = {
  methods: {
    getWheelWatcher: function () {
      return wheelWatcher || (function () {
          wheelWatcher = new WheelWatcher();

          return wheelWatcher;
        })();
    }
  }
};
