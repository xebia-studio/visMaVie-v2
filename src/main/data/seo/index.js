const seo = {};

const pages = [
	'$default',
	'home',
	'creations',
	'integration',
	'nous-rejoindre'
];

pages.forEach(page => {
	seo[page] = require('./'+page+'.yaml');
});

seo.expertise = function (page) {
	return page.path.replace('/', '');
}

export default seo;