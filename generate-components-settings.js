var path = require('path');
var _ = require('lodash');

var saveFile = require('./save-file.js');

/*---------------------*/

var settingsComponents = require('./src/main/settings/components.js');

(function generateComponentsSettings() {
	var filePath = path.join(__dirname, 'src/generated/settings/components.styl');

	saveFile({
        path: filePath,
        content: _.map(settingsComponents, function (settings, componentName) {
            return _.map(settings, function (settingValue, settingName) {
                return componentName+'__$'+settingName+((_.isString(settingValue) && settingValue.charAt(0) === '#') ? ' ?= ' : ' = ')+settingValue;
            }).join('\n');
        }).join('\n\n'),
        reportMessageTransform: function (message) {
            return 'Generate components settings => '+message;
        }
    });
})();