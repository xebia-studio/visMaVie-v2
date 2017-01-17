import FocusWatcher from 'xebia-web-common/tools/focus-watcher'

let focusWatcher = null;

export const mixin = {
  methods: {
    getFocusWatcher: function () {
      return focusWatcher || (function () {
          focusWatcher = new FocusWatcher();

          return focusWatcher;
        })();
    }
  }
}