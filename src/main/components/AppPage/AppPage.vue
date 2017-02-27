<template lang="jade">
    .AppPage
        ParallaxedLayersGroup
            NavigationBarLayer(:scrollPositionToReachBeforeLightBackground="scrollPositionToReachBeforeLightBackground", :settingsNavigation="settingsNavigation")
                LogoVisMaVie(slot="logo")

            BlurryHeaderLayer(@resize="headerResize", :title="header.title", :description="header.description", :image="header.image", :description_image="header.image_description", ref="blurryHeader", :titleLevel="header.titleLevel", :heightBlurryHeader="heightBlurryHeader", :screenHeightIdeal="screenHeightIdeal")
            .AppPage-in-header-block(ref='inHeaderContainer')
                CallToActionLayer(ref="inHeader")

            slot

            ParallaxedLayer.AppPage-footer-layer
                AppFooter(:siteMap="siteMap", :secondColumnContent="secondColumnContent", :contacts="contacts", :otherSites="otherSites", :socialNetworks="socialNetworks")
</template>

<script>

import ParallaxedLayersGroup from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayersGroup';
import ParallaxedLayer from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayer';

import NavigationBarLayer from 'xebia-web-common/components/NavigationBarLayer';
import BlurryHeaderLayer from 'xebia-web-common/components/BlurryHeaderLayer';

import LogoVisMaVie from 'generated/assets/components/AppPage/LogoVisMaVie';

import { BlurryHeaderLayer as blurryHeaderLayerSettings } from 'settings/components';

import CallToActionLayer from 'components/CallToActionLayer';

import settingsNavigation from 'data/header/$settings.json';
import layoutSettings from 'settings/layout';
import AppFooter from 'xebia-web-common/components/AppFooter';
import nousRecrutons from 'data/footer/nous-recrutons.yaml';
import siteMap from 'data/footer/site-map.yaml';
import contacts from 'data/footer/contacts.yaml';
import otherSites from 'data/footer/autres-sites.yaml';
import socialNetworks from 'data/footer/reseaux-sociaux.yaml';

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
	    };
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
		CallToActionLayer,
		AppFooter,
		ParallaxedLayersGroup,
		ParallaxedLayer
	}
};
</script>
