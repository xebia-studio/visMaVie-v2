'use strict';

const xebiaCommonColors = require('xebia-web-common/settings/colors');

const orchid = '#C7B299';
const orange = '#FBB03B';
const flashOrange = '#ff6444';
const blue = '#2C374C';
const purple = '#6b215f';

const lightBlue = '#3fa9f5';

/*-------------*/

const uiDecoration = orchid;

const uiEnabled = flashOrange;
const uiEnabledText = 'white';

const uiImportantEnabled = orange;
const uiImportantEnabledText = 'white';
const uiImportantClickable = flashOrange;

const title = blue;
const textLight = '#999999';
const text = '#666666';

const sectionOdd = 'white';
const sectionEven = xebiaCommonColors.neutral100;

/*--------------*/

module.exports = Object.assign({
	_namespace: 'color'
}, xebiaCommonColors, {
	purple: purple,
	flashOrange: flashOrange,
	lightBlue: lightBlue,
	orchid: orchid,
	orange: orange,
	blue: blue,
	uiDecoration: uiDecoration,
	uiEnabled: uiEnabled,
	uiEnabledText: uiEnabledText,
	uiImportantEnabled: uiImportantEnabled,
	uiImportantEnabledText: uiImportantEnabledText,
	uiImportantClickable: uiImportantClickable,
	title: title,
	textLight: textLight,
	text: text,
	sectionOdd: sectionOdd,
	sectionEven: sectionEven
});
