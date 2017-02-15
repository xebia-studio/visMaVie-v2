<template lang="jade">
    AppPage.VotreIntegration(:header="header")
        AppSection.AppSection-even(:title="'Des réponses à vos questions, consultez notre FAQ.'")
            FAQ(:themes="themes", :questionButtonLabel="'Posez Vos Questions'", slot="section-content")
        AppSection.AppSection-odd.VotreIntegration-processus(:title="'Quel est le processus de recrutement ?'")
            BulletList(:image="processusRecrutement.image", :itemList="processusRecrutement.items", :bottomText="processusRecrutement.bottomText", slot="section-content")
</template>

<script>
import AppPage from 'components/AppPage/AppPage';
import header from 'assets/data/votre-integration/header.json';

import AppSection from 'components/AppSection/AppSection';

import FAQ from 'components/FAQ/FAQ';
import themes from 'assets/data/votre-integration/faq.json';

import BulletList from 'components/BulletList/BulletList';
import processusRecrutement from 'assets/data/votre-integration/processus-recrutement.json';

import { mixin as fontLoader } from 'tools/font-loader';

export default {
	name: 'VotreIntegration',
	mixins: [fontLoader],
	data: function () {
		return {
		    header,
		    themes,
		    processusRecrutement
		};
	},
	created: function () {
            this.loadFont({
                'text': ['light', 'regular'],
            });
    },
	components: {
	    AppPage,
	    AppSection,
	    FAQ,
	    BulletList
	}
};
</script>

<style lang="stylus" src="./VotreIntegration.styl"></style>
