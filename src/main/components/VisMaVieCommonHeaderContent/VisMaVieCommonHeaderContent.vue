<template lang="jade">
	.VisMaVieCommonHeaderContent
		.VisMaVieCommonHeaderContent-inner-box
			h1.VisMaVieCommonHeaderContent-header-logo-outer-wrapper Xebia
				.VisMaVieCommonHeaderContent-header-logo-inner-wrapper
					LogoVisMaVie.VisMaVieCommonHeaderContent-header-logo

			//-h2.VisMaVieCommonHeaderContent-header-baseline
				span.VisMaVieCommonHeaderContent-header-baseline-main(v-html="content.baseline")
</template>

<script>
	import LogoVisMaVie from 'generated/assets/components/AppPage/LogoVisMaVie';

	import {mixin as fontLoader} from 'tools/font-loader';

	const content = {
		baseline: 'Vis ma vie de consultant<br> chez Xebia'
	};

	export default {
		name: 'XebiaCommonHeaderContent',
		mixins: [fontLoader],
		components: {
			LogoVisMaVie
		},
		data: function () {
			return {
				content
			};
		},
		created: function () {
			this.loadFont({
				title: 'regular',
				text: 'light'
			});
		}
	};
</script>

<style lang="stylus">
	_contentNumberOfColumns = 12

	_screenHeightIdeal = 800
	_heightHeader = 500
	_marginTopLogoXebia = 140
	_marginBottomLogoXebia = 75
	_heightLogo = 55

	.VisMaVieCommonHeaderContent
		layout__outerBox()
		height 100%

	.VisMaVieCommonHeaderContent-inner-box
		layout__innerBox()
		height 100%
		//position relative

	/*------------*/
	/* Logo Xebia */
	/*------------*/

	.VisMaVieCommonHeaderContent-header-logo-outer-wrapper
		display block
		position absolute
		top ( _marginTopLogoXebia / _heightHeader * 100%)
		height 65px
		width 100%
		font-size 0

		.size-class-width-compact &
			display none

	.VisMaVieCommonHeaderContent-header-logo-inner-wrapper
		layout__centeredGridBox(numberOfColumns: _contentNumberOfColumns)
		height 100%

	.VisMaVieCommonHeaderContent-header-logo
		position relative
		left -25px
		height 100%
		filter__dropShadow(blur:15px)

		g
			fill white

	.VisMaVieCommonHeaderContent-header-baseline
		layout__centeredGridBox(numberOfColumns: _contentNumberOfColumns)
		color white
		text-shadow 0px 0px 15px black

	.size-class-not-width-compact
		.VisMaVieCommonHeaderContent-header-baseline br
			//display none

	.VisMaVieCommonHeaderContent-header-baseline-main
		font__useTitleRegular 50px
		font__line-height 62px

	.VisMaVieCommonHeaderContent-header-baseline-secondary
		font__useTextLight 18px
		font__line-height 20px
		display block

	.size-class-not-width-compact
		.VisMaVieCommonHeaderContent-header-baseline-main,
		.VisMaVieCommonHeaderContent-header-baseline-secondary
			white-space nowrap

	.VisMaVieCommonHeaderContent-header-baseline-main+.VisMaVieCommonHeaderContent-header-baseline-secondary
		margin-top 10px

	.VisMaVieCommonHeaderContent-header-logo-outer-wrapper+.VisMaVieCommonHeaderContent-header-baseline
		margin-top 80px

	.size-class-width-compact
		.VisMaVieCommonHeaderContent-header-baseline-margin-top
			height 85px

		.VisMaVieCommonHeaderContent-header-baseline
			max-width 100%
			width auto

		.VisMaVieCommonHeaderContent-header-baseline-main+.VisMaVieCommonHeaderContent-header-baseline-secondary
			margin-top 20px
</style>
