require('generic/polyfill');
require('src/generated/tools/modernizr');

/*--------------*/

require('lodash');
require('swiper');

/*--------------*/

import Vue from 'vue';
import VueRouter from 'vue-router';
import {domReady} from '@alexistessier/dom';

/*--------------*/

require('components/AppPage');

/*--------------*/

Vue.use(VueRouter);

const routes = require('settings/routes');

const scrollBehaviorUseSavedPositionObject = require('tools/scroll-behavior-use-saved-position-object');

const router = new VueRouter({
	mode: 'history',
	routes,
	scrollBehavior (to, from, savedPosition) {
		const scrollBehaviorUseSavedPosition = scrollBehaviorUseSavedPositionObject.value;
		scrollBehaviorUseSavedPositionObject.value = false;
		return scrollBehaviorUseSavedPosition ? savedPosition : {x: 0, y: 0};
	}
});

router.beforeEach((to, from, next) => {
	if (to.path.indexOf('/index.html') >= 0) {
		next(to.path.replace('/index.html', ''));
	}
	else{
		next();
	}
});

const appRoot = new Vue({
	template: '<div id="root"><router-view></router-view></div>',
	router,
});

domReady(()=>{
	appRoot.$mount('#root');
});
