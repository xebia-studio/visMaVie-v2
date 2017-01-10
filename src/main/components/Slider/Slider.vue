<template lang="jade">
	.Slider
		.Slider-slides-list
			slot
</template>

<script>

import Swiper from 'swiper'
import { random, isNumber, isFunction } from 'lodash'

export default {
	name: 'Slider',
	data: function () {
		return {
			usePagination : false
		};
	},
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
		},
		onProgress: Function,
		pagination: [String, Object],
		paginationType: String,
		paginationBulletRender: Function
	},
	mounted: function () {
		let options = {
			pagination: this.pagination,
			paginationClickable: true,
			paginationType: this.paginationType,
			paginationBulletRender: this.paginationBulletRender,
			speed: this.speed,
			autoplay: this.autoplay,
			spaceBetween: 0,
			loop: this.loop,
			wrapperClass: 'Slider-slides-list',
			slideClass: 'SliderSlide',
			slideActiveClass: 'active',
			bulletActiveClass: 'active',
			grabCursor: true,
			setWrapperSize: true,
			initialSlide: this.initialSlide === 'random' ? random(0, (this.$children.length - 1)) : (isNumber(this.initialSlide) ? this.initialSlide : 0)
		};

		this.$emit('slideCountChange', this.$children.length);

		this.slider = new Swiper(this.$el, options);
	},
	methods: {
		previousSlide: function (rewind = false) {
			const slider = this.slider; 
			slider.realIndex === 0 && rewind && !this.loop ? slider.slideTo(slider.slides.length - 1) : slider.slidePrev();
		},
		nextSlide: function (rewind = false) {
			const slider = this.slider;
			slider.realIndex === (slider.slides.length - 1) && rewind && !this.loop ? slider.slideTo(0) : slider.slideNext();
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