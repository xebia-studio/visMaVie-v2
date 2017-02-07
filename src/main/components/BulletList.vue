<template lang="jade">
    .BulletList
        .BulletList-image-wrapper
            img.BulletList-image(v-bind:src="bulletListImgSrc")
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
    _bulletListImageDesktopNumberOfColumns = 8.5
    _bulletListImageDesktopPercentage = (_bulletListImageDesktopNumberOfColumns/layout__$gridSectionNumberOfColumns*100)
    _bulletListListDesktopPercentage = 100 - _bulletListImageDesktopPercentage

    _bulletListListItemPictoSize = BulletPoints__$blueBulletSize

    .BulletList
        clearfix()

    .BulletList-image-wrapper
        margin-left auto
        margin-right auto
        .size-class-width-compact &
            max-width 256px
        .size-class-not-width-compact &
            text-align right
            float left
            width (_bulletListImageDesktopPercentage) %

    .BulletList-image
        width 100%
        display inline-block
        .size-class-not-width-compact &
            max-width 256px

    .BulletList-list
        padding 10px 0 20px 0
        .size-class-not-width-compact &
            padding 0 20px
            float left
            width 'calc(%s - %s)' % ((_bulletListListDesktopPercentage)% 60px)

    .BulletList-list-item
        clearfix()
        padding-bottom 5px
        & + &
            padding-top 5px

    .BulletList-list-item-picto
        width (_bulletListListItemPictoSize)px
        float left
        padding-right 10px

    .BulletList-list-item-text
        with auto
        color color__$text
        padding-left (_bulletListListItemPictoSize+10)px
        line-height (_bulletListListItemPictoSize)px

</style>
