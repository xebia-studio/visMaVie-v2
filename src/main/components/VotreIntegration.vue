<template lang="jade">
    AppPage.VotreIntegration(:header="header")
</template>

<script>
import AppPage from 'components/AppPage';
import header from 'assets/data/votre-integration/header.json';

import AppSection from 'components/AppSection';

import { mixin as fontLoader } from 'tools/font-loader';

export default {
	name: 'VotreIntegration',
	mixins: [fontLoader],
	data: function () {
		return {
		    header
		};
	},
	created: function () {
            this.loadFont({
                'text': ['light', 'regular'],
            });
    },
	components: {
	    AppPage,
	    AppSection
	}
};
</script>

<style lang="stylus">
</style>
