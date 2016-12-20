<template lang="jade">
	.SliderExpertises
		Slider.SliderExpertises-slider(:autoplay='4000', loop=true, ref='slider')
			SliderSlide.SliderExpertises-slide hello 
			SliderSlide.SliderExpertises-slide world
			SliderSlide.SliderExpertises-slide test
			SliderSlide.SliderExpertises-slide hello again
		.SliderExpertises-navigation
			button.SliderExpertises-navigation-previous(@click='previousSlide()')
				span précédent
				ArrowBottom
			button.SliderExpertises-navigation-next(@click='nextSlide()')
				span suivant
				ArrowBottom
</template>

<script>

import Slider from 'components/Slider/Slider'
import SliderSlide from 'components/Slider/SliderSlide'

import ArrowBottom from 'src/generated/components/ArrowBottom'

export default {
	name: 'SliderExpertises',
	components: {
		Slider, 
		SliderSlide,
		ArrowBottom
	},
	methods: {
		previousSlide: function () {
			const button = this.$el.querySelector('.SliderExpertises-navigation-previous');
			button.blur ? button.blur() : null;

			this.$refs.slider.previousSlide()
		},
		nextSlide: function () {
			const button = this.$el.querySelector('.SliderExpertises-navigation-next');
			button.blur ? button.blur() : null;

			this.$refs.slider.nextSlide()
		}
	}
}
</script>

<style lang="stylus">
	_navigationButtonHeight = 60px
	_navigationButtonWidth = 22px
	
	.SliderExpertises
		layout__section()
		position relative
		height 600px
		
	.SliderExpertises-slider
		width 100%
	
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
				fill color__$greyMedium

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
</style>