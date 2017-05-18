<template lang="jade">
	.SharingKnowledge_section
		.SharingKnowledge_section-useful-width
			.SharingKnowledge_section-margin-constraints
				TitleBlock(:titleLevel="3", :main="title").SharingKnowledge_section-title
				.SharingKnowledge_section-facts-list-slider-wrapper
					Slider.SharingKnowledge_section-facts-list(:paginationBulletRender='paginationBulletRender', :breakpoints='sliderBreakpoints', ref="slider", :pagination='"."+uniquePaginationClass')
						SliderSlide.SharingKnowledge_section-fact-slide(v-for="(fact, index) in facts")
							.SharingKnowledge_section-fact(ref='fact')
								.SharingKnowledge_section-fact-inner-wrapper
									.SharingKnowledge_section-image-outer-wrapper
										.SharingKnowledge_section-image-inner-wrapper
											img.SharingKnowledge_section-image(v-if="imageUrl(fact.image)", :src="imageUrl(fact.image)", alt="")
										.SharingKnowledge_section-image-shadow
									.SharingKnowledge_section-fact-title(v-html="fact.title", ref="fact_title", :style="{height:titlesHeight}")
									.SharingKnowledge_section-fact-description(v-html="fact.description", ref="fact_description", :style="{height:descriptionsHeight}")
									.SharingKnowledge_section-fact-height-completion(:style="{height : factHeightCompletion[index] || '0px'}")
									ArrowLink.SharingKnowledge_section-fact-link(:url="fact.link.url", :label="fact.link.label", :external="fact.link.absolute")
					SliderPagination.SharingKnowledge_section-slider-pagination(:class="uniquePaginationClass", :slideCount="slideCount")
</template>

<script>
	import {domHeight} from '@alexistessier/dom'
	import {nextTick} from 'vue'

	import getScrollBarWidth from 'tools/get-scroll-bar-width'

	import data from 'data/nos-valeurs/sharing-knowledge.json';
	import TitleBlock from 'components/TitleBlock'

	import Slider from 'xebia-web-common/components/Slider/Slider'
	import SliderSlide from 'xebia-web-common/components/Slider/SliderSlide'
	import SliderPagination from 'xebia-web-common/components/SliderPagination'
	import ArrowLink from 'xebia-web-common/components/ArrowLink';

	import { mixin as sizeClassHelper, config as sizeClassHelperConfig } from 'tools/size-class-helper'

	import {mixin as fontLoader} from 'tools/font-loader';

	const scrollBarWidth = getScrollBarWidth();

	let uniquePaginationId = 0;

	function getHeights(elements){
		let heights = [0];
		if (Array.isArray(elements) && elements && elements.length) {
			elements.forEach(el => el.style.height = 'auto !important');
			heights = elements.map(el => domHeight(el));
		}

		return heights;
	}

	export default {
		name: 'SharingKnowledge_section',
		mixins: [sizeClassHelper, fontLoader],
		data: function() {
			return {
				title: data.title,
				facts: data.facts,
				imageUrlCache: {},
				uniquePaginationClass: 'SharingKnowledge_section-slider-pagination-'+(++uniquePaginationId),
				titlesHeight: 'auto',
				descriptionsHeight: 'auto',
				factHeightCompletion: []
			}
		},
		components: {
			TitleBlock,
			Slider,
			SliderSlide,
			SliderPagination,
			ArrowLink
		},
		methods: {
			paginationBulletRender: SliderPagination.methods.paginationBulletRender,
			imageUrl: function (image) {
				return this.imageUrlCache[image] ? this.imageUrlCache[image] : false;
			},
			updateLayoutOnResize: function () {
				this.titlesHeight = 'auto';
				this.descriptionsHeight = 'auto';
				this.factHeightCompletion = [];

				nextTick(()=>{
					const widthCompact = this.getSizeClassHelper().isActive('width-compact');

					if (!widthCompact) {
						const titleHeights = getHeights(this.$refs.fact_title);
						const descriptionHeights = getHeights(this.$refs.fact_description);

						const maxTitleHeight = Math.max(...titleHeights);
						const maxDescriptionHeight = Math.max(...descriptionHeights);

						this.titlesHeight = maxTitleHeight ? maxTitleHeight+'px' : 'auto';
						this.descriptionsHeight = maxDescriptionHeight ? maxDescriptionHeight+'px' : 'auto';
					}
					else{
						const factHeights = getHeights(this.$refs.fact);
						const max = Math.max(...factHeights);

						this.factHeightCompletion = factHeights.map(h => (max - h)+'px');
					}
				})
			}
		},
		computed: {
			slideCount: function () {
				return this.facts.length;
			},
			sliderBreakpoints: function () {
				const conf = {};
				conf[sizeClassHelperConfig['width-compact'].maxWidth+scrollBarWidth] = {
					slidesPerView: 1,
					centeredSlides: true,
					spaceBetween: 20
				};

				//Infinity
				//Must be defined, otherwise the pagination is bugged when switching from one breakpoints to an other
				conf[Infinity] = {
					slidesPerView: this.facts.length,
					centeredSlides: false,
					spaceBetween: 0
				};
				return conf;
			}
		},
		created: function () {
			this.loadFont({
				title : 'regular',
				text: 'regular'
			}, {
				fontactive : () => {
					this.activeFont = this.activeFont ? (this.activeFont + 1) : 1;
					if (this.activeFont >= 2) {
						this.updateLayoutOnResize();
					}
				}
			});

			const sizeClassHelper = this.getSizeClassHelper();

			sizeClassHelper.setSizeClass('sharing-knowledge-section-medium-width', {
				minWidth: sizeClassHelperConfig['width-compact'].maxWidth+121,
				maxWidth: sizeClassHelperConfig['width-regular'].maxWidth-100
			});

			sizeClassHelper.setSizeClass('sharing-knowledge-section-compact-width', {
				minWidth: sizeClassHelperConfig['width-compact'].maxWidth+1,
				maxWidth: sizeClassHelperConfig['width-compact'].maxWidth+120
			});

			require.ensure([],  require => {
				this.facts.forEach(fact => {
					this.imageUrlCache[fact.image] = require('generated/assets/components/SharingKnowledge_section/images/'+fact.image);
				});

				this.$forceUpdate()
				this.updateLayoutOnResize();
			});

			const resize = () => {
				this.updateLayoutOnResize();
			};

			this.resizeListenerArguments = ['resize', resize];
			sizeClassHelper.on(...this.resizeListenerArguments);
		},
		mounted: function () {
			this.updateLayoutOnResize();
		},
		beforeDestroy : function() {
			this.getSizeClassHelper().off(...this.resizeListenerArguments);
		},
	};
</script>

<style lang="stylus">
	.SharingKnowledge_section
		background-color: color__$sectionEven
		border-top 1px solid color__$greyMedium
		border-bottom 1px solid color__$greyMedium
		padding-top 60px
		padding-bottom 80px
		
		.size-class-width-compact &
			padding-bottom 35px
			padding-top 35px
	
	.SharingKnowledge_section-useful-width
		layout__outerBox()
	.SharingKnowledge_section-margin-constraints
		layout__innerBox()
	
	.SharingKnowledge_section-title,
	.SharingKnowledge_section-facts-list-slider-wrapper
		layout__centeredGridBox(28)
		
	.SharingKnowledge_section-title+.SharingKnowledge_section-facts-list-slider-wrapper
		margin-top 20px
	
	.SharingKnowledge_section-facts-list
		.size-class-width-compact &
			clearfix()
			width 100%
		
		.size-class-not-width-compact &
			.Slider-slides-list
				transform translate3d(0px, 0px, 0px) !important;
				&:hover
					cursor auto

				layout__grid('.SharingKnowledge_section-fact-slide', 28, 3, 2, 40px, widthImportant: true)
	
	.SharingKnowledge_section-fact-slide
		.size-class-width-compact &
			float left
			
			&.is--active
				.SharingKnowledge_section-fact:before
					opacity 1 !important
	
	.SharingKnowledge_section-fact
		position relative
		padding-bottom 2em
		padding-bottom calc(2em + 20px)
		
		.size-class-width-compact &
			xebiaUI__cardBorder()
			xebiaUI__borderRadius()
			xebiaUI__hoverShadow()
			background-color white
			padding-bottom calc(1em + 30px)
	
	.SharingKnowledge_section-fact-inner-wrapper
		.size-class-width-compact &
			margin 15px 20px
	
	.SharingKnowledge_section-image-outer-wrapper
		width 100%
		height 200px
		overflow hidden
		position relative
		
		.size-class-sharing-knowledge-section-medium-width &
			height 160px
		
		.size-class-sharing-knowledge-section-compact-width &
			height 120px
	
	.SharingKnowledge_section-image-inner-wrapper
		max-width 100%
		height 250px
		width 100%
		margin-left auto
		margin-right auto
		text-align center

	.SharingKnowledge_section-image
		max-height 150%
		max-width 100%
	
	.SharingKnowledge_section-image-shadow
		position absolute
		width 100%
		height 100%
		overflow hidden
		z-index 2
		top 0
		left 0
		
		&:before
			content ''
			display block
			position absolute
			z-index 2
			box-shadow 0px 0px 45px
			border-radius 50%
			opacity 0.9
			width 100%
			height 80px
			bottom -82px
			left 0
		
	.SharingKnowledge_section-image-outer-wrapper+.SharingKnowledge_section-fact-title
		margin-top 40px
	
	.SharingKnowledge_section-fact-title
		font__useTitleRegular 30px
		line-height (font__$cardTitleLineHeight) px
		color color__$title
	
	.SharingKnowledge_section-fact-title+.SharingKnowledge_section-fact-description
		margin-top 30px
		
		.size-class-width-compact &
			margin-top 10px

	.SharingKnowledge_section-fact-description
		color color__$text
		font__useTextRegular 15px
		font__line-height 22
	
	.SharingKnowledge_section-fact-link
		position absolute
		bottom 0
		left 0
		white-space: nowrap
		
		.size-class-width-compact &
			bottom 20px
			left 20px
	
	.SharingKnowledge_section-fact-height-completion
		display block
		width 100%

	.SharingKnowledge_section-facts-list+.SharingKnowledge_section-slider-pagination
		margin-top 15px
		margin-left auto
		margin-right auto

	.SharingKnowledge_section-slider-pagination
		.size-class-not-width-compact &
			display none
</style>
