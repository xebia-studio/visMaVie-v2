const path = require('path');

const forEachPage = require('./for-each-simple-page');

const genericPages = {};

forEachPage(([pagePath, page]) => {
	genericPages[page.url] = {
		path: '/'+page.url,
		dataPath: 'data/simple-pages/'+path.basename(pagePath),
		componentDirectoryPath: 'generated/settings/routes/components',
		headerImageCacheSetterPath: 'generated/tools/settings/routes/blurryHeaderImageCacheSetter'
	}
});

module.exports = {
	genericPages
}