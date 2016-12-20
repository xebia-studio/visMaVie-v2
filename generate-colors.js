var path = require('path');
var _ = require('lodash');

var saveFile = require('./save-file.js');

/*---------------------*/

var settingsColors = require('./src/main/settings/colors.js');

(function generateColorsSettings() {
	var filePath = path.join(__dirname, 'src/generated/settings/colors.styl');

	saveFile({
        path: filePath,
        content: _.map(settingsColors, function (colorValue, colorName) {
        	return 'color__$'+colorName+' ?= '+colorValue;
        }).join('\n'),
        reportMessageTransform: function (message) {
            return 'Generate colors => '+message;
        }
    });
})();