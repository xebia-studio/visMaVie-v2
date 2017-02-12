const path = require('path');
const _ = require('lodash');

const saveFile = require('xebia-web-common/scripts/save-file');

/**/

/*---------------------*/

const settingsFonts = require('./src/main/settings/fonts.js');

(function generateColorsFonts() {
	const filePathSettings = path.join(__dirname, 'src/generated/settings/fonts.styl');
    const filePathTools = path.join(__dirname, 'src/generated/tools/font.styl');

    function formatFamilyVarName(fontName) {
        return 'fonts__$'+_.camelCase(fontName);
    }

    function formatFamilyVar(fontName, family) {
        return formatFamilyVarName(fontName)+' = "'+family+'"';
    }

    function formatWeightVar(fontName, variation, weight) {
        return 'fonts__$'+_.camelCase(fontName+'-'+variation)+'Weight = '+weight;
    }

    function formatStyleVar(fontName, variation, style) {
        return 'fonts__$'+_.camelCase(fontName+'-'+variation)+'Style = '+style;
    }

    function unserializeVariation(variation) {
        const availableStyles = {
            i: 'italic',
            o: 'oblique',
            n: 'normal'
        };

        const variationAsString = (''+variation);

        const weight = variationAsString.length <= 1 ? 400 : parseInt(variationAsString);
        const baseWeight = variationAsString.length <= 1 ? '' : parseInt(variationAsString);

        let style = variationAsString.replace(''+weight, '');
        const baseStyle = style;
        style = style.length === 0 ? 'n' : style;

        if (!_.includes(_.keys(availableStyles), style) ||
            baseWeight+baseStyle !== variationAsString
        ) {
            throw new Error(
                'Wrong variation format in src/main/settings/fonts.js\n => '+variationAsString+
                '\nThe variation must be a String or a Number formated like this : 300i, 300, or i '+
                '(300 is the weight and i is for italic => can use i:italic, n: normal, o:oblique)'
            );
        }

        return {
            weight: weight,
            style: availableStyles[style]
        };
    }

    function extractWeightFromVariation(variation) {
       return unserializeVariation(variation).weight;
    }

    function extractStyleFromVariation(variation) {
        return unserializeVariation(variation).style;
    }

	saveFile({
        path: filePathSettings,
        content: _.chain(settingsFonts)
            .pickBy(function (font) {
                return font._type === 'google';
            })
            .mapValues(function (font, fontName) {

            	return _.concat(

                    [formatFamilyVar(fontName, font._family)],

                    _.chain(font).pickBy(function (value, variation) {
                        return !_.includes(['_family', '_type', '_subset'], variation);
                    }).mapValues(function (value, variation) {
                        return formatWeightVar(fontName, variation, extractWeightFromVariation(value))+'\n'+
                            formatStyleVar(fontName, variation, extractStyleFromVariation(value));
                    }).toArray().value()

                ).join('\n');

            }).toArray().value().join('\n\n'),

        reportMessageTransform: function (message) {
            return 'Generate fonts => '+message;
        }
    });

    function formatFontUseMixinName(font, variation) {
        return 'font__use'+_.upperFirst(_.camelCase(font+(_.isString(variation) ? '-'+variation : '')));
    }

    function formatFontUseMixin(fontName, variation) {
        const tab='\t';
        const parameters = '(size = false, transform = false, defaultFont = sans-serif)';

        return variation ? [
        formatFontUseMixinName(fontName, variation)+parameters,
            tab+formatFontUseMixinName(fontName)+'(size, transform, defaultFont)',
            tab+'font-weight '+extractWeightFromVariation(settingsFonts[fontName][variation]),
            tab+'font-style '+extractStyleFromVariation(settingsFonts[fontName][variation])
        ].join('\n') :
        [formatFontUseMixinName(fontName)+parameters,
            tab+'font__base('+formatFamilyVarName(fontName)+', size, transform, defaultFont)'
        ].join('\n');
    }

    saveFile({
        path: filePathTools,
        content: _.chain(settingsFonts)
            .pickBy(function (font) {
                return font._type === 'google';
            })
            .mapValues(function (font, fontName) {

                return _.concat(
                    [formatFontUseMixin(fontName)],

                    _.chain(font).pickBy(function (value, variation) {
                        return !_.includes(['_family', '_type', '_subset'], variation);
                    }).mapValues(function (value, variation) {
                        return formatFontUseMixin(fontName, variation);
                    }).toArray().value()

                ).join('\n\n');

            }).toArray().value().join('\n\n'),

        reportMessageTransform: function (message) {
            return 'Generate fonts => '+message;
        }
    });
})();
