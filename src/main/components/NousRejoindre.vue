<template lang="jade">
    AppPage.NousRejoindre
        AppSection.AppSection-even(:title="'Nous recrutons :'")
            OfferAccordion(:jobs="jobs", :talentButtonLabel="talentButtonLabel", :jobButtonLabel="jobButtonLabel", slot="section-content")
        AppSection.AppSection-even.AppSection-no-padding
            NosTechnos(:technos="technos", slot="section-content")
        AppSection.AppSection-special.NousRejoindre-xebians(:title="'Qui sont les Xebian(e)s ?'")
            template(slot="section-content")
                .NousRejoindre-xebians-image-with-caption
                    img.NousRejoindre-xebians-image(v-bind:src="quiSontLesXebiansImgSrc")
                    .NousRejoindre-xebians-caption(v-html="quiSontLesXebians.image.caption")
                .NousRejoindre-xebians-quote
                    PictoQuoteOrangeLeft.NousRejoindre-xebians-quote-left
                    span.NousRejoindre-xebians-quote-text(v-html="quiSontLesXebians.quote")
                    PictoQuoteOrangeRight.NousRejoindre-xebians-quote-right
        AppSection.AppSection-even.NousRejoindre-plus(:title="'Les plus'")
            BulletList(:image="lesPlus.image", :itemList="lesPlus.items", slot="section-content")

</template>

<script>
import AppPage from 'components/AppPage'
import AppSection from 'components/AppSection';

import OfferAccordion from 'components/OfferAccordion';
import annonces from 'assets/data/nous-rejoindre/annonces.yaml';

import NosTechnos from 'components/NosTechnos';
import technos from 'assets/data/nous-rejoindre/technos.yaml';

import PictoQuoteOrangeLeft from 'src/generated/components/PictoQuoteOrangeLeft';
import PictoQuoteOrangeRight from 'src/generated/components/PictoQuoteOrangeRight';
import quiSontLesXebians from 'assets/data/nous-rejoindre/qui-sont-les-xebians.json';

import BulletList from 'components/BulletList';
import lesPlus from 'assets/data/nous-rejoindre/les-plus.json';

import { mixin as fontLoader } from 'tools/font-loader';

export default {
	name: 'NousRejoindre',
	mixins: [fontLoader],
	data: function () {
		return {
		    jobs: annonces,
		    talentButtonLabel: 'Vous avez d\'autres talents&nbsp;? C\'est&nbsp;par&nbsp;ici&nbsp;!',
		    jobButtonLabel: 'Postuler&nbsp;!',
		    technos: technos.technos,
		    quiSontLesXebians,
		    lesPlus
		}
	},
	computed: {
	    quiSontLesXebiansImgSrc : function() {
	        return this.quiSontLesXebians.image.filename ? require('assets/images/'+this.quiSontLesXebians.image.filename) : '';
	    }
	},
	created: function () {
            this.loadFont({
                'text': ['light', 'regular'],
            });
    },
	components: {
	    AppPage,
	    AppSection,
	    OfferAccordion,
	    NosTechnos,
	    PictoQuoteOrangeLeft,
	    PictoQuoteOrangeRight,
	    BulletList
	}
}
</script>

<style lang="stylus">
    _xebiansQuoteLineHeight = 26

    _xebiansImageDesktopNumberOfColumns = 8.5
    _xebiansImageDesktopPercentage = (_xebiansImageDesktopNumberOfColumns/layout__$gridSectionNumberOfColumns*100)
    _xebiansQuoteDesktopPercentage = 100 - _xebiansImageDesktopPercentage

    .NousRejoindre-xebians
        clearfix()

    .NousRejoindre-xebians-image-with-caption
        margin-left auto
        margin-right auto
        .size-class-width-compact &
            max-width 256px
        .size-class-not-width-compact &
            text-align right
            float left
            width (_xebiansImageDesktopPercentage) %

    .NousRejoindre-xebians-image
        width 100%
        display inline-block
        .size-class-not-width-compact &
            max-width 256px

    .NousRejoindre-xebians-caption
        font__useTextRegular font__$captionMobileFontSize
        width 100%
        text-align right
        padding 5px 0
        .size-class-not-width-compact &
            padding 0
            font__useTextRegular font__$captionDesktopFontSize

    .NousRejoindre-xebians-quote
        padding 40px 0 30px 0
        .size-class-not-width-compact &
            padding 10px 30px
            float left
            width 'calc(%s - %s)' % ((_xebiansQuoteDesktopPercentage)% 60px)

    .NousRejoindre-xebians-quote-left, .NousRejoindre-xebians-quote-right
        height (font__$textFontSize)px
        margin 0 10px

    .NousRejoindre-xebians-quote-left
        transform scale(_xebiansQuoteLineHeight/font__$textFontSize) translateY(-5px)

    .NousRejoindre-xebians-quote-right
        transform scale(_xebiansQuoteLineHeight/font__$textFontSize) translateY(8px)

    .NousRejoindre-xebians-quote-text
        line-height (_xebiansQuoteLineHeight)px
        display inline

</style>
