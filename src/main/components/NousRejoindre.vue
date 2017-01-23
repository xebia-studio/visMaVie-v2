<template lang="jade">
    AppFooter(:siteMap="siteMap", :secondColumnContent="secondColumnContent", :contacts="contacts", :otherSites="otherSites", :socialNetworks="socialNetworks")
</template>

<script>
import AppFooter from 'xebia-web-common/components/AppFooter'

import siteMap from 'assets/data/footer/site-map.yaml'
import contacts from 'assets/data/footer/contacts.yaml'
import otherSites from 'assets/data/footer/autres-sites.yaml'
import socialNetworks from 'assets/data/footer/reseaux-sociaux.yaml'

export default {
	name: 'NousRejoindre',
	data: function () {
		return {
		    siteMap,
		    secondColumnContent: {
		         title: 'Nous recrutons',
		        links: {
		            'Back End': {
		                url: 'backend'
		            },
		            'Front End': {
		                url: 'frontend'
		            },
		            IoT: {
		                url: 'iot'
		            },
		            'Mobile': {
		                url: 'mobile'
		            },
		            'Big Data': {
		                url: 'data'
		            },
		            'Cloud': {
		                url: 'cloud'
		            },
		            'Méthodes agiles': {
		                url: 'agiles'
		            },
		            'DevOps': {
		                url: 'devops'
		            },
		        }
		    },
		    contacts,
		    otherSites,
		    socialNetworks
		}
	},
	components: {
	    AppFooter
	}
}
</script>

<style lang="stylus">
</style>
