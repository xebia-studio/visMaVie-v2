<template lang="jade">
	.CustomerIntimacy_section
		.CustomerIntimacy_section-useful-width
			.CustomerIntimacy_section-margin-constraints
				TitleBlock(:titleLevel="3", :main="title").CustomerIntimacy_section-title
				ContentBlock(:blocks="[{isText: true, content:introduction}]").CustomerIntimacy_section-introduction
				.CustomerIntimacy_section-content
					.CustomerIntimacy_section-image
					Slider.CustomerIntimacy_section-quotes-list(:paginationBulletRender='paginationBulletRender', :breakpoints='sliderBreakpoints', ref="slider", :pagination='"."+uniquePaginationClass')
						SliderSlide.CustomerIntimacy_section-quote-slide(v-for="(quote, index) in quotes")
							Quote(v-bind="quote").CustomerIntimacy_section-quote
					SliderPagination.CustomerIntimacy_section-slider-pagination(:class="uniquePaginationClass", :slideCount="slideCount")
</template>

<script>
	import {nextTick} from 'vue'

	import getScrollBarWidth from 'tools/get-scroll-bar-width'

	import data from 'data/nos-valeurs/customer-intimacy.json'
	import TitleBlock from 'components/TitleBlock'
	import ContentBlock from 'components/ContentBlock'
	import Quote from 'components/Quote'

	import Slider from 'xebia-web-common/components/Slider/Slider'
	import SliderSlide from 'xebia-web-common/components/Slider/SliderSlide'
	import SliderPagination from 'xebia-web-common/components/SliderPagination'

	import { mixin as sizeClassHelper, config as sizeClassHelperConfig } from 'tools/size-class-helper'

	import {mixin as fontLoader} from 'tools/font-loader';

	const scrollBarWidth = getScrollBarWidth();

	let uniquePaginationId = 0;

	export default {
		name: 'CustomerIntimacy_section',
		mixins: [sizeClassHelper, fontLoader],
		data: function() {
			return {
				title: data.title,
				introduction: data.introduction,
				quotes: data.quotes,
				imageUrlCache: {},
				uniquePaginationClass: 'CustomerIntimacy_section-slider-pagination-'+(++uniquePaginationId)
			}
		},
		components: {
			TitleBlock,
			ContentBlock,
			Quote,
			Slider,
			SliderSlide,
			SliderPagination
		},
		computed: {
			slideCount: function () {
				return this.quotes.length;
			},
			sliderBreakpoints: function () {
				const conf = {};
				conf[sizeClassHelperConfig['width-compact'].maxWidth+scrollBarWidth] = {
					slidesPerView: 1,
					centeredSlides: true,
					spaceBetween: 60
				};

				//Infinity
				//Must be defined, otherwise the pagination is bugged when switching from one breakpoints to an other
				conf[Infinity] = {
					slidesPerView: this.slideCount,
					centeredSlides: false,
					spaceBetween: 0
				};
				return conf;
			}
		},
		methods: {
			paginationBulletRender: SliderPagination.methods.paginationBulletRender
		}
	};
</script>

<style lang="stylus">
	.CustomerIntimacy_section
		xebiaUI__section('even')
	
	.CustomerIntimacy_section-useful-width
		layout__outerBox()
	.CustomerIntimacy_section-margin-constraints
		layout__innerBox()
	
	.CustomerIntimacy_section-title,
	.CustomerIntimacy_section-introduction,
	.CustomerIntimacy_section-content
		layout__centeredGridBox(28)
		
	.CustomerIntimacy_section-introduction+.CustomerIntimacy_section-content
		margin-top 45px
		
		.size-class-width-compact &
			margin-top 40px
	
	.CustomerIntimacy_section-content
		position relative

	.CustomerIntimacy_section-image
		background-repeat no-repeat
		background-size contain
		
		.size-class-not-width-compact &
			layout__gridBox(7, gridNumberOfColumns: 28)
			position absolute
			top 0
			left 0
			height 100%
			background-image url('~assets/images/svg/illustration-customer-intimacy.svg')
			background-position left center
		
		.size-class-width-compact &
			background-image url('~assets/images/svg/illustration-customer-intimacy-mobile.svg')
			height 222px
			width 100%
			background-position center center

	.CustomerIntimacy_section-image+.CustomerIntimacy_section-quotes-list
		.size-class-width-compact &
			margin-top 40px

	.CustomerIntimacy_section-quotes-list
		.size-class-width-compact &
			clearfix()

		.size-class-not-width-compact &
			layout__gridBox(20, gridNumberOfColumns: 28, tab:8)
			
			.Slider-slides-list
				transform translate3d(0px, 0px, 0px) !important;
				&:hover
					cursor auto
	
	.CustomerIntimacy_section-quote-slide
		.size-class-not-width-compact &
			width 100% !important
		
		.size-class-width-compact &
			float left
	
	.CustomerIntimacy_section-quote-slide+.CustomerIntimacy_section-quote-slide
		.size-class-not-width-compact &
			margin-top 36px

	.CustomerIntimacy_section-quotes-list+.CustomerIntimacy_section-slider-pagination
		margin-top 30px

	.CustomerIntimacy_section-slider-pagination
		margin-left auto
		margin-right auto

		.size-class-not-width-compact &
			display none
</style>
