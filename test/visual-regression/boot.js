// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ##dorothea(component-name)## from '##dorothea(import-component)##'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<##dorothea(component-name)## ##dorothea(component-props)##/>',
  components: { ##dorothea(component-name)## }
})