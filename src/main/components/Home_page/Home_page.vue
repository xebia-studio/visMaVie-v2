<template lang="jade">
	.Home_page
		ParallaxedLayersGroup
			VisMaVie_navigation_bar_layer

			ParallaxedLayer.Home_page-header-layer(:zIndex="5")
				ScreenFillerBlock.Home_page-header(:style="{backgroundImage: headerBackgroundUrl}", :percentageOfScreenFilled="configScreenFiller")
					.Home_page-header-useful-width
						.Home_page-header-margin-constraints
							.Home_page-header-content
								.Home_page-header-logo
									.Home_page-header-logo-offset
									LogoXebiaVisMaVie
								.Home_page-header-characters-scroll-view-pagination
									button.Home_page-header-characters-scroll-view-pagination-link(v-for="(c, i) in characters", @click="buttonClick($event, 'paginationLink'+i, scrollToSlideClick, i)", :ref="'paginationLink'+i", rel="button", :class="i === currentSlide ? 'is--active' : ''")
								.Home_page-header-characters-scroll-view(:style="{bottom:scrollViewBottomStyle}", ref="characterScrollView")
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

			CallToActionLayer(ref="callToActionLayer", :zIndex="6", style="position:relative")

			ParallaxedLayer
				AppSection.AppSection-odd(:title="timelineItems.introductionTitle", :baseline="timelineItems.baseline")
					ContentBlock.Home_page-introduction(:blocks="timelineIntroduction.block_content", slot="section-content")

				AppSection.AppSection-odd(:title="timelineItems.name")
					Timeline(:items="timelineItems.data", slot="section-content").Home_page-timeline

			VisMaVie_footer_layer
</template>

<script>
	import getScrollBarWidth from 'tools/get-scroll-bar-width'
	const scrollBarWidth = getScrollBarWidth();

	import {domHeight, domWidth} from '@alexistessier/dom';

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

	import {mixin as uiNavigationButton} from 'xebia-web-common/tools/ui-navigation-button';

	import AppSection from 'components/AppSection';
	import Timeline from 'components/Timeline';
	import timelineItems from 'data/about/timeline-items.json';
	import timelineIntroduction from 'data/about/timeline-introduction.yaml';

	console.log(timelineIntroduction.block_content)
	
	import ContentBlock from 'components/ContentBlock'

	export default {
		name: 'Home_page',
		mixins: [sizeClassHelper, fontLoader, uiNavigationButton],
		data(){
			return {
				header,
				characters: header.consultants,
				headerBackground: undefined,
				charactersBackgrounds: [],
				scrollViewBottomStyle: `-${scrollBarWidth}px`,
				currentSlide: 0,
				slideWidth: 0,
				needAdjust: false,
				timelineItems,
				timelineIntroduction
			}
		},
		watch: {
			slideWidth(){
				this.needAdjust = true;
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
			configScreenFiller(){
				const self = this;

				function fillerHeight(height){
					const layer = self.$refs.callToActionLayer;
					return (layer && layer.$el ? height - domHeight(layer.$el) : height);
				}

				return function(height){
					return Math.max(fillerHeight(height), 425)+'px';
				}
			}
		},
		components: {
			ParallaxedLayersGroup,
			ParallaxedLayer,
			VisMaVie_navigation_bar_layer,
			VisMaVie_footer_layer,
			ScreenFillerBlock,
			LogoXebiaVisMaVie,
			CallToActionLayer,
			ArrowBottom,
			AppSection,
			Timeline,
			ContentBlock
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
			},
			updateLayoutOnResize(){
				const scrollView = this.$refs.characterScrollView;

				this.slideWidth = scrollView ? domWidth(scrollView) : 0;
			},
			scrollToSlide(slide){
				const scrollView = this.$refs.characterScrollView;

				if (scrollView) {
					const slideWidth = domWidth(scrollView);

					scrollView.scrollTo({
	                    behavior: 'smooth',
	                    left: slide*slideWidth,
	                    top: 0
	                });
				}
			},
			scrollToSlideClick(event, ref, s, slide){
				this.scrollToSlide(slide);
			}
		},
		created() {
			this.loadFont({
				text: ['regular'],
				title: ['bold', 'regular']
			});

			const sizeClassHelper = this.getSizeClassHelper();

			const change = () => {
				this.updateLayoutOnChange();
			}

			this.deviceChangeListenerArguments = ['change', change];

			sizeClassHelper.on(...this.deviceChangeListenerArguments);

			const resize = () => {
				this.updateLayoutOnResize();
			}

			this.resizeListenerArguments = ['resize', resize];

			sizeClassHelper.on(...this.resizeListenerArguments);

			this.stopLoop = false;
			const self = this;

			let timeSinceNoPositionChange = 0;
			let previousPosition;
			let previousTime = Date.now();
			let adjusted = false;

			(function loop(){
				const currentTime = Date.now();
				const deltaTime = currentTime - previousTime;
				previousTime = currentTime;

				requestAnimationFrame(()=>{
					if (sizeClassHelper.isActive('width-compact') || Modernizr.touchevents) {
						const scrollView = self.$refs.characterScrollView;
						if (scrollView) {
							const slideWidth = self.slideWidth;
							const fullWidth = slideWidth*8;
							const position = scrollView.scrollLeft;
						
							const currentSlide = (slideWidth ? parseInt((position+slideWidth/2)/slideWidth) : 0);

							self.currentSlide = currentSlide;

							if (position === previousPosition) {
								timeSinceNoPositionChange += deltaTime;
							}
							else{
								timeSinceNoPositionChange = 0;
								adjusted = false;
							}

							if ((timeSinceNoPositionChange >= 120 && !adjusted) || self.needAdjust) {
								adjusted = true;
								self.needAdjust = false;
								self.scrollToSlide(self.currentSlide);
							}

							previousPosition = position;
						}
					}
					

					if (!self.stopLoop) {
						loop();
					}
				})
			})();
		},
		beforeDestroy(){
			this.stopLoop = true;
			this.getSizeClassHelper().off(...this.deviceChangeListenerArguments);
			this.getSizeClassHelper().off(...this.resizeListenerArguments);
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
		position relative

		.size-class-not-width-compact.no-touchevents &
			layout__centeredGridBox(28)

	.Home_page-header-logo
		height 100%
		
		.size-class-not-width-compact.no-touchevents &
			layout__gridBox(8, gridNumberOfColumns: 28)
		
		.size-class-width-compact &,
		.touchevents &
			layout__gridBox(8, gridNumberOfColumns: 30)

		> .LogoXebiaVisMaVie
			width 100%
			height (105 / 570 * 100%)
			max-height 105px
			max-width 260px
			min-width 240px
			min-height 100px
			
			filter__dropShadow 0px 0px 2px rgba(black, 0.62)
	
	.Home_page-header-logo-offset
		width 100%
		height (130 / 570 * 100%)
		
		.size-class-width-compact &,
		.touchevents &
			height 80px
	
	.Home_page-header-characters-scroll-view
		width 100%
		width calc(100% + 40px)
		height 100%
		position absolute
		bottom 0
		left -20px
		
		.size-class-width-compact &,
		.touchevents &
			overflow-y hidden
			overflow-x scroll
			pointer-events auto
			-webkit-overflow-scrolling: touch;
		
		.size-class-not-width-compact.no-touchevents &
			height (250 / 570 * 100%)
			width 100%
			left 0

	.Home_page-header-characters
		clearfix()
		width 800%
		position absolute
		bottom 0
		left 0
		height 55%
		
		.size-class-not-width-compact.no-touchevents &
			width 100%
			height (250 / 570 * 100%)

	.Home_page-header-characters-group
		height 100%
		float left
		clearfix()
		position relative
		z-index 5
		width 50%
		
		.size-class-not-width-compact.no-touchevents &
			left -1.1vw
		
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
		
		.size-class-not-width-compact.no-touchevents &.index-1
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
		
		.size-class-not-width-compact.no-touchevents &.index-4
			left -0.5vw
	
	.Home_page-header-character-image
		position absolute
		bottom 0
		background-size 160px auto
		background-repeat no-repeat
		background-position 10px bottom
		z-index 5
		height 120%
		width 100%
		
		.size-class-not-width-compact.no-touchevents &
			height 270px
			width 160px
			height 20vw
			max-height 300px
			width 15vw
			background-size auto 100%
			background-position center bottom
	
	.Home_page-header-character-widget
		width 67%
		position absolute
		z-index 2
		bottom 40px
		left 90px

		.size-class-not-width-compact.no-touchevents &
			left 75%
			width 25%
			bottom 30px

	.Home_page-header-character-widget-outer-wrapper
		position relative
		overflow hidden
		pointer-events none
		width 100%
		
		.size-class-not-width-compact.no-touchevents &
			width 250px
			width calc(250px + 4vw)
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-5 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-6 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-7 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-8 &
			left -300px
	
	.Home_page-header-character-widget-inner-wrapper
		transition transform 220ms ease__outQuart()
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-1 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-2 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-3 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-4 &
			transform translateX(-101%)
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-5 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-6 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-7 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-8 &
			transform translateX(101%)
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character:hover &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character:focus &
			transform translateX(0)
	
	.Home_page-header-character-info
		background-color color__$blue
		padding-right 15px
	
	_characterWidgetMarginMacro()
		pxValue = 80px
		vwValue = 6.5vw
		
		margin-left 90px
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-1 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-2 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-3 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-4 &
			margin-left pxValue
			margin-left vwValue
			text-align left
			
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-5 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-6 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-7 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-8 &
			margin-right pxValue * 1.3
			margin-right vwValue * 1.3
			margin-left 0
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
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-5 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-6 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-7 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-8 &
			clearfix()
	
	.Home_page-header-character-link-label
		_characterWidgetMarginMacro()
		display block
		width 120px
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-5 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-6 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-7 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-8 &
			float right
	
	.Home_page-header-character-info,
	.Home_page-header-character-link
		margin-top 5px
		padding-top 8px
		padding-bottom 8px
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-1 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-2 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-3 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-4 &
			padding-right 12px
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-5 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-6 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-7 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-8 &
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
		transform rotate(-90deg)
		right 6px
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-1 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-2 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-3 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-4 &
			transform rotate(-90deg)
			right 15px
		
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-5 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-6 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-7 &,
		.size-class-not-width-compact.no-touchevents .Home_page-header-character.index-8 &
			transform rotate(90deg)
			left 15px
	
	.Home_page-header-characters-scroll-view-pagination
		height 12px
		clearfix()
		position absolute
		bottom 10px
		right 0
		z-index 12
		
		.size-class-not-width-compact.no-touchevents &
			display none
	
	.Home_page-header-characters-scroll-view-pagination-link
		button__resetStyle()
		float left
		background-color transparent
		shape__circle(8px)
		border 1px solid white
		pointer-events auto
		
		&:hover, &:focus
			cursor pointer
			background-color rgba(white, 0.5)
		
		&.is--active
			background-color white
	
	.Home_page-header-characters-scroll-view-pagination-link+.Home_page-header-characters-scroll-view-pagination-link
		margin-left 8px
	
	.Home_page-timeline
		margin-top 30px
</style>