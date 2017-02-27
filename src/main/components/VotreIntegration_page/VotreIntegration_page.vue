<template lang="jade">
    AppPage.VotreIntegration_page(:header="header")
        AppSection.AppSection-even(:title="'Des réponses à vos questions, consultez notre FAQ.'")
            FAQ(:themes="themes", :questionButtonLabel="'Posez Vos Questions'", slot="section-content")
        AppSection.AppSection-odd.VotreIntegration_page-processus(:title="'Quel est le processus de recrutement ?'")
            BulletList(:image="processusRecrutement.image", :itemList="processusRecrutement.items", :bottomText="processusRecrutement.bottomText", slot="section-content")
</template>

<script>
import AppPage from 'components/AppPage/AppPage';
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
        AppPage,
        AppSection,
        FAQ,
        BulletList
    }
};
</script>
