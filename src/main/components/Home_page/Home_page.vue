<template lang="jade">
	AppPage.Home_page(:header="header")
		AppSection.AppSection-even(:title="quelquesChiffres.name")
			QuelquesChiffres(:statCards="quelquesChiffres.data", slot="section-content")
		AppSection.AppSection-odd(:title="timelineItems.name")
			Timeline(:items="timelineItems.data", slot="section-content")
</template>

<script>
  import AppPage from 'components/AppPage';
  import AppSection from 'components/AppSection';

  import {mixin as fontLoader} from 'tools/font-loader';
  import {mixin as sizeClassHelper} from 'tools/size-class-helper';

  import {Home_page as settings} from 'settings/components';
  import header from 'data/home/header.json';

  import QuelquesChiffres from 'components/QuelquesChiffres';
  import quelquesChiffres from 'data/home/quelques-chiffres.json';

  import Timeline from 'components/Timeline';
  import timelineItems from 'data/home/timeline-items.json';

  import headerImageCacheSetter from 'generated/tools/components/Home_page/blurryHeaderImageCacheSetter';

  export default {
    name: 'Home_page',
    mixins: [fontLoader, sizeClassHelper],
    data: function() {
      return {
        header: Object.assign({}, header, {
          imageCacheSetter: headerImageCacheSetter
        }),
        quelquesChiffres,
        timelineItems
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
      QuelquesChiffres,
      Timeline
    }
  };
</script>

<style lang="stylus" src="./Home_page.styl"></style>
