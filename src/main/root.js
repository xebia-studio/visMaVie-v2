require('generic/polyfill');
require('src/generated/tools/modernizr');

/*--------------*/

require('lodash');
require('swiper');

/*--------------*/

import Vue from 'vue';
import VueRouter from 'vue-router';

/*--------------*/

require('components/AppPage/AppPage');

/*--------------*/

Vue.use(VueRouter);

const routes = require('settings/routes');

new Vue({
	router: new VueRouter({
		mode: 'history',
		routes
	})
}).$mount('#app');
