<template lang="jade">
	.SharingKnowledge_section
		.SharingKnowledge_section-useful-width
			.SharingKnowledge_section-margin-constraints
				TitleBlock(:titleLevel="3", :main="title").SharingKnowledge_section-title
				.SharingKnowledge_section-facts-list-slider-wrapper
					Slider.SharingKnowledge_section-facts-list(:breakpoints='sliderBreakpoints', ref="slider")
						SliderSlide.SharingKnowledge_section-fact-slide(v-for="fact in facts")
							.SharingKnowledge_section-fact hello
</template>

<script>
	import getScrollBarWidth from 'tools/get-scroll-bar-width'

	import data from 'data/nos-valeurs/sharing-knowledge.json';
	import TitleBlock from 'components/TitleBlock'

	import Slider from 'xebia-web-common/components/Slider/Slider'
	import SliderSlide from 'xebia-web-common/components/Slider/SliderSlide'

	import { config as sizeClassHelperConfig } from 'tools/size-class-helper'

	const scrollBarWidth = getScrollBarWidth();

	export default {
		name: 'SharingKnowledge_section',
		data: function() {
			return {
				title: data.title,
				facts: data.facts
			}
		},
		components: {
			TitleBlock,
			Slider,
			SliderSlide
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
				.PublicationsList_cards_list-publication:before
					opacity 1 !important
</style>
