<template lang="jade">
    .AppPage
        ParallaxedLayersGroup
            NavigationBarLayer(:scrollPositionToReachBeforeLightBackground="scrollPositionToReachBeforeLightBackground", :settingsNavigation="settingsNavigation")
                LogoVisMaVie(slot="logo")

            BlurryHeaderLayer(@resize="headerResize", :title="header.title", :description="header.description", :image="header.image", :description_image="header.image_description", ref="blurryHeader", :titleLevel="header.titleLevel", :heightBlurryHeader="heightBlurryHeader", :screenHeightIdeal="screenHeightIdeal")
            .AppPage-in-header-block(ref='inHeaderContainer')
                slot(name='inHeader')

            slot

            ParallaxedLayer.AppPage-footer-layer
                AppFooter(:siteMap="siteMap", :secondColumnContent="secondColumnContent", :contacts="contacts", :otherSites="otherSites", :socialNetworks="socialNetworks")
</template>

<script>
import ParallaxedLayersGroup from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayersGroup';

import NavigationBarLayer from 'xebia-web-common/components/NavigationBarLayer';
import settingsNavigation from 'src/main/assets/data/header/$settings.json';
import LogoVisMaVie from 'src/generated/components/LogoVisMaVie';

import BlurryHeaderLayer from 'xebia-web-common/components/BlurryHeaderLayer';
import { BlurryHeaderLayer as blurryHeaderLayerSettings } from 'settings/components';

import ParallaxedLayer from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayer';

import layoutSettings from 'settings/layout';
import AppFooter from 'xebia-web-common/components/AppFooter';
import nousRecrutons from 'assets/data/footer/nous-recrutons.yaml';
import siteMap from 'assets/data/footer/site-map.yaml';
import contacts from 'assets/data/footer/contacts.yaml';
import otherSites from 'assets/data/footer/autres-sites.yaml';
import socialNetworks from 'assets/data/footer/reseaux-sociaux.yaml';

import { domHeight } from '@alexistessier/dom';

export default {
	name: 'AppPage',
	props: {
		header: {
			type: Object,
			default: function () {
				return {};
			}
		}
	},
	data: function () {
	    return {
	        siteMap,
		    secondColumnContent: {
		        title: 'Nous Recrutons',
		        links: nousRecrutons
		    },
		    contacts,
		    otherSites,
		    socialNetworks,
		    settingsNavigation,
		    scrollPositionToReachBeforeLightBackground: undefined,
		    heightBlurryHeader: blurryHeaderLayerSettings.heightBlurryHeader,
		    screenHeightIdeal: layoutSettings.screenHeightIdeal
	    }
	},
	methods: {
	    headerResize: function (headerHeight) {
			this.scrollPositionToReachBeforeLightBackground = parseInt(headerHeight, 10);
		}
	},
	components: {
		NavigationBarLayer,
		LogoVisMaVie,
		BlurryHeaderLayer,
		AppFooter,
		ParallaxedLayersGroup,
		ParallaxedLayer
	}
}
</script>

<style lang="stylus">
</style>