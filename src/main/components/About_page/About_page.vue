<template lang="jade">
	AppPage.About_page(:header="header")
		AppSection.AppSection-even(:title="quelquesChiffres.name")
			QuelquesChiffres(:statCards="quelquesChiffres.data", slot="section-content")
</template>

<script>
  import AppPage from 'components/AppPage';
  import AppSection from 'components/AppSection';

  import {mixin as fontLoader} from 'tools/font-loader';
  import {mixin as sizeClassHelper} from 'tools/size-class-helper';

  import {About_page as settings} from 'settings/components';
  import header from 'data/about/header.json';

  import QuelquesChiffres from 'components/QuelquesChiffres';
  import quelquesChiffres from 'data/about/quelques-chiffres.json';

  import headerImageCacheSetter from 'generated/tools/components/About_page/blurryHeaderImageCacheSetter';

  export default {
    name: 'About_page',
    mixins: [fontLoader, sizeClassHelper],
    data: function() {
      return {
        header: Object.assign({}, header, {
          imageCacheSetter: headerImageCacheSetter
        }),
        quelquesChiffres
      };
    },
    created : function() {
      this.loadFont({
        'text': 'light',
        'title': 'regular'
      });
    },
    computed: {
      settings : function() {
        return settings;
      }
    },
    components: {
      AppPage,
      AppSection,
      QuelquesChiffres
    }
  };
</script>

<style lang="stylus" src="./About_page.styl"></style>
