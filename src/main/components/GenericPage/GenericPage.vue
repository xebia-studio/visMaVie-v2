<template lang="jade">
	AppPage.GenericPage(:scrollPositionToReachBeforeLightBackground="scrollPositionToReachBeforeLightBackground")
		BlurryHeaderLayer(:configScreenFiller="configScreenFiller", @resize="headerResize", :image="header.image", :description_image="header.image_description", :headerImageCacheSetter="header.imageCacheSetter").GenericPage-header
			VisMaVieCommonHeaderContent.GenericPage-header-content

		ParallaxedLayer.GenericPage-content-layer
			.GenericPage-usefull-width-box
				.GenericPage-margin-box
					TitleBlock(:titleLevel="3", v-if="title || baseline", :main="title", :secondary="baseline").GenericPage-title
					ContentBlock(:blocks="block_content").GenericPage-content
</template>

<script>

import BlurryHeaderLayer from 'xebia-web-common/components/BlurryHeaderLayer';
import ParallaxedLayer from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayer';

import VisMaVieCommonHeaderContent from 'components/VisMaVieCommonHeaderContent';

import AppPage from 'components/AppPage';
import TitleBlock from 'components/TitleBlock';
import ContentBlock from 'xebia-web-common/components/ContentBlock'

import layoutSettings from 'settings/layout'

export default {
	name: 'GenericPage',
    mixins: AppPage.mixins,
	components: {
		AppPage,
		VisMaVieCommonHeaderContent,
		BlurryHeaderLayer,
		TitleBlock,
		ContentBlock,
		ParallaxedLayer
	},
	props: {
        configScreenFiller: {
            type: Object,
            default: function () {
                return {
                    'width-compact & height-ultra-compact': 70,
                    'width-compact': 60,
                    'default': (height) => {
                        return (layoutSettings.headerBlockHeight/layoutSettings.screenHeightIdeal*height)+'px';
                    }
                }
            }
        },
		header: {
			type: Object,
			required: true
		},
		title: String,
		baseline: String,
		block_content: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},
	data: function () {
		return {
			scrollPositionToReachBeforeLightBackground: undefined
		};
	},
	methods: {
		headerResize: function (headerHeight) {
			this.scrollPositionToReachBeforeLightBackground = parseInt(headerHeight, 10);
		}
	}
};
</script>


<style lang="stylus">
	xebiaUI__simplePageLayout('.GenericPage')

	.GenericPage-title,
	.GenericPage-content
		layout__centeredGridBox(28)

	.GenericPage-title+.GenericPage-content
		margin-top 60px

	.GenericPage-header .BlurryHeader-content
		padding-top 0 !important

	.GenericPage-header .XebiaCommonHeaderContent-inner-box
		margin-left 0 !important
		margin-right 0 !important

	.Cookies_page
		.ContentBlock-list-element-content
			width calc(97% - 20px)

		.size-class-width-compact &
			.ContentBlock-list-element-content
				width calc(90% - 20px)

	.MentionsLegales_page
		.ContentBlock-list-element-content
			width calc(97% - 20px)

		.size-class-width-compact &
			.ContentBlock-list-element-content
				width calc(90% - 20px)

	.PolitiqueDeConfidentialite_page
		.ContentBlock-list-element-content
			width calc(97% - 20px)

		.size-class-width-compact &
			.ContentBlock-list-element-content
				width calc(90% - 20px)
</style>
