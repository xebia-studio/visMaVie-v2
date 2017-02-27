var argv = require('./argv');

var cucumberArgs = [
	'--require', 'specs/hooks.js',
	'--require', 'specs/timeout.js',
	'--require', 'specs/features/step_definitions',
	'--format', 'pretty',
	'--format', 'json:reports/cucumber.json',
	'specs/features'
];

var tags = typeof argv.tags === 'string' ? argv.tags : (argv.tags ? argv.tags.join(' and ') : '');
if (tags.length) {
	cucumberArgs.push('--tags', tags);
}

require('nightwatch-cucumber')({
	cucumberArgs: cucumberArgs
})

/*-------------*/
/*-------------*/
/*-------------*/

module.exports = {
	output_folder: 'reports',
	 selenium: {
		start_process: true,
		server_path: 'test-utils/bin/selenium-server-standalone-3.0.1.jar',
		"log_path" : "",
    	"port" : 4444,
		cli_args: {
			"webdriver.chrome.driver" : "test-utils/bin/chromedriver.exe"
		}
	},
	test_settings: {
		default: {
			"desiredCapabilities": {
				"browserName": "chrome",
				"chromeOptions" : {
					"args" : ["--no-sandbox"]
				},
				"acceptSslCerts": true
			}
		}
	}
}