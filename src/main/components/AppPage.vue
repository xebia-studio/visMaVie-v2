<template lang="jade">
    .AppPage
        ParallaxedLayersGroup
            NavigationBarLayer(:scrollPositionToReachBeforeLightBackground="scrollPositionToReachBeforeLightBackground", :settingsHeader="settingsHeader")
                LogoVisMaVie(slot="logo")

            slot

            ParallaxedLayer.AppPage-footer-layer
                AppFooter(:siteMap="siteMap", :secondColumnContent="secondColumnContent", :contacts="contacts", :otherSites="otherSites", :socialNetworks="socialNetworks")
</template>

<script>
import settingsHeader from 'src/main/assets/data/header/$settings.json';
import NavigationBarLayer from 'xebia-web-common/components/NavigationBarLayer';
import LogoVisMaVie from 'src/generated/components/LogoVisMaVie';

import ParallaxedLayersGroup from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayersGroup';
import ParallaxedLayer from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayer';

import AppFooter from 'xebia-web-common/components/AppFooter';
import nousRecrutons from 'assets/data/footer/nous-recrutons.yaml';
import siteMap from 'assets/data/footer/site-map.yaml';
import contacts from 'assets/data/footer/contacts.yaml';
import otherSites from 'assets/data/footer/autres-sites.yaml';
import socialNetworks from 'assets/data/footer/reseaux-sociaux.yaml';

export default {
	name: 'AppPage',
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
		    settingsHeader
	    }
	},
	components: {
		NavigationBarLayer,
		LogoVisMaVie,
		AppFooter,
		ParallaxedLayersGroup,
		ParallaxedLayer
	},
	props: {
		scrollPositionToReachBeforeLightBackground: Number
	}
}
</script>

<style lang="stylus">
</style>