<template lang="jade">
    AppPage.NousRejoindre(:header="header")
        AppSection.AppSection-even(:title="'Nous recrutons :'")
            OfferAccordion(:jobs="jobs", :talentButtonLabel="talentButtonLabel", :jobButtonLabel="jobButtonLabel", slot="section-content")
        AppSection.AppSection-even.AppSection-no-padding
            NosTechnos(:technos="technos", slot="section-content")
        AppSection.AppSection-special.NousRejoindre-xebians(:title="'Qui sont les Xebian(e)s ?'")
            template(slot="section-content")
                .NousRejoindre-xebians-image-with-caption
                    .NousRejoindre-xebians-image(v-bind:style="{'background-image': 'url('+quiSontLesXebiansImgSrc+')'}")
                    .NousRejoindre-xebians-caption(v-html="quiSontLesXebians.image.caption")
                .NousRejoindre-xebians-quote
                    PictoQuoteOrangeLeft.NousRejoindre-xebians-quote-left
                    span.NousRejoindre-xebians-quote-text(v-html="quiSontLesXebians.quote")
                    PictoQuoteOrangeRight.NousRejoindre-xebians-quote-right
        AppSection.AppSection-odd.NousRejoindre-plus(:title="'Les plus'")
            BulletList(:image="lesPlus.image", :itemList="lesPlus.items", slot="section-content")

</template>

<script>
import AppPage from 'components/AppPage/AppPage';
import header from 'assets/data/nous-rejoindre/header.json';

import AppSection from 'components/AppSection/AppSection';

import OfferAccordion from 'components/OfferAccordion/OfferAccordion';
import annonces from 'assets/data/nous-rejoindre/annonces.yaml';

import NosTechnos from 'components/NosTechnos/NosTechnos';
import technos from 'assets/data/nous-rejoindre/technos.yaml';

import PictoQuoteOrangeLeft from 'src/generated/components/PictoQuoteOrangeLeft';
import PictoQuoteOrangeRight from 'src/generated/components/PictoQuoteOrangeRight';
import quiSontLesXebians from 'assets/data/nous-rejoindre/qui-sont-les-xebians.json';

import BulletList from 'components/BulletList/BulletList';
import lesPlus from 'assets/data/nous-rejoindre/les-plus.json';

import { mixin as fontLoader } from 'tools/font-loader';

export default {
  name : 'NousRejoindre',
  mixins : [fontLoader],
  data : function() {
    return {
      header,
      jobs : annonces,
      talentButtonLabel : 'Vous avez d\'autres talents&nbsp;? C\'est&nbsp;par&nbsp;ici&nbsp;!',
      jobButtonLabel : 'Postuler&nbsp;!',
      technos : technos.technos,
      quiSontLesXebians,
      lesPlus
    };
  },
  computed : {
    quiSontLesXebiansImgSrc : function() {
      return this.quiSontLesXebians.image.filename
        ? require('assets/images/' + this.quiSontLesXebians.image.filename)
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

<style lang="stylus" src="./NousRejoindre.styl"></style>
