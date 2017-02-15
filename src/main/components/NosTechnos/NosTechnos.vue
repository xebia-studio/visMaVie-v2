<template lang="jade">
    .NosTechnos
        .NosTechnos-techno(:is="svgComponent(techno)", v-for="techno in technoList")
        .NosTechnos-techno.NosTechnos-techno-plus Et plus...
</template>

<script>
  import {mixin as fontLoader} from 'tools/font-loader';
  import {mixin as svgComponent} from 'tools/svg-component';
  import {mixin as sizeClassHelper} from 'tools/size-class-helper';

  export default {
    name : 'NosTechnos',
    mixins : [fontLoader, svgComponent, sizeClassHelper],
    props : {
      technos : {
        type : Array,
        required : true
      }
    },
    data : function() {
      return {
        technoList : []
      };
    },
    methods : {
      buildTechnoList : function() {
        if (this.getSizeClassHelper().isActive('width-compact')) {
          return this.technos.slice(0, 11);
        }
        return this.technos;
      },
      updateLayoutOnResize : function() {
        this.technoList = this.buildTechnoList();
      }
    },
    created : function() {
      this.loadFont({
        'text' : 'regular'
      });
      const resize = () => {
        this.updateLayoutOnResize();
      };
      this.resizeListenerArguments = ['resize', resize];
      this.getSizeClassHelper().on(...this.resizeListenerArguments);
    },
    mounted : function() {
      this.updateLayoutOnResize();
    },
    beforeDestroy : function() {
      this.getSizeClassHelper().off(...this.resizeListenerArguments);
    }
  };
</script>

<style lang="stylus" src="./NosTechnos.styl"></style>
