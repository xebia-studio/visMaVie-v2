<template lang="jade">
    .BulletList
        .BulletList-image-wrapper
            .BulletList-image(v-bind:style="{'background-image': 'url('+bulletListImgSrc+')'}")
        .BulletList-list
            .BulletList-list-item(v-for="item, index in itemList")
                .BulletList-list-item-picto(:is="svgComponent('BulletBlue'+(index+1))")
                .BulletList-list-item-text(v-html="item")
</template>

<script>
import { mixin as fontLoader } from 'tools/font-loader';
import { mixin as svgComponent } from 'tools/svg-component';

export default {
	name: 'BulletList',
	mixins: [fontLoader, svgComponent],
	props: {
	    itemList: {
	        type: Array,
	        required: true
	    },
	    image: {
	        type: String,
	        required: false
	    }
	},
	data: function () {
	    return {};
	},
	computed: {
	    bulletListImgSrc : function() {
	        return this.image ? require('assets/images/'+this.image) : '';
	    }
	},
	methods: {},
	created: function () {
        this.loadFont({
            'text': 'regular'
        });
    },
    mounted: function () {},
    beforeDestroy: function () {}
};
</script>

<style lang="stylus">
    _bulletListImageDesktopNumberOfColumns =  NousRejoindre__$leftPartNumberOfColumns
    _bulletListImageDesktopPercentage = (_bulletListImageDesktopNumberOfColumns/layout__$gridSectionNumberOfColumns*100)
    _bulletListListDesktopPercentage = 100 - _bulletListImageDesktopPercentage

    _bulletListListItemPictoSize = BulletPoints__$smallBulletSize

    .BulletList
        clearfix()

    .BulletList-image-wrapper
        width 100%
        .size-class-not-width-compact &
            text-align right
            float left
            width (_bulletListImageDesktopPercentage) %

    .BulletList-image
        width 100%
        height 140px
        background-size cover
        display inline-block
        .size-class-not-width-compact &
            max-width 256px

    .BulletList-list
        padding 10px 0 20px 0
        .size-class-not-width-compact &
            padding 0
            float left
            width (_bulletListListDesktopPercentage)%

    .BulletList-list-item
        clearfix()
        padding-bottom 5px
        & + &
            padding-top 5px

    .BulletList-list-item-picto
        width (_bulletListListItemPictoSize)px
        float left
        padding ((font__$textLineHeight - _bulletListListItemPictoSize)/2)px (BulletPoints__$smallBulletMobilePaddingHorizontal*2)px ((font__$textLineHeight - _bulletListListItemPictoSize)/2)px 0
        .size-class-not-width-compact &
            padding ((font__$textLineHeight - _bulletListListItemPictoSize)/2)px (BulletPoints__$smallBulletDesktopPaddingHorizontal)px

    .BulletList-list-item-text
        width auto
        color color__$text
        padding-left (_bulletListListItemPictoSize+BulletPoints__$smallBulletMobilePaddingHorizontal*2)px
        line-height (font__$textLineHeight)px
        .size-class-not-width-compact &
            padding-left (_bulletListListItemPictoSize+BulletPoints__$smallBulletDesktopPaddingHorizontal*2)px

</style>
