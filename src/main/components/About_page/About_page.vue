<template lang="jade">
  AppSimplePage.About_page(:header="header")
    CallToActionLayer(ref="inHeader", slot='inHeader')

    AppSection.AppSection-even(:title="quelquesChiffres.name")
      QuelquesChiffres(:statCards="quelquesChiffres.data", slot="section-content")
    AppSection.AppSection-odd(:title="timelineItems.name", :baseline="timelineItems.baseline")
      Timeline(:items="timelineItems.data", slot="section-content").About_page-timeline
</template>

<script>
  import AppSimplePage from 'components/AppSimplePage';
  import CallToActionLayer from 'components/CallToActionLayer'

  import AppSection from 'components/AppSection';

  import {mixin as fontLoader} from 'tools/font-loader';
  import {mixin as sizeClassHelper} from 'tools/size-class-helper';

  import {About_page as settings} from 'settings/components';
  import header from 'data/about/header.json';

  import QuelquesChiffres from 'components/QuelquesChiffres';
  import quelquesChiffres from 'data/about/quelques-chiffres.json';

  import headerImageCacheSetter from 'generated/tools/components/About_page/blurryHeaderImageCacheSetter';

  import timelineItems from 'data/about/timeline-items.json';

  import Timeline from 'components/Timeline';

  export default {
    name: 'About_page',
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
      AppSimplePage,
       CallToActionLayer,
      AppSection,
      QuelquesChiffres,
      Timeline
    }
  };
</script>

<style lang="stylus" src="./About_page.styl"></style>
