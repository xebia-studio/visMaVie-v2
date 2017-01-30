<template lang="jade">
    .NosTechnos
        .NosTechnos-techno(:is="svgComponent(techno)", v-for="techno in technoList")
        .NosTechnos-techno.NosTechnos-techno-plus Et plus...
</template>

<script>
import { mixin as fontLoader } from 'tools/font-loader';
import { mixin as svgComponent } from 'tools/svg-component';
import { mixin as sizeClassHelper } from 'tools/size-class-helper';

export default {
	name: 'NosTechnos',
	mixins: [fontLoader, svgComponent, sizeClassHelper],
	props: {
	    technos: {
	        type: Array,
	        required: true
	    }
	},
	data: function () {
	    return {
	        technoList: []
	    }
	},
	methods: {
	    buildTechnoList: function() {
	        if(this.getSizeClassHelper().isActive('width-compact')) {
                return this.technos.slice(0, 11);
             }
             return this.technos;
	    },
        updateLayoutOnResize: function () {
            this.technoList = this.buildTechnoList();
        }
    },
	created: function () {
        this.loadFont({
            'text': 'regular'
        });
        const resize = () => {
            this.updateLayoutOnResize();
        };
        this.resizeListenerArguments = ['resize', resize];
        this.getSizeClassHelper().on(...this.resizeListenerArguments)
    },
    mounted: function () {
        this.updateLayoutOnResize();
    },
    beforeDestroy: function () {
        this.getSizeClassHelper().off(...this.resizeListenerArguments)
    },
}
</script>

<style lang="stylus">
    _technoLogoHeight = 35

    .NosTechnos
        display table

    .size-class-width-compact
        _grid('.NosTechnos-techno', layout__$gridContainerNumberOfColumns, 3, 1, 3vw)

    .size-class-not-width-compact
        _grid('.NosTechnos-techno', layout__$gridContainerNumberOfColumns, 12, 0.5, 40px)

    .NosTechnos-techno
        opacity 0.5
        height _technoLogoHeight px

    .NosTechnos-techno-plus
        font__useTextRegular font__$textFontSize
        text-align center
        padding ((_technoLogoHeight - font__$textFontSize)/2)px 0px

</style>
