<template lang="jade">
    AppPage.VotreIntegration(:header="header")
        AppSection(:title="'Des réponses à vos questions, consultez notre FAQ.'")
            FAQ(:themes="themes", :questionButtonLabel="'Posez Vos Questions'", slot="section-content")
</template>

<script>
import AppPage from 'components/AppPage';
import header from 'assets/data/votre-integration/header.json';

import AppSection from 'components/AppSection';

import FAQ from 'components/FAQ';
import themes from 'assets/data/votre-integration/faq.json';

import { mixin as fontLoader } from 'tools/font-loader';

export default {
	name: 'VotreIntegration',
	mixins: [fontLoader],
	data: function () {
		return {
		    header,
		    themes
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
	    FAQ
	}
};
</script>

<style lang="stylus">
</style>
