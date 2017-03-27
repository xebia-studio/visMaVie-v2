require('generic/polyfill');
require('src/generated/tools/modernizr');

/*--------------*/

require('lodash');
require('swiper');

/*--------------*/

import Vue from 'vue';
import VueRouter from 'vue-router';
import {domReady} from '@alexistessier/dom';

import seo from 'data/seo';

/*--------------*/

require('components/AppPage');

require('./trumps/device-related-content.styl');
require('./trumps/deffered-resources.styl');

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

function changePageSeoData({
	title = seo.$default.title,
	keywords = seo.$default.keywords,
	description = seo.$default.description
} = seo.$default) {
	const titleTag = document.querySelector('title');
	const keywordsTag = document.getElementById('meta-keywords');
	const descriptionTag = document.getElementById('meta-description');

	titleTag.innerHTML = title;
	keywordsTag.setAttribute('content', keywords);
	descriptionTag.setAttribute('content', description);
}

router.beforeEach((to, from, next) => {
	let currentPageSeo = seo[to.name] || seo.$default;

	if (typeof currentPageSeo === 'function') {
		currentPageSeo = seo[currentPageSeo(to)] || seo.$default;
	}

	changePageSeoData(currentPageSeo);

	if (to.path.indexOf('/index.html') >= 0) {
		next(to.path.replace('/index.html', ''));
	}
	else{
		next();
	}

	if (typeof window.ga === 'function') {
		ga('set', 'page', to.path);
		ga('send', 'pageview');
	}
});

const appRoot = new Vue({
	template: '<div id="root"><router-view></router-view></div>',
	router,
});

domReady(()=>{
	appRoot.$mount('#root');
});
