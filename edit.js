'use strict';

const edit = require('xebia-web-common/scripts/edit');

edit({
	dirname: __dirname,
	configHost: require('./config').host
});