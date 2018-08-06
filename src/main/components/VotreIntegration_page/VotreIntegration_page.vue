<template lang="jade">
    AppSimplePage.VotreIntegration_page(:header="header")
        CallToActionLayer(ref="inHeader", slot='inHeader')

        AppSection.AppSection-even(:title="themes.name")
            FAQ(:themes="themes.data", :questionButtonLabel="'Posez Vos Questions'", slot="section-content")
        AppSection.AppSection-odd.VotreIntegration_page-processus(:title="processusRecrutement.name")
            BulletList(:image="processusRecrutement.data.image", :itemList="processusRecrutement.data.items", :bottomText="processusRecrutement.data.bottomText", slot="section-content")
</template>

<script>
import AppSimplePage from 'components/AppSimplePage';
import CallToActionLayer from 'components/CallToActionLayer'

import header from 'data/votre-integration/header.json';

import AppSection from 'components/AppSection/AppSection';

import FAQ from 'components/FAQ/FAQ';
import themes from 'data/votre-integration/faq.json';

import BulletList from 'components/BulletList/BulletList';
import processusRecrutement from 'data/votre-integration/processus-recrutement.json';

import { mixin as fontLoader } from 'tools/font-loader';

import headerImageCacheSetter from 'generated/tools/components/VotreIntegration_page/blurryHeaderImageCacheSetter';

export default {
    name: 'VotreIntegration_page',
    mixins: [fontLoader],
    data: function () {
        return {
            header: Object.assign({}, header, {
                imageCacheSetter: headerImageCacheSetter
            }),
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
        AppSimplePage,
        CallToActionLayer,
        AppSection,
        FAQ,
        BulletList
    }
};
</script>
