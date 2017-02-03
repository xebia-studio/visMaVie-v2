const settingsHeader = require('./../../../src/main/assets/data/header/$settings.json');

const screenHeightIdeal = 800;

module.exports = {
	HomePage : {
		screenHeightIdeal,
		heightHeader: 520
	},
  BlurryHeaderLayer: {
    screenHeightIdeal,
    heightBlurryHeader: 400,
  },
	BulletPoints: {
		transparentBulletSize: 30,
		blueBulletSize: 21
	},
	OfferAccordion: {
    jobTitleDesktopHeight: 60,
    jobTitleDesktopBorder: 1
	},
  ContentBlock: {
    linkLineHeight: 24,
    linkMarginTop: 30
  },
  NavigationBar: {
    desktopHeight: 40,
    mobileHeight: 50,
    numberOfElements: Object.keys(settingsHeader.navigation_links).length
  }
};