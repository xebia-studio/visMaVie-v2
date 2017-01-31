<template lang="jade">
    AppPage.NousRejoindre
        AppSection.AppSection-even(:title="'Nous recrutons :'")
            OfferAccordion(:jobs="jobs", :talentButtonLabel="talentButtonLabel", :jobButtonLabel="jobButtonLabel", slot="section-content")
        AppSection.AppSection-even
            NosTechnos(:technos="technos", slot="section-content")
</template>

<script>
import AppPage from 'components/AppPage'
import AppSection from 'components/AppSection';

import OfferAccordion from 'components/OfferAccordion';
import annonces from 'assets/data/nous-rejoindre/annonces.yaml';

import NosTechnos from 'components/NosTechnos';
import technos from 'assets/data/nous-rejoindre/technos.yaml';

export default {
	name: 'NousRejoindre',
	data: function () {
		return {
		    jobs: annonces,
		    talentButtonLabel: 'Vous avez d\'autres talents&nbsp;? C\'est&nbsp;par&nbsp;ici&nbsp;!',
		    jobButtonLabel: 'Postuler&nbsp;!',
		    technos: technos.technos
		}
	},
	components: {
	    AppSection,
	    OfferAccordion,
	    NosTechnos,
	    AppPage
	}
}
</script>

<style lang="stylus">
</style>
