<template lang="jade">
    .CardSlider
        Slider.CardSlider-slider(:breakpoints='sliderBreakpoints', ref='slider', @slideCountChange='updateSlideCount', loop=true, :speed='800', :spaceBetween='20', pagination='.CardSlider-pagination', :paginationBulletRender='paginationBulletRender')
            SliderSlide.CardSlider-slide(v-for="card in cards", ref="card")
                .CardSlider-slide-inner-wrapper
                    .Card-image(:is="svgComponent(card.image)")
                    .Card-title(v-html="card.title")
                    .Card-text(v-html="card.text")
        .CardSlider-pagination(ref='pagination', :style="{width: '100%'}")
</template>

<script>
import { mixin as svgComponent } from 'tools/svg-component';
import { mixin as sizeClassHelper, config as sizeClassHelperConfig } from 'tools/size-class-helper';

import { CardSlider as settings } from 'settings/components';

import Slider from 'xebia-web-common/components/Slider/Slider';
import SliderSlide from 'xebia-web-common/components/Slider/SliderSlide';

import getScrollBarWidth from 'scrollbar-width';
const scrollBarWidth = getScrollBarWidth();

export default {
	name: 'CardSlider',
	mixins: [svgComponent, sizeClassHelper],
	props: {
	    cards: {
	        required: true
	    }
	},
	data: function () {
	    return {
	        slideCount: 0
	    };
	},
	computed: {
	    paginationWidth: function () {
			const paginationBulletSize = settings.paginationBulletSize + settings.paginationBulletBorderWidth;
			const countBullet = this.slideCount;

			return (countBullet * paginationBulletSize + Math.max(0, countBullet - 1) * settings.paginationBulletsSpaceBetween);
		},
	    sliderBreakpoints: function () {
			const conf = {};
			conf[sizeClassHelperConfig['width-compact'].maxWidth+scrollBarWidth] = {
				slidesPerView: settings.sizeClassCompactSlidesPerView
			};

			//Infinity
			//Must be defined, otherwise the pagination is bugged when switching from one breakpoints to an other
			conf[Infinity] = {
				slidesPerView: 1
			};
			return conf;
		}
	},
	methods: {
	    updateSlideCount: function (count) {
			this.slideCount = count;
		},
		paginationBulletRender: function (swiper, index, className) {
			return '<button type="button" class="CardSlider-pagination-bullet ' + className + '">' + (index + 1) + '</button>';
		},
		updateLayoutOnDeviceChange: function () {
			this.$refs.slider ? this.$refs.slider.update(true) : null;
		}
	},
	created: function () {
		const sizeClassHelper = this.getSizeClassHelper();

		const change = () => {
			this.updateLayoutOnDeviceChange();
		};
		this.deviceChangeListenerArguments = ['change', change];
		sizeClassHelper.on(...this.deviceChangeListenerArguments);
	},
	mounted: function () {
		this.updateLayoutOnDeviceChange();
	},
	beforeDestroy: function () {
		this.getSizeClassHelper().off(...this.deviceChangeListenerArguments);
	},
	components: {
	    Slider,
	    SliderSlide
	}
};
</script>

<style lang="stylus">
    _navigationButtonColor = color__$greyMedium

    _paginationBulletSize = CardSlider__$paginationBulletSize px
    _paginationBulletBorderWidth = CardSlider__$paginationBulletBorderWidth px
    _paginationBulletsSpaceBetween = CardSlider__$paginationBulletsSpaceBetween px

    .CardSlider
        width 100%
        position relative
        .size-class-width-compact &
            overflow hidden
            _width = (100% * CardSlider__$sizeClassCompactSlidesPerView)
            width _width
            right ( (_width - 100) / 2 )

    .CardSlider-slider
        width 100%
        &:after
            content ''
            display block
            clear both
        .size-class-width-compact &
            width (560 / 640 * 100%)
            margin-right auto
            margin-left auto

    .CardSlider-slide
        width 100%
        float left

    .CardSlider-slide-inner-wrapper
        layout__outerBox()

    .CardSlider-pagination
        display block
        margin-left auto
        margin-right auto
        margin-top 20px
        .size-class-not-width-compact &
            display none

    .CardSlider-pagination-bullet
        font-size 0
        button__resetStyle()
        shape__circle(_paginationBulletSize, tranparent)
        border _paginationBulletBorderWidth solid _navigationButtonColor
        float left
        background-color white

        &:hover, &:focus
            cursor pointer
            background-color lighten(_navigationButtonColor, 10)

        &.is--active
            background-color _navigationButtonColor

    .CardSlider-pagination-bullet + .CardSlider-pagination-bullet
        margin-left _paginationBulletsSpaceBetween


</style>
