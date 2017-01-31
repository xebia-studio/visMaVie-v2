<template lang="jade">
    .NousRejoindre
        AppSection.AppSection-even(:title="'Nous recrutons :'")
            OfferAccordion(:jobs="jobs", :talentButtonLabel="talentButtonLabel", :jobButtonLabel="jobButtonLabel", slot="section-content")
        AppSection.AppSection-even
            NosTechnos(:technos="technos", slot="section-content")
        AppFooter(:siteMap="siteMap", :secondColumnContent="secondColumnContent", :contacts="contacts", :otherSites="otherSites", :socialNetworks="socialNetworks")
</template>

<script>
import AppSection from 'components/AppSection';

import OfferAccordion from 'components/OfferAccordion';
import annonces from 'assets/data/nous-rejoindre/annonces.yaml';

import NosTechnos from 'components/NosTechnos';
import technos from 'assets/data/nous-rejoindre/technos.yaml';

import AppFooter from 'xebia-web-common/components/AppFooter';
import nousRecrutons from 'assets/data/footer/nous-recrutons.yaml';
import siteMap from 'assets/data/footer/site-map.yaml';
import contacts from 'assets/data/footer/contacts.yaml';
import otherSites from 'assets/data/footer/autres-sites.yaml';
import socialNetworks from 'assets/data/footer/reseaux-sociaux.yaml';

export default {
	name: 'NousRejoindre',
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
		    jobs: annonces,
		    talentButtonLabel: 'Vous avez d\'autres talents&nbsp;? C\'est&nbsp;par&nbsp;ici&nbsp;!',
		    jobButtonLabel: 'Postuler&nbsp;!',
		    technos: technos.technos
		};
	},
	created: function () {
            console.log('NousRejoindre created !');
    },
	components: {
	    AppSection,
	    OfferAccordion,
	    NosTechnos,
	    AppFooter
	}
};
</script>

<style lang="stylus">
</style>
