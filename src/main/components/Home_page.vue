<template lang="jade">
	.Home_page
		ParallaxedLayersGroup
			ParallaxedLayer
				ScreenFillerBlock.Home_page-header(:percentageOfScreenFilled="configScreenFiller")

					h1.Home_page-header-logo-outer-wrapper Xebia
						.Home_page-header-logo-inner-wrapper
							LogoXebia.Home_page-header-logo

					.Home_page-header-baseline-margin-top
					h2.Home_page-header-baseline
						span.Home_page-header-baseline-main Cabinet <br> de conseil agile
						span.Home_page-header-baseline-secondary Spécialisé dans les <br> technologies de pointe

					.Home_page-scroll-down-button-outer-wrapper
						button.Home_page-scroll-down-button(@click='scrollToBottom()', ref='scrollToDownButton')
							ArrowBottom

			ParallaxedLayer
				SliderExpertises

			ParallaxedLayer
</template>

<script>

import ParallaxedLayersGroup from 'components/ParallaxedLayersGroup/ParallaxedLayersGroup'
import ParallaxedLayer from 'components/ParallaxedLayersGroup/ParallaxedLayer'

import ScreenFillerBlock from 'components/ScreenFillerBlock'
import LogoXebia from 'src/generated/components/LogoXebia'
import ArrowBottom from 'src/generated/components/ArrowBottom'

import SliderExpertises from 'components/SliderExpertises'

import { mixin as fontLoader } from 'tools/font-loader'
import { mixin as scrollController } from 'tools/scroll-controller'
import { mixin as tweenHelper } from 'tools/tween-helper'
import { mixin as sizeClassHelper } from 'tools/size-class-helper'

import { Home_page as settings } from 'settings/components'

export default {
	name: 'Home_page',
	mixins: [fontLoader, scrollController, tweenHelper, sizeClassHelper],
	data: function () {
		return {
			configScreenFiller: {
				'height-compact & not-width-compact': 100,
				'default': settings.heightHeader/settings.screenHeightIdeal*100,
				'width-compact': 100
			}
		}
	},
	components: {
		ParallaxedLayersGroup,
		ParallaxedLayer,
		ScreenFillerBlock,
		LogoXebia,
		ArrowBottom,
		SliderExpertises
	},
	created: function () {
		this.loadFont({
			'text': 'extra-light',
			'title': 'regular'
		});
	},
	computed: {
		settings: function () {
			return settings;
		}
	},
	methods: {
		scrollToBottom: function () {
			const button = this.$refs.scrollToDownButton;
			button.blur ? button.blur() : null;

			this.getTweenHelper().tween({
				duration: '250ms',
				startValue: this.getScrollController().scrollTop,
				endValue: this.getSizeClassHelper().size.height,
				easingFunction: 'inOutQuad'
			},  currentValue => {
				this.getScrollController().scrollTo(currentValue)
			});
		}
	}
}
</script>

<style lang="stylus">
	_contentNumberOfColumns = 12

	_screenHeightIdeal = Home_page__$screenHeightIdeal
	_heightHeader = Home_page__$heightHeader
	_marginTopLogoXebia = 140
	_marginBottomLogoXebia = 75
	_heightLogo = 55

	.Home_page-header
		background-color color__$blue
		background-position center center
		background-repeat no-repeat
		background-size 100% 100%
		background-size cover
		position relative
		background-image url('~assets/images/home-header-desktop.jpg')

	.size-class-width-compact
		.Home_page-header
			background-image url('~assets/images/home-header-mobile.jpg')

	/*------------*/
	/* Logo Xebia */
	/*------------*/

	.Home_page-header-logo-outer-wrapper
		display block
		position absolute
		top ( _marginTopLogoXebia / _heightHeader * 100%)
		height ( _heightLogo / _heightHeader * 100%)
		width 100%
		font-size 0

	.size-class-width-compact
		.Home_page-header-logo-outer-wrapper
			display none

	.Home_page-header-logo-inner-wrapper
		layout__centeredGridBlock(numberOfColumns: _contentNumberOfColumns)
		height 100%

	.Home_page-header-logo
		max-width (5 / _contentNumberOfColumns * 100%)
		height 100%

		g
			fill white

	/*---------------*/
	/*---------------*/

	.Home_page-header-baseline-margin-top
		height ( (_marginTopLogoXebia + _heightLogo + _marginBottomLogoXebia) / _heightHeader * 100% )

	.Home_page-header-baseline
		layout__centeredGridBlock(numberOfColumns: _contentNumberOfColumns)
		color white

	.size-class-not-width-compact
		.Home_page-header-baseline br
			display none
	.Home_page-header-baseline-main
		font__useTitleRegular 50px
		font__line-height 50px

	.Home_page-header-baseline-secondary
		font__useTextExtraLight 18px
		font__line-height 20px
		display block

	.Home_page-header-baseline-main+.Home_page-header-baseline-secondary
		margin-top 10px

	.size-class-width-compact
		.Home_page-header-baseline-margin-top
			height 85px

		.Home_page-header-baseline
			max-width 100%
			width auto
			margin-left 40px
			margin-right 40px

		// .Home_page-header-baseline-main
		// 	font__rem-size 40px
		// 	font__line-height 50px

		// .Home_page-header-baseline-secondary
		// 	font__rem-size 28px
		// 	font__line-height 40px

		.Home_page-header-baseline-main+.Home_page-header-baseline-secondary
			margin-top 20px

	/*---------------*/
	/*---------------*/

	.Home_page-scroll-down-button
		display none

	.size-class-width-compact
		.Home_page-scroll-down-button-outer-wrapper
			position absolute
			width 100%
			bottom 40px
			left 0

		.Home_page-scroll-down-button
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
