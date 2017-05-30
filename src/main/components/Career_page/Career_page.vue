<template lang="jade">
  AppPage.Career_page(:header="header")
    AppSection.AppSection-odd(:title="content.name", :baseline="content.baseline")
</template>

<script>
import AppPage from 'components/AppPage';
import header from 'data/carriere/header.json';
import content from 'data/carriere/content.json'

import AppSection from 'components/AppSection';

import headerImageCacheSetter from 'generated/tools/components/Career_page/blurryHeaderImageCacheSetter';

export default {
    name: 'Career_page',
    data: function () {
        return {
            header: Object.assign({}, header, {
                imageCacheSetter: headerImageCacheSetter
            }),
            content
        };
    },
    components: {
        AppPage,
        AppSection
    }
};
</script>
