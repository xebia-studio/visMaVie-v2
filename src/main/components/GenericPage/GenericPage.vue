<template lang="jade">
	AppPage.GenericPage(:header="header")
		.GenericPage-header-content-layer(slot='headerContent')
			VisMaVieCommonHeaderContent
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
import ContentBlock from 'components/ContentBlock';

export default {
	name: 'GenericPage',
	components: {
		AppPage,
		VisMaVieCommonHeaderContent,
		BlurryHeaderLayer,
		TitleBlock,
		ContentBlock,
		ParallaxedLayer
	},
	props: {
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
</style>
