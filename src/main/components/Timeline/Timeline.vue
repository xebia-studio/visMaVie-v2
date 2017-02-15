<template lang="jade">
  .Timeline
    .Timeline-item(v-for='item in items')
      .Timeline-item-year
        .Timeline-item-year-value {{item.year}}
        .Timeline-item-year-line
      .Timeline-item-block
        .Timeline-item-block-image(:is="svgComponent(item.image)")
        .Timeline-item-block-description
          span(v-html="item.description")
          .Timeline-item-block-link
</template>

<script>
  import {mixin as svgComponent} from 'tools/svg-component';
  import {mixin as fontLoader} from 'tools/font-loader';

  export default {
    name : 'Timeline',
    mixins: [svgComponent, fontLoader],
    props : {
      items : {
        required : true
      }
    },
    created : function() {
      this.loadFont({
        'text': ['light'],
        'title': ['light']
      });
    }
  };
</script>

<style lang="stylus" src="./Timeline.styl"></style>
