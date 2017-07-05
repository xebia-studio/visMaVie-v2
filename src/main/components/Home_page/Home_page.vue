<template lang="jade">
	.Home_page
		ParallaxedLayersGroup
			VisMaVie_navigation_bar_layer

			ParallaxedLayer.Home_page-header-layer
				ScreenFillerBlock.Home_page-header(:style="{backgroundImage: headerBackgroundUrl}", :percentageOfScreenFilled="configScreenFiller")
					.Home_page-header-useful-width
						.Home_page-header-margin-constraints
							.Home_page-header-content
								.Home_page-header-logo
									.Home_page-header-logo-offset
									LogoXebiaVisMaVie
				CallToActionLayer(ref="callToActionLayer")

			VisMaVie_footer_layer
</template>

<script>
	import ParallaxedLayersGroup from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayersGroup';
	import ParallaxedLayer from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayer';

	import ScreenFillerBlock from 'xebia-web-common/components/ScreenFillerBlock';
	import LogoXebiaVisMaVie from 'generated/assets/components/Home_page/LogoXebiaVisMaVie';
	import CallToActionLayer from 'components/CallToActionLayer';

    import VisMaVie_navigation_bar_layer from 'components/VisMaVie_navigation_bar_layer';
    import VisMaVie_footer_layer from 'components/VisMaVie_footer_layer'

	import header from 'data/home/header.json';

	import {mixin as sizeClassHelper} from 'tools/size-class-helper';

	export default {
		name: 'Home_page',
		mixins: [sizeClassHelper],
		data(){
			return {
				header,
				headerBackground: undefined
			}
		},
		computed: {
			headerBackgroundUrl(){
				return this.headerBackground ? `url('${this.headerBackground}')` : undefined;
			},
			configScreenFiller(){ const self = this; return (function(height){
				const layer = self.$refs.callToActionLayer;
				return (layer && layer.$el ? height - domHeight(layer.$el) : height)+'px';
			})}
		},
		components: {
			ParallaxedLayersGroup,
			ParallaxedLayer,
			VisMaVie_navigation_bar_layer,
			VisMaVie_footer_layer,
			ScreenFillerBlock,
			LogoXebiaVisMaVie,
			CallToActionLayer
		},
		methods: {
			updateLayoutOnChange(){
				const sizeClassHelper = this.getSizeClassHelper();

				if (sizeClassHelper.isActive('width-compact')) {
					require.ensure([], require => {
						this.headerBackground = require('generated/assets/components/Home_page/images-blur/'+header.image.mobile);
					});
				}
				else{
					require.ensure([], require => {
						this.headerBackground = require('generated/assets/components/Home_page/images-blur/'+header.image.default)
					});
				}
			}
		},
		created() {
			const sizeClassHelper = this.getSizeClassHelper();

			const change = () => {
				this.updateLayoutOnChange();
			}

			this.deviceChangeListenerArguments = ['change', change];

			sizeClassHelper.on(...this.deviceChangeListenerArguments);
		},
		beforeDestroy(){
			this.getSizeClassHelper().off(...this.deviceChangeListenerArguments);
		}
	}
</script>

<style lang="stylus">
	.Home_page-header-useful-width
		layout__outerBox()
		height 100%
	.Home_page-header-margin-constraints
		layout__innerBox()
		height 100%
	
	.Home_page-header
		background-repeat no-repeat
		background-size 100% 100%
		background-size cover
		background-position center center

	.Home_page-header-content
		height 100%
		layout__gridBox(28)

	.Home_page-header-logo
		height 100%
		layout__gridBox(8, gridNumberOfColumns: 28)

		> .LogoXebiaVisMaVie
			max-width 100%
			max-height (105 / 570 * 100%)
	
	.Home_page-header-logo-offset
		width 100%
		height (130 / 570 * 100%)
</style>