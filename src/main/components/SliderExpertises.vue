<template lang="jade">
	.SliderExpertises
		.SliderExpertises-inner-wrapper
			Slider.SliderExpertises-slider(:autoplay='4000', loop=true, ref='slider', initialSlide='random', pagination='.SliderExpertises-pagination', :paginationBulletRender='paginationBulletRender', @slideCountChange='updateSlideCount')

				SliderSlide.SliderExpertises-slide hello
				SliderSlide.SliderExpertises-slide world
				SliderSlide.SliderExpertises-slide test
				SliderSlide.SliderExpertises-slide hello again

			.SliderExpertises-navigation
				button.SliderExpertises-navigation-previous(@click='previousSlide()', ref='navigationPrevious')
					span précédent
					ArrowBottom
				button.SliderExpertises-navigation-next(@click='nextSlide()', ref='navigationNext')
					span suivant
					ArrowBottom

			.SliderExpertises-pagination(ref='pagination', :style="{width: paginationWidth+ 'px'}")
</template>

<script>

import Slider from 'xebia-web-common/components/Slider/Slider'
import SliderSlide from 'xebia-web-common/components/Slider/SliderSlide'

import { SliderExpertises as settings } from 'settings/components'

import ArrowBottom from 'src/generated/components/ArrowBottom'

export default {
	name: 'SliderExpertises',
	components: {
		Slider, 
		SliderSlide,
		ArrowBottom
	},
	data: function () {
		return {
			slideCount: 0
		}
	},
	computed: {
		paginationWidth: function () {
			const paginationBulletSize = settings.paginationBulletSize + settings.paginationBulletBorderWidth;
			const countBullet = this.slideCount;

			return (countBullet * paginationBulletSize + Math.max(0, countBullet - 1) * settings.paginationBulletsSpaceBetween);
		}
	},
	methods: {
		updateSlideCount: function (count) {
			this.slideCount = count;
		},
		paginationBulletRender: function (swiper, index, className) {
			return '<button class="SliderExpertises-pagination-bullet ' + className + '">' + (index + 1) + '</button>';
		},
		previousSlide: function () {
			const button = this.$refs.navigationPrevious;
			button.blur ? button.blur() : null;

			this.$refs.slider.previousSlide(true)
		},
		nextSlide: function () {
			const button = this.$refs.navigationNext;
			button.blur ? button.blur() : null;

			this.$refs.slider.nextSlide(true)
		}
	}
}
</script>

<style lang="stylus">
	_navigationButtonHeight = 60px
	_navigationButtonWidth = 22px
	_navigationButtonColor = color__$greyMedium
	
	_paginationBulletSize = SliderExpertises__$paginationBulletSize px
	_paginationBulletBorderWidth = SliderExpertises__$paginationBulletBorderWidth px
	_paginationBulletsSpaceBetween = SliderExpertises__$paginationBulletsSpaceBetween px
	
	.SliderExpertises
		width 100%
		overflow hidden

	.SliderExpertises-inner-wrapper
		layout__section()
		position relative
		height 600px
		
	.SliderExpertises-slider
		width 100%
		
		&:after
			content ''
			display block
			clear both
	
	.SliderExpertises-slide
		width 100%
		float left
	
	.SliderExpertises-navigation
		width 100%
		position absolute
		top 0
		
		button
			position absolute
			top 140px + ((_navigationButtonHeight - _navigationButtonWidth) / 2)
			font-size 0
			button__resetStyle()
			display block
			width _navigationButtonHeight
			height _navigationButtonWidth
			transition transform 200ms ease__inOutCubic()
			transform translateY(0)

			path
				fill _navigationButtonColor

			&:hover, &:focus
				cursor pointer
		
		_offsetButton = 28px + ((_navigationButtonWidth - _navigationButtonHeight) / 2)

		.SliderExpertises-navigation-next
			right _offsetButton
			transform rotate(-90deg)
			
			&:hover, &:focus
				transform translateX(5px) rotate(-90deg)

		.SliderExpertises-navigation-previous
			left _offsetButton
			transform rotate(90deg)
			
			&:hover, &:focus
				transform translateX(-5px) rotate(90deg)

	.size-class-width-compact
		.SliderExpertises-navigation
			display none
	
	/*-----------------*/
	/*-----------------*/

	.SliderExpertises-pagination
		display block
		margin-left auto
		margin-right auto
		margin-top 30px
	
	.SliderExpertises-pagination-bullet
		font-size 0
		button__resetStyle()
		shape__circle(_paginationBulletSize, tranparent)
		border _paginationBulletBorderWidth solid _navigationButtonColor
		float left
	
		&:hover, &:focus
			cursor pointer
			background-color lighten(_navigationButtonColor, 10)
		
		&.active
			background-color _navigationButtonColor
		
	.SliderExpertises-pagination-bullet+.SliderExpertises-pagination-bullet
		margin-left _paginationBulletsSpaceBetween

	.size-class-not-width-compact
		.SliderExpertises-pagination
			display none

</style>