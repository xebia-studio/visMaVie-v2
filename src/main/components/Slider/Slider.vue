<template lang="jade">
	.Slider
		.Slider-slides-list
			slot
</template>

<script>

import Swiper from 'swiper'
import { random, isNumber } from 'lodash'

export default {
	name: 'Slider',
	props: {
		initialSlide : {
			type: [String, Number],
			default: 0
		},
		loop : {
			type : Boolean,
			default: false
		},
		autoplay : {
			type: Number,
			default: 0
		},
		speed : {
			type: Number,
			default: 400
		}
	},
	mounted: function () {
		this.slider = new Swiper(this.$el, {
			speed: this.speed,
			autoplay: this.autoplay,
			spaceBetween: 0,
			loop: this.loop,
			wrapperClass: 'Slider-slides-list',
			slideClass: 'SliderSlide',
			slideActiveClass: 'active',
			grabCursor: true,
			setWrapperSize: true,
			initialSlide: this.initialSlide === 'random' ? random(0, (this.$children.length - 1)) : (isNumber(this.initialSlide) ? this.initialSlide : 0),
			onProgress: function (swiper, progress) {
				console.log(progress)
			}
		});
	},
	methods: {
		previousSlide: function () {
			this.slider.slidePrev();
		},
		nextSlide: function () {
			this.slider.slideNext();
		}
	},
	destroyed: function () {
		if(this.slider){
			this.slider.destroy(true, true);
		}
	}
}
</script>

<style lang="stylus">
</style>