<template lang="jade">
    AppPage.NousRejoindre_page(:header="header")
        AppSection.AppSection-even(:title="annonces.name")
            OfferAccordion(:jobs="annonces.data", :talentButtonLabel="talentButtonLabel", :jobButtonLabel="jobButtonLabel", slot="section-content")
        AppSection.AppSection-even.AppSection-no-padding
            NosTechnos(:technos="technos", slot="section-content")
        //- AppSection.AppSection-special.NousRejoindre_page-xebians(:title="quiSontLesXebians.name")
            template(slot="section-content")
                .NousRejoindre_page-xebians-image-with-caption
                    .NousRejoindre_page-xebians-image(v-bind:style="{'background-image': 'url('+quiSontLesXebiansImgSrc+')'}")
                    .NousRejoindre_page-xebians-caption(v-html="quiSontLesXebians.data.image.caption")
                .NousRejoindre_page-xebians-quote
                    PictoQuoteOrangeLeft.NousRejoindre_page-xebians-quote-left
                    span.NousRejoindre_page-xebians-quote-text(v-html="quiSontLesXebians.data.quote")
                    PictoQuoteOrangeRight.NousRejoindre_page-xebians-quote-right
        AppSection.AppSection-odd.NousRejoindre_page-plus(:title="lesPlus.name")
            BulletList(:image="lesPlus.data.image", :itemList="lesPlus.data.items", slot="section-content")
</template>

<script>
import AppPage from 'components/AppPage';
import header from 'data/nous-rejoindre/header.json';

import AppSection from 'components/AppSection';

import OfferAccordion from 'components/OfferAccordion';
import annonces from 'data/nous-rejoindre/annonces.yaml';

import NosTechnos from 'components/NosTechnos';
import technos from 'data/nous-rejoindre/technos.yaml';

import PictoQuoteOrangeLeft from 'generated/assets/components/NousRejoindre_page/PictoQuoteOrangeLeft';
import PictoQuoteOrangeRight from 'generated/assets/components/NousRejoindre_page/PictoQuoteOrangeRight';

import quiSontLesXebians from 'data/nous-rejoindre/qui-sont-les-xebians.json';

import BulletList from 'components/BulletList';
import lesPlus from 'data/nous-rejoindre/les-plus.json';

import { mixin as fontLoader } from 'tools/font-loader';

import headerImageCacheSetter from 'generated/tools/components/NousRejoindre_page/blurryHeaderImageCacheSetter';

export default {
  name : 'NousRejoindre_page',
  mixins : [fontLoader],
  data : function() {
    return {
      header: Object.assign({}, header, {
        imageCacheSetter: headerImageCacheSetter
      }),
      annonces,
      talentButtonLabel : 'Vous avez d\'autres talents&nbsp;? C\'est&nbsp;par&nbsp;ici&nbsp;!',
      jobButtonLabel : 'Postuler&nbsp;!',
      technos : technos.technos,
      quiSontLesXebians,
      lesPlus
    };
  },
  computed : {
    quiSontLesXebiansImgSrc : function() {
      return this.quiSontLesXebians.data.image.filename
        ? require('assets/images/' + this.quiSontLesXebians.data.image.filename)
        : '';
    }
  },
  created : function() {
    this.loadFont({
      'text' : ['light', 'regular'],
    });
  },
  components : {
    AppPage,
    AppSection,
    OfferAccordion,
    NosTechnos,
    PictoQuoteOrangeLeft,
    PictoQuoteOrangeRight,
    BulletList
  }
};
</script>

<style lang="stylus" src="./NousRejoindre_page.styl"></style>
