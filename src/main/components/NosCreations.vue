<template lang="jade">
    AppPage.NosCreations(:header="header")
        AppSection.AppSection-even(:title="'Des projets variés'")
            CardSlider(slot="section-content", :cards="projetsVaries")
</template>

<script>
import AppPage from 'components/AppPage';
import header from 'assets/data/nos-creations/header.json';

import AppSection from 'components/AppSection';

import CardSlider from 'components/CardSlider';
import projetsVaries from 'assets/data/nos-creations/projets-varies.json';

import { mixin as fontLoader } from 'tools/font-loader';

export default {
	name: 'NosCreations',
	mixins: [fontLoader],
	data: function () {
		return {
		    header,
		    projetsVaries
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
	    CardSlider
	}
};
</script>

<style lang="stylus">
</style>
