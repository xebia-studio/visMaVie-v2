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
								.Home_page-header-characters
									.Home_page-header-characters-group(v-for="(charactersGroup, i) in charactersGroups")
										a.Home_page-header-character(v-for="(character, index) in charactersGroup", :class="'index-'+(index+1+(i*4))", :href="character.url", @click="clickOnCharacter($event, character)")
											.Home_page-header-character-image(:style="charactersStyles[index+(i*4)]")
											.Home_page-header-character-widget
												.Home_page-header-character-widget-outer-wrapper
													.Home_page-header-character-widget-inner-wrapper
														.Home_page-header-character-info
															.Home_page-header-character-name {{character.name}}
															.Home_page-header-character-job {{character.job}}
														.Home_page-header-character-link
															.Home_page-header-character-link-label {{header.consultants_evolution_label}}
															.Home_page-header-character-link-label-picto
																ArrowBottom

				CallToActionLayer(ref="callToActionLayer")

			VisMaVie_footer_layer
</template>

<script>
	import {domHeight} from '@alexistessier/dom';

	import scrollBehaviorScrollToCareerObject from 'tools/scroll-behavior-scroll-to-career-object';

	import ParallaxedLayersGroup from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayersGroup';
	import ParallaxedLayer from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayer';

	import ScreenFillerBlock from 'xebia-web-common/components/ScreenFillerBlock';
	import LogoXebiaVisMaVie from 'generated/assets/components/Home_page/LogoXebiaVisMaVie';
	import ArrowBottom from 'generated/assets/components/Home_page/ArrowBottom';
	import CallToActionLayer from 'components/CallToActionLayer';

    import VisMaVie_navigation_bar_layer from 'components/VisMaVie_navigation_bar_layer';
    import VisMaVie_footer_layer from 'components/VisMaVie_footer_layer'

	import header from 'data/home/header.json';

	import {mixin as sizeClassHelper} from 'tools/size-class-helper';
	import {mixin as fontLoader} from 'tools/font-loader';

	export default {
		name: 'Home_page',
		mixins: [sizeClassHelper, fontLoader],
		data(){
			return {
				header,
				characters: header.consultants,
				headerBackground: undefined,
				charactersBackgrounds: []
			}
		},
		computed: {
			charactersGroups: function () {
				return [
					[this.characters[0], this.characters[1], this.characters[2], this.characters[3]],
					[this.characters[4], this.characters[5], this.characters[6], this.characters[7]]
				];
			},
			charactersStyles(){
				return this.characters.map((character, i) => ({
					backgroundImage: this.charactersBackgrounds[i] ? `url("${this.charactersBackgrounds[i]}")` : "none"
				}))
			},
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
			CallToActionLayer,
			ArrowBottom
		},
		methods: {
			clickOnCharacter(event, character){
				event.preventDefault();

				scrollBehaviorScrollToCareerObject.value = true;
				this.$router.push(character.url);
			},
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

				this.characters.forEach((character, i) => {
					require.ensure([], require => {
						this.charactersBackgrounds[i] = require('generated/assets/components/Home_page/images/'+character.image);
						this.charactersBackgrounds = this.charactersBackgrounds.map(s => s);
					});
				});
			}
		},
		created() {
			this.loadFont({
				text: ['regular'],
				title: ['bold']
			});

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
		layout__centeredGridBox(28)
		position relative

	.Home_page-header-logo
		height 100%
		layout__gridBox(8, gridNumberOfColumns: 28)

		> .LogoXebiaVisMaVie
			width 100%
			height (105 / 570 * 100%)
			max-height 105px
			max-width 260px
	
	.Home_page-header-logo-offset
		width 100%
		height (130 / 570 * 100%)
	
	.Home_page-header-characters
		width 100%
		height (250 / 570 * 100%)
		position absolute
		bottom 0
		left 0
		clearfix()
	
	.Home_page-header-characters-group
		height 100%
		width 50%
		float left
		clearfix()
		position relative
		z-index 5
		
		&:hover
			z-index 6

	.Home_page-header-character
		display block
		height 100%
		width (100% / 4)
		float left
		position relative
		
		&:hover
			cursor pointer
		
		&.index-1
			left -1vw

		&.index-1, &.index-8
			z-index 8
		&.index-2, &.index-7
			z-index 6
		&.index-3, &.index-6
			z-index 4
		&.index-4, &.index-5
			z-index 2
			
			&:hover, &:focus
				z-index 3
		
		&.index-4
			left -0.5vw
	
	.Home_page-header-character-image
		height 270px
		width 160px
		height 20vw
		width 15vw
		position absolute
		bottom 0
		background-size auto 100%
		background-repeat no-repeat
		background-position center bottom
		z-index 5
	
	.Home_page-header-character-widget
		width 25%
		position absolute
		z-index 2
		bottom 30px
		left 75%

	.Home_page-header-character-widget-outer-wrapper
		width 250px
		width calc(250px + 4vw)
		position relative
		overflow hidden
		pointer-events none
		
		.Home_page-header-character.index-5 &,
		.Home_page-header-character.index-6 &,
		.Home_page-header-character.index-7 &,
		.Home_page-header-character.index-8 &
			left -250px
			left calc(-250px - 4vw)
	
	.Home_page-header-character-widget-inner-wrapper
		transition transform 220ms ease__outQuart()
		
		.Home_page-header-character.index-1 &,
		.Home_page-header-character.index-2 &,
		.Home_page-header-character.index-3 &,
		.Home_page-header-character.index-4 &
			transform translateX(-101%)
		
		.Home_page-header-character.index-5 &,
		.Home_page-header-character.index-6 &,
		.Home_page-header-character.index-7 &,
		.Home_page-header-character.index-8 &
			transform translateX(101%)
		
		.Home_page-header-character:hover &,
		.Home_page-header-character:focus &
			transform translateX(0)
	
	.Home_page-header-character-info
		background-color color__$blue
	
	_characterWidgetMarginMacro()
		pxValue = 80px
		vwValue = 6.5vw
		
		.Home_page-header-character.index-1 &,
		.Home_page-header-character.index-2 &,
		.Home_page-header-character.index-3 &,
		.Home_page-header-character.index-4 &
			margin-left pxValue
			margin-left vwValue
			text-align left
			
		.Home_page-header-character.index-5 &,
		.Home_page-header-character.index-6 &,
		.Home_page-header-character.index-7 &,
		.Home_page-header-character.index-8 &
			margin-right pxValue * 1.3
			margin-right vwValue * 1.3
			text-align right

	.Home_page-header-character-name,
	.Home_page-header-character-job
		_characterWidgetMarginMacro()
		color white
	
	.Home_page-header-character-link
		display block
		background-color color__$flashOrange
		color white
		text-decoration none
		text-transform uppercase
		font__useTextRegular 12
		pointer-events auto
		font__line-height 15
		
		.Home_page-header-character.index-5 &,
		.Home_page-header-character.index-6 &,
		.Home_page-header-character.index-7 &,
		.Home_page-header-character.index-8 &
			clearfix()
	
	.Home_page-header-character-link-label
		_characterWidgetMarginMacro()
		display block
		width 120px
		
		.Home_page-header-character.index-5 &,
		.Home_page-header-character.index-6 &,
		.Home_page-header-character.index-7 &,
		.Home_page-header-character.index-8 &
			float right
	
	.Home_page-header-character-info,
	.Home_page-header-character-link
		margin-top 5px
		padding-top 8px
		padding-bottom 8px
		
		.Home_page-header-character.index-1 &,
		.Home_page-header-character.index-2 &,
		.Home_page-header-character.index-3 &,
		.Home_page-header-character.index-4 &
			padding-right 12px
		
		.Home_page-header-character.index-5 &,
		.Home_page-header-character.index-6 &,
		.Home_page-header-character.index-7 &,
		.Home_page-header-character.index-8 &
			padding-left 12px
	
	.Home_page-header-character-name
		font__useTitleBold 21
		font__line-height 23
	
	.Home_page-header-character-name+.Home_page-header-character-job
		margin-top 5px

	.Home_page-header-character-job
		font__useTextRegular 14
		font__line-height 16
	
	.Home_page-header-character-link
		position relative

	.Home_page-header-character-link-label-picto
		width 15px
		height 15px
		position absolute
		top 15px
		
		.Home_page-header-character.index-1 &,
		.Home_page-header-character.index-2 &,
		.Home_page-header-character.index-3 &,
		.Home_page-header-character.index-4 &
			transform rotate(-90deg)
			right 15px
		
		.Home_page-header-character.index-5 &,
		.Home_page-header-character.index-6 &,
		.Home_page-header-character.index-7 &,
		.Home_page-header-character.index-8 &
			transform rotate(90deg)
			left 15px
</style>