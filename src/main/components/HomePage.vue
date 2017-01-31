<template lang="jade">
	AppPage.HomePage
		AppSection.AppSection-even(:title="statSection.title", :baseline="statSection.baseline")
			StatCardList(:statData="statSection.statData", slot="section-content")
</template>

<script>
import AppPage from 'components/AppPage'
import AppSection from 'components/AppSection'
import StatCardList from 'components/StatCardList'

import LogoXebia from 'xebia-web-common/generated/components/LogoXebia'
import HandWorldPicto from 'src/generated/components/HandWorldPicto'
import HandCouplePicto from 'src/generated/components/HandCouplePicto'
import HandPaperPenPicto from 'src/generated/components/HandPaperPenPicto'
import HandCoinPicto from 'src/generated/components/HandCoinPicto'
import HandBalloonsPicto from 'src/generated/components/HandBalloonsPicto'
import HandMoneyPigPicto from 'src/generated/components/HandMoneyPigPicto'
import HandMicroPicto from 'src/generated/components/HandMicroPicto'
import HandFactoryPicto from 'src/generated/components/HandFactoryPicto'

import { mixin as fontLoader } from 'tools/font-loader'
import { mixin as sizeClassHelper } from 'tools/size-class-helper';

import { HomePage as settings } from 'settings/components'

export default {
	name: 'HomePage',
	mixins: [fontLoader, sizeClassHelper],
	data: function () {
		return {
			statSection: {
		        title: 'Xebia en quelques chiffres',
		        //baseline: 'Écrire, enseigner, construire, manager... Les contributions internes sont nombreuses et chacun a la possibilité de participer en fonction de ses savoirs-faire et savoirs-être !',
                statData: [{
                    picto: HandWorldPicto,
                    stat: '3',
                    text: 'Pays'
                },
                {
                    picto: HandCouplePicto,
                    stat: '125',
                    text: 'Consultants en France'
                },
                {
                    picto: HandPaperPenPicto,
                    stat: '1800',
                    text: 'Articles de blog'
                },
                {
                    picto: HandCoinPicto,
                    stat: '5%',
                    text: 'du CA dédié aux XKE*'
                },
                {
                    picto: HandBalloonsPicto,
                    stat: '15',
                    text: 'Ans'
                },
                {
                    picto: HandMoneyPigPicto,
                    stat: '45',
                    text: 'Millions de CA'
                },
                {
                    picto: HandMicroPicto,
                    stat: '182',
                    text: 'Slots en XKE en 2016'
                },
                {
                    picto: HandFactoryPicto,
                    stat: '8',
                    text: 'Fondations techniques'
                }]
            }
		}
	},
	components: {
		AppPage,
		LogoXebia,
		AppSection,
		StatCardList,
		HandWorldPicto,
		HandCouplePicto,
		HandPaperPenPicto,
		HandCoinPicto,
		HandBalloonsPicto,
		HandMoneyPigPicto,
		HandMicroPicto,
		HandFactoryPicto
	},
	created: function () {
		this.loadFont({
			'text': 'light',
			'title': 'regular'
		});
	},
	computed: {
		settings: function () {
			return settings;
		}
	}
}
</script>

<style lang="stylus">
	_contentNumberOfColumns = 12

	_screenHeightIdeal = HomePage__$screenHeightIdeal
	_heightHeader = HomePage__$heightHeader
	_marginTopLogoXebia = 140
	_marginBottomLogoXebia = 75
	_heightLogo = 55

	.HomePage-header
		background-color color__$blue
		background-position center center
		background-repeat no-repeat
		background-size 100% 100%
		background-size cover
		position relative
		background-image url('~assets/images/home-header-desktop.jpg')

	.size-class-width-compact
		.HomePage-header
			background-image url('~assets/images/home-header-mobile.jpg')

	/*------------*/
	/* Logo Xebia */
	/*------------*/

	.HomePage-header-logo-outer-wrapper
		display block
		position absolute
		top ( _marginTopLogoXebia / _heightHeader * 100%)
		height ( _heightLogo / _heightHeader * 100%)
		width 100%
		font-size 0

	.size-class-width-compact
		.HomePage-header-logo-outer-wrapper
			display none

	.HomePage-header-logo-inner-wrapper
		layout__centeredGridBlock(numberOfColumns: _contentNumberOfColumns)
		height 100%

	.HomePage-header-logo
		max-width (5 / _contentNumberOfColumns * 100%)
		height 100%

		g
			fill white

	/*---------------*/
	/*---------------*/

	.HomePage-header-baseline-margin-top
		height ( (_marginTopLogoXebia + _heightLogo + _marginBottomLogoXebia) / _heightHeader * 100% )

	.HomePage-header-baseline
		layout__centeredGridBlock(numberOfColumns: _contentNumberOfColumns)
		color white

	.size-class-not-width-compact
		.HomePage-header-baseline br
			display none
	.HomePage-header-baseline-main
		font__useTitleRegular 50px
		font__line-height 50px

	.HomePage-header-baseline-secondary
		font__useTextExtraLight 18px
		font__line-height 20px
		display block

	.HomePage-header-baseline-main+.HomePage-header-baseline-secondary
		margin-top 10px

	.size-class-width-compact
		.HomePage-header-baseline-margin-top
			height 85px

		.HomePage-header-baseline
			max-width 100%
			width auto
			margin-left 40px
			margin-right 40px

		// .HomePage-header-baseline-main
		// 	font__rem-size 40px
		// 	font__line-height 50px

		// .HomePage-header-baseline-secondary
		// 	font__rem-size 28px
		// 	font__line-height 40px

		.HomePage-header-baseline-main+.HomePage-header-baseline-secondary
			margin-top 20px

	/*---------------*/
	/*---------------*/

	.HomePage-scroll-down-button
		display none

	.size-class-width-compact
		.HomePage-scroll-down-button-outer-wrapper
			position absolute
			width 100%
			bottom 40px
			left 0

		.HomePage-scroll-down-button
			layout__centeredGridBlock(numberOfColumns: 4)
			button__resetStyle()

			transition transform 200ms ease__inOutCubic()
			transform translateY(0)

			&:hover, &:focus
				cursor pointer
				transform translateY(-5px)

			svg
				width 100%
	/*---------------*/
	/*---------------*/

</style>
