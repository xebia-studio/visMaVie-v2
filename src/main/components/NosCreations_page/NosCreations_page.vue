<template lang="jade">
  AppPage.NosCreations_page(:header="header")
      AppSection.AppSection-even(:title="'Comment partager sa connaissance chez Xebia ?'", :baseline="partagerBaseline")
        PartagerConnaissance(:statCards="partagerConnaissance", slot="section-content")
      AppSection.AppSection-even(:title="'Des projets variés'")
        CardSlider(slot="section-content", :cards="projetsVaries")
</template>

<script>
import AppPage from 'components/AppPage';
import header from 'data/nos-creations/header.json';

import AppSection from 'components/AppSection';

import PartagerConnaissance from 'components/PartagerConnaissance';
import partagerConnaissance from 'data/nos-creations/partager-connaissance.json';

import CardSlider from 'components/CardSlider';
import projetsVaries from 'data/nos-creations/projets-varies.json';

import { mixin as fontLoader } from 'tools/font-loader';

export default {
	name: 'NosCreations_page',
	mixins: [fontLoader],
	data: function () {
		return {
		    header,
		    partagerBaseline: 'Écrire, enseigner, construire, manager... Les contributions internes sont nombreuses et chacun a la possibilité de participer en fonction de ses savoir-faire et savoir-être !',
		    partagerConnaissance,
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
	    PartagerConnaissance,
	    CardSlider
	}
};
</script>
