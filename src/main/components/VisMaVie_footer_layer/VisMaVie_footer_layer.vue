<template lang="jade">
	ParallaxedLayer.VisMaVie_footer_layer
		AppFooter
			AppFooterSiteMap(slot="col1", :siteMap="siteMap")
			AppFooterLinksList(slot="col2", label="Nous Recrutons", :links="nousRecrutons")
			AppFooterContacts(slot="col3", :contacts="contacts", :otherSites="otherSites")
			AppFooterSocialNetworks(slot="col4", :socialNetworks="socialNetworks")
		FooterNavigationBar
		CookiesBar
</template>

<script>
	import ParallaxedLayer from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayer';

	import AppFooter from 'xebia-web-common/components/AppFooter';
	import AppFooterSiteMap from 'xebia-web-common/components/AppFooter/AppFooterNavGroups/AppFooterSiteMap';
	import AppFooterLinksList from 'xebia-web-common/components/AppFooter/AppFooterNavGroups/AppFooterLinksList';
	import AppFooterSocialNetworks from 'xebia-web-common/components/AppFooter/AppFooterNavGroups/AppFooterSocialNetworks';
	import AppFooterContacts from 'xebia-web-common/components/AppFooter/AppFooterNavGroups/AppFooterContacts';

	import nousRecrutons from 'data/footer/nous-recrutons.yaml';
	import siteMap from 'data/footer/site-map.yaml';
	import contacts from 'data/footer/contacts.yaml';
	import otherSites from 'data/footer/autres-sites.yaml';
	import socialNetworks from 'data/footer/reseaux-sociaux.yaml';

	import FooterNavigationBar from 'components/FooterNavigationBar';
    import CookiesBar from 'components/CookiesBar';

	export default {
		name: "VisMaVie_footer_layer",
		data(){
			return {
				siteMap,
				nousRecrutons,
				contacts,
				otherSites,
				socialNetworks
			}
		},
		components: {
			AppFooter,
            AppFooterSiteMap,
            AppFooterLinksList,
            AppFooterSocialNetworks,
            AppFooterContacts,
            ParallaxedLayer,
            FooterNavigationBar,
            CookiesBar
		}
	}
</script>