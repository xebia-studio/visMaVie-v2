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

<style lang="stylus" src="./BulletList.styl"></style>
