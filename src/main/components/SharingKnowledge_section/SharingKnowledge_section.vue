<template lang="jade">
	.SharingKnowledge_section
		.SharingKnowledge_section-useful-width
			.SharingKnowledge_section-margin-constraints
				TitleBlock(:titleLevel="3", :main="title").SharingKnowledge_section-title
				.SharingKnowledge_section-facts-list-slider-wrapper
					Slider.SharingKnowledge_section-facts-list(:breakpoints='sliderBreakpoints', ref="slider")
						SliderSlide.SharingKnowledge_section-fact-slide(v-for="fact in facts")
							.SharingKnowledge_section-fact
								.SharingKnowledge_section-fact-inner-wrapper
									.SharingKnowledge_section-image-outer-wrapper
										.SharingKnowledge_section-image-inner-wrapper
											img.SharingKnowledge_section-image(v-if="imageUrl(fact.image)", :src="imageUrl(fact.image)", alt="")
									.SharingKnowledge_section-fact-title(v-html="fact.title")
</template>

<script>
	import getScrollBarWidth from 'tools/get-scroll-bar-width'

	import data from 'data/nos-valeurs/sharing-knowledge.json';
	import TitleBlock from 'components/TitleBlock'

	import Slider from 'xebia-web-common/components/Slider/Slider'
	import SliderSlide from 'xebia-web-common/components/Slider/SliderSlide'

	import { config as sizeClassHelperConfig } from 'tools/size-class-helper'

	import {mixin as fontLoader} from 'tools/font-loader';

	const scrollBarWidth = getScrollBarWidth();

	export default {
		name: 'SharingKnowledge_section',
		mixins: [fontLoader],
		data: function() {
			return {
				title: data.title,
				facts: data.facts,
				imageUrlCache: {}
			}
		},
		components: {
			TitleBlock,
			Slider,
			SliderSlide
		},
		methods: {
			imageUrl: function (image) {
				return this.imageUrlCache[image] ? this.imageUrlCache[image] : false;
			}
		},
		computed: {
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
	          'title' : 'regular'
	        });

	        require.ensure([],  require => {
	        	this.facts.forEach(fact => {
	        		this.imageUrlCache[fact.image] = require('generated/assets/components/SharingKnowledge_section/images/'+fact.image);
	        	});

	        	this.$forceUpdate()
	        });
		}
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
		.size-class-width-compact &
			xebiaUI__cardBorder()
			xebiaUI__borderRadius()
			xebiaUI__hoverShadow()
			background-color white
	
	.SharingKnowledge_section-fact-inner-wrapper
		.size-class-width-compact &
			margin 15px 20px
	
	.SharingKnowledge_section-image-outer-wrapper
		width 100%
		height 200px
		overflow hidden
	
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
		
	.SharingKnowledge_section-image-outer-wrapper+.SharingKnowledge_section-fact-title
		margin-top 40px
	
	.SharingKnowledge_section-fact-title
		font__useTitleRegular 30px
		line-height (font__$cardTitleLineHeight) px
		color color__$title
			
</style>
