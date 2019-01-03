<template lang="jade">
	AppPage.AppSimplePage(:scrollPositionToReachBeforeLightBackground="scrollPositionToReachBeforeLightBackground")
		BlurryHeaderLayer(:configScreenFiller="configScreenFiller", @resize="headerResize", :title="header.title", :description="header.description", :image="header.image", :description_image="header.image_description", ref="blurryHeader", :titleLevel="header.titleLevel", :headerImageCacheSetter="header.imageCacheSetter")
		.AppSimplePage-in-header-block(ref='inHeaderContainer')
			slot(name='inHeader')

		slot
</template>

<script>

import BlurryHeaderLayer from 'xebia-web-common/components/BlurryHeaderLayer'

import AppPage from 'components/AppPage'

import layoutSettings from 'settings/layout'

import { domHeight } from '@alexistessier/dom'

export default {
	name: 'AppSimplePage',
	mixins: AppPage.mixins,
	components: {
		AppPage,
		BlurryHeaderLayer
	},
	props: {
		configScreenFiller: {
			type: Object,
			default: function () {
				return {
					'width-compact': '500px',
					'default': (height) => {
						const inHeaderContainerHeight = this.$refs.inHeaderContainer ? domHeight(this.$refs.inHeaderContainer) : 0;
						return (layoutSettings.headerBlockHeight/layoutSettings.screenHeightIdeal*height - inHeaderContainerHeight)+'px';
					}
				}
			}
		},
		header: {
			type: Object,
			default: function () {
				return {};
			}
		}
	},
	data: function () {
		return {
			scrollPositionToReachBeforeLightBackground: undefined
		}
	},
	methods: {
		headerResize: function (headerHeight) {
			this.scrollPositionToReachBeforeLightBackground = parseInt(headerHeight, 10);
		}
	}
}
</script>
<style lang="stylus">
    .size-class-width-compact .BlurryHeader-content
        padding-top 145px !important
</style>
