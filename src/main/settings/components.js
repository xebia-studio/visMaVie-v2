const settingsHeader = require('../data/header/$settings.json');
const colorsSettings = require('./colors');

const NavigationBarSettings = require('xebia-web-common/components/NavigationBar/settings');

const screenHeightIdeal = 800;

module.exports = {
  CallToActionButton: {
    colorNormal: colorsSettings.lightBlue,
    colorImportant: colorsSettings.flashOrange,
    textColor: 'white'
  },
	Home_page: {
		screenHeightIdeal,
		heightHeader: 520
	},
  NousRejoindre_page: {
    leftPartNumberOfColumns: 8.5
  },
  VotreIntegration_page: {
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
  NavigationBar: Object.assign({}, NavigationBarSettings, {
    numberOfElements: Object.keys(settingsHeader.navigation_links).length
	}),
  CardSlider: {
    paginationBulletSize: 10,
    paginationBulletBorderWidth: 1,
    paginationBulletsSpaceBetween: 10,
    sizeClassCompactSlidesPerView: 3,
    desktopCardsPerRow: 3,
    cardBorder: 1
  },
  ArrowLink: {
	  color: colorsSettings.flashOrange,
    highlightColor:colorsSettings.textLight,
    externalPictoColor: colorsSettings.flashOrange,
    arrowPictoColor: colorsSettings.flashOrange
  },
  AppSection: {
	  mobileVerticalPadding: 30,
    desktopVerticalPadding: 40,
    mobileTitleWithBaselineBottomMargin: 30,
    desktopTitleWithBaselineBottomMargin: 40,
  }
};
