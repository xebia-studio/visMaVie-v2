const settingsHeader = require('./../../../src/main/assets/data/header/$settings.json');

const screenHeightIdeal = 800;

module.exports = {
	HomePage: {
		screenHeightIdeal,
		heightHeader: 520
	},
  NousRejoindre: {
    leftPartNumberOfColumns: 8.5
  },
  VotreIntegration: {
    leftPartNumberOfColumns: 8.5
  },
  BlurryHeaderLayer: {
    screenHeightIdeal,
    heightBlurryHeader: 400,
  },
	BulletPoints: {
		bigBulletSize: 30,
    bigBulletPaddingRight: 10,
		smallBulletSize: 20,
    smallBulletMobilePaddingHorizontal: 10,
    smallBulletDesktopPaddingHorizontal: 25
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
	},
  CardSlider: {
    paginationBulletSize: 10,
    paginationBulletBorderWidth: 1,
    paginationBulletsSpaceBetween: 10,
    sizeClassCompactSlidesPerView: 3,
    desktopCardsPerRow: 3,
    cardBorder: 1
  },
};
