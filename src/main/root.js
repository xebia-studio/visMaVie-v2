require('generic/polyfill');
require('src/generated/tools/modernizr');

/*--------------*/

import Vue from 'vue';
import VueRouter from 'vue-router';

/*--------------*/

Vue.use(VueRouter);

const routes = require('settings/routes');

new Vue({
	router: new VueRouter({
		mode: 'history',
		routes
	})
}).$mount('#app');
