const {defineSupportCode} = require('cucumber');

const {report} = require('../test-utils');

defineSupportCode(({After, Before}) => {

	Before(function (scenario, callback) {
		report('notice', 'Before hook start');

		const data = scenario.scenario;
		this.scenario = data.feature.name +' - '+ data.name;

		report('notice', 'Before hook done');

		callback();
	});

	After(function (scenario, callback) {
		report('notice', 'After hook start');

		report('notice', 'After hook done');

		callback();
	});
})