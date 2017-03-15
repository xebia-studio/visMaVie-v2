<template lang="jade">
	.CookiesBar(:class="{'is--hidden': isHidden}")
		.CookiesBar-page-padding(:style="{height: finalPagePaddingHeight}")
		.CookiesBar-inner-wrapper(ref="innerWrapper")
			.CookiesBar-useful-width-box
				.CookiesBar-margin-box
					.CookiesBar-content
						.CookiesBar-content-text
							.CookiesBar-message {{message}}
							.CookiesBar-link-outer-wrapper
								router-link.CookiesBar-link(:to="'/'+link_url") {{link_label}}
						CallToActionButton.CookiesBar-validation-button(label="OK", :clickable="true", @click="acceptCookies")
</template>

<script>

import cookies from 'js-cookie';

import {domHeight} from '@alexistessier/dom';

import CallToActionButton from 'xebia-web-common/components/CallToActionButton';

import {mixin as sizeClassHelper} from 'tools/size-class-helper';
import {mixin as fontLoader} from 'tools/font-loader';
import {mixin as scrollController} from 'tools/scroll-controller';

import data from 'data/cookies-bar/$settings.yaml';

const acceptCookiesMarker = 'xebia-vis-ma-vie-accept-cookies';

function cookiesAccepted() {
	return cookies.get(acceptCookiesMarker) === 'yes';
}

let isHidden = false;

export default {
	name: 'CookiesBar',
	mixins: [fontLoader, scrollController, sizeClassHelper],
	components: {
		CallToActionButton
	},
	data: function () {
		return Object.assign({}, data, {
			isHidden: cookiesAccepted() || isHidden,
			pagePaddingHeight: '0px'
		});
	},
	computed: {
		finalPagePaddingHeight: function () {
			return this.isHidden ? '0px' : this.pagePaddingHeight;
		}
	},
	methods: {
		acceptCookies: function () {
			cookies.set(acceptCookiesMarker, 'yes');
			this.hide();
		},
		hide: function () {
			this.isHidden = isHidden = true;
		},
		updateLayoutOnResize: function () {
			this.pagePaddingHeight = '0px';
			if (this.$refs.innerWrapper) {
				this.pagePaddingHeight = domHeight(this.$refs.innerWrapper)+'px';
			}
		}
	},
	created: function () {
		this.loadFont({
			text: 'thin'
		});

		const scrollController = this.getScrollController();

		const scroll = scroll=>{
			if (scroll.change && scroll.position >= 220) {
				this.hide();
			}
		};

		setTimeout(()=>{
			this.scrollListenerArguments = ['scroll', scroll];
			scrollController.on(...this.scrollListenerArguments);
		}, 2000);

		const sizeClassHelper = this.getSizeClassHelper();

		const resize = () => {
			this.updateLayoutOnResize();
		};

		this.resizeListenerArguments = ['resize', resize];
		sizeClassHelper.on(...this.resizeListenerArguments);
	},
	beforeDestroy: function () {
		this.getSizeClassHelper().off(...this.resizeListenerArguments);
		if (this.scrollListenerArguments) {
			this.getScrollController().off(...this.scrollListenerArguments);
		}
	}
};
</script>

<style lang="stylus">
	.CookiesBar-inner-wrapper
		position fixed
		z-index 120
		background-color color__$blue
		bottom 0
		left 0
		width 100%
		border-top 1px solid white
		padding-bottom 15px
		padding-top 15px
		transform translateY(0)
		transition transform 320ms ease__inOutQuad()

		.CookiesBar.is--hidden &
			transform translateY(100%)
	
	.CookiesBar-useful-width-box
		layout__outerBox()
	
	.CookiesBar-margin-box
		layout__innerBox()
	
	.CookiesBar-content
		layout__gridBox(26, tab: 3)
		clearfix()

	.CookiesBar-content-text
		float left
	
	.CookiesBar-validation-button
		float right
		
	.CookiesBar-content-text
		layout__gridBox(24, gridNumberOfColumns: 26)

	.CookiesBar-message,
	.CookiesBar-link
		font__useTextThin 12
		font__line-height 16
		color white
	
	.CookiesBar-message+.CookiesBar-link-outer-wrapper
		margin-top 5px
	
	.CookiesBar-link
		text-decoration underline
		
		&:hover, &:focus
			color color__$uiEnabled
</style>
