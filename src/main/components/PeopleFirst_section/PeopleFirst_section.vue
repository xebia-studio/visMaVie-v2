<template lang="jade">
	.PeopleFirst_section
		.PeopleFirst_section-useful-width
			.PeopleFirst_section-margin-constraints
				TitleBlock(:titleLevel="3", :main="title").PeopleFirst_section-title
				ContentBlock(v-if="introduction && introduction.length", :blocks="[{isText: true, content:introduction}]").PeopleFirst_section-introduction
		.PeopleFirst_section-quotes-slider-outer-wrapper
			.PeopleFirst_section-useful-width
				.PeopleFirst_section-margin-constraints.PeopleFirst_section-margin-constraints-bis
					.PeopleFirst_section-quotes-slider-inner-wrapper
						.PeopleFirst_section-quote-decoration
							QuoteDecoration
						.PeopleFirst_section-quotes-list-slider-wrapper
							Slider.PeopleFirst_section-quotes-list(:centeredSlides="true", :paginationBulletRender='paginationBulletRender', ref="slider", :pagination='"."+uniquePaginationClass')
								SliderSlide.PeopleFirst_section-quote-slide(v-for="(quote, index) in quotes")
									Quote(v-bind="quote").PeopleFirst_section-quote
							SliderPagination.PeopleFirst_section-slider-pagination(:class="uniquePaginationClass", :slideCount="slideCount")
						.PeopleFirst_section-quote-image
</template>

<script>
	import data from 'data/nos-valeurs/people-first.json';
	import TitleBlock from 'components/TitleBlock';
	import ContentBlock from 'components/ContentBlock';
	import Quote from 'components/Quote';

	import Slider from 'xebia-web-common/components/Slider/Slider';
	import SliderSlide from 'xebia-web-common/components/Slider/SliderSlide';
	import SliderPagination from 'xebia-web-common/components/SliderPagination';

	import QuoteDecoration from 'generated/assets/components/PeopleFirst_section/QuoteDecoration';

	import {mixin as sizeClassHelper} from 'tools/size-class-helper'

	let uniquePaginationId = 0;

	export default {
		name: 'PeopleFirst_section',
		mixins: [sizeClassHelper],
		data: function() {
			return {
				title: data.title,
				introduction: data.introduction,
				quotes: data.quotes,
				uniquePaginationClass: 'PeopleFirst_section-slider-pagination-'+(++uniquePaginationId)
			}
		},
		components: {
			TitleBlock,
			ContentBlock,
			Slider,
			SliderSlide,
			SliderPagination,
			QuoteDecoration,
			Quote
		},
		methods: {
			updateLayoutOnResize: function () {
				this.updateSlider();
			},
			paginationBulletRender: SliderPagination.methods.paginationBulletRender,
			updateSlider: function () {
				requestAnimationFrame(()=>{
					if(this.exists && this.$refs.slider){
						this.$refs.slider.update(true)
					}
				});
			}
		},
		computed: {
			slideCount: function () {
				return this.quotes.length;
			}
		},
		created: function () {
			this.exists = true;

			const sizeClass = this.getSizeClassHelper();

			sizeClass.setSizeClass('people-first-section-width-compact', {
				minWidth: 0,
				maxWidth: 960
			});

			const resize = ()=>{
				this.updateLayoutOnResize();
			}

			this.resizeListenerArguments = ['resize', resize];
			sizeClass.on(...this.resizeListenerArguments);
		},
		mounted: function () {
			this.updateLayoutOnResize();
		},
		beforeDestroy: function () {
			this.exists = false;
			
			if (this.resizeListenerArguments) {
				this.getSizeClassHelper().off(...this.resizeListenerArguments);
			}
		}
	};
</script>

<style lang="stylus">
	PeopleFirst_section__$backgroundColor = color__$neutral75

	.PeopleFirst_section
		xebiaUI__section('odd')
		border-top 0
	
	.PeopleFirst_section-useful-width
		layout__outerBox()
	.PeopleFirst_section-margin-constraints
		layout__innerBox()
	
	.PeopleFirst_section-margin-constraints-bis
		.size-class-people-first-section-width-compact &
			width 100%
			margin 0
	
	.PeopleFirst_section-title,
	.PeopleFirst_section-introduction
		layout__centeredGridBox(28)

	.PeopleFirst_section-quotes-slider-inner-wrapper
		.size-class-not-people-first-section-width-compact &
			layout__centeredGridBox(28)
	
	.PeopleFirst_section-useful-width+.PeopleFirst_section-quotes-slider-outer-wrapper
		margin-top 50px
		
		.size-class-people-first-section-width-compact &
			margin-top 40px
	
	.PeopleFirst_section-quotes-slider-outer-wrapper
		position relative
		
		.size-class-not-people-first-section-width-compact &
			&:before
				content ''
				display block
				height 100%
				width 50%
				position absolute
				top 0
				z-index 0
				right 0
				background-color PeopleFirst_section__$backgroundColor
			
		> .PeopleFirst_section-useful-width
			position relative
			z-index 1
	
	.PeopleFirst_section-quotes-slider-inner-wrapper
		clearfix()
		position relative
	
	.PeopleFirst_section-quote-decoration,
	.PeopleFirst_section-quotes-list-slider-wrapper
		float left
	
	.PeopleFirst_section-quote-decoration
		.size-class-people-first-section-width-compact &
			layout__gridBox(4, gridNumberOfColumns: 32)
		.size-class-not-people-first-section-width-compact &
			layout__gridBox(1.5, gridNumberOfColumns: 28)
		
		> .QuoteDecoration
			display block
			max-width 100%
	
	.PeopleFirst_section-quotes-list-slider-wrapper
		.size-class-people-first-section-width-compact &
			layout__gridBox(28, gridNumberOfColumns: 32)
		.size-class-not-people-first-section-width-compact &
			layout__gridBox(19, gridNumberOfColumns: 28)
		background-color PeopleFirst_section__$backgroundColor
		position relative
		border-bottom-left-radius 25px
	
	.PeopleFirst_section-quotes-list
		overflow hidden
		clearfix()
	
	.PeopleFirst_section-quote-slide
		float left
	
	.PeopleFirst_section-quote
		margin 30px 40px 30px 30px
		
		.size-class-people-first-section-width-compact &
			margin-right (4 / 28 * 100%)
			margin-top 20px
			margin-left 20px
			margin-bottom 35px
	
	.PeopleFirst_section-slider-pagination
		position absolute
		bottom 30px
		right 40px
		width auto !important
		
		.size-class-people-first-section-width-compact &
			right (2 / 28 * 100%)
			bottom 15px
		
		.SliderPagination-pagination-bullet+.SliderPagination-pagination-bullet
			margin-left 10px

	.PeopleFirst_section-quote-image
		position absolute
		display block
		width (7.5 / 28 * 100%)
		height 100%
		max-height 200px
		top 0
		right 0
		background-image url('~assets/images/image-nos-valeurs-people-first.jpg')
		background-repeat no-repeat
		background-position center center
		background-size cover
		
		.size-class-people-first-section-width-compact &
			display none
</style>
