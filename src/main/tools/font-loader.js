import { assign, isString, isArray, forEach, isObject, isBoolean, map, includes, has} from 'lodash'

const WebFont = require('webfontloader');

/* ------------------ */
import settings from 'settings/fonts.js'
const metaKeys = ['_family', '_type', '_subset'];
/* ------------------ */
// settings/fonts.js
//
// export default {
// 	biryani: {
// 		'_type': 'google',
// 		'_family': 'Biryani',
// 		'extra-light': 200,
// 		'light': 300,
// 		'regular': 400,
// 		'semi-bold': 600,
// 		'bold': 700,
// 		'extra-bold': 800,
// 		'black':900
// 	},
// 	oswald: {
// 		'_type': 'google',
// 		'_family': 'Oswald',
//		'_subset': 'greek',
// 		'light': 300,
// 		'regular': 400,
// 		'bold': 700
// 	}
// }
/* ------------------ */
/* ------------------ */

const getFontVariationsCache = {};
function getFontVariations(fontName) {
	if (!getFontVariationsCache[fontName]) {
		const variations = [];
		let settingsVariations = settings[fontName];

		if ( isObject(settingsVariations) ) {
			for(let variationName in settingsVariations){
				if(!includes(metaKeys, variationName)) {
					variations.push(variationName);
				}
			}
		}

		getFontVariationsCache[fontName] = variations;
	}

	return getFontVariationsCache[fontName];
}

function fontVariationExists(fontName, variation) {
	return includes(getFontVariations(fontName), variation);
}

const loader = {
	loadWebFont: function (config) {
		return WebFont.load(config);
	},
	loadGoogleFont: function (families, callbacks = {}) {
		return loader.loadWebFont(assign({}, callbacks, {
			google: {
				families
			}
		}));
	},

	/* ------------------ */
	/* ------------------ */
	// @families:
	// 	loadFont('myFont') => load all the variations of myFont
	// 	loadFont(['myFont', 'myOtherFont']) => load all the variations of myFont & myOtherFont
	// 	loadFont({
	// 		'myFont': true,
	// 		'myOtherFont': 'light',
	// 		'oneMoreFont': ['light', 'bold'],
	// 		'theLastFont': {
	// 			variations : ['extra-light', 'regular'],
	// 			subset: 'greek'
	// 		}
	// 	})

	// @callbacks: {
	// 	loading: function() {},
	// 	active: function() {},
	// 	inactive: function() {},
	// 	fontloading: function(familyName, fvd) {},
	// 	fontactive: function(familyName, fvd) {},
	// 	fontinactive: function(familyName, fvd) {}
	// }
	/* ------------------ */
	/* ------------------ */

	loadFont: function (fonts, callbacks) {
		if (isString(fonts)) {
			fonts = [fonts];
		}

		if (isArray(fonts)){
			const _fonts = {};
			forEach(fonts, fontName => {
				_families[fontName] = getFontVariations(fontName);
			});
			fonts = _fonts;
		}

		if(isObject(fonts)){
			let googleFonts = {};

			for(let fontName in fonts){
				let settingsVariations = settings[fontName];
				let fontVariations = fonts[fontName];

				if (!isObject(settingsVariations)){
					throw new Error('No font named "'+fontName+'" defined in settings/fonts.');
				}

				if(isBoolean(fontVariations)){
					fontVariations = fontVariations ? getFontVariations(fontName) : [];
				}

				if(isString(fontVariations)){
					fontVariations = [fontVariations];
				}

				if(isArray(fontVariations)){
					fontVariations = {
						variations: fontVariations
					};
				}

				if(!isObject(fontVariations)){
					throw new Error('When using the method loadFont, fonts variations must be of type Boolean, String, Array or Object.')
				}
				
				if(settingsVariations._type === 'google'){
					googleFonts[fontName] = fontVariations;
				}
				else{
					throw new Error('The font loader do not handle yet other font types than google. You can directly use webfontloader if needed.')
				}
			}
			
			const googleConfigFamilies = map(googleFonts, (options, fontName)=>{
				const settingsVariations = settings[fontName];
				let variations = options.variations;
				let subset = has(options, 'subset') ? options.subset : true;

				if(isBoolean(variations)){
					variations = variations ? getFontVariations(fontName) : [];
				}
				if (isBoolean(subset)) {
					subset = subset ? settingsVariations._subset : [];
				}

				if(isString(variations)){
					variations = [variations];
				}
				if(isString(subset)){
					subset = [subset];
				}

				if(!isArray(variations)){
					variations = [];
				}
				if(!isArray(subset)){
					subset = [];
				}

				if (variations.length >= 0) {
					return settingsVariations._family+':'+map(variations, variation => {
						if(fontVariationExists(fontName, variation)){
							return settingsVariations[variation];
						}

						throw new Error('No font variation named "'+variation+'" defined for font named "'+fontName+'" in settings/fonts.')
					}).join(',')+(subset.length > 0 ? ':'+subset.join(',') : '');
				}

				throw new Error('You attempt to load an empty list of variations for font named "'+fontName+'".');
			});

			loader.loadGoogleFont(googleConfigFamilies, callbacks);
		}
		else{
			throw new Error('The fonts parameter when using loadFont method must be a String, an Array or an Object.')
		}
	}
}

const mixin = {
	methods: loader
};

export { WebFont, getFontVariations, loader, mixin };