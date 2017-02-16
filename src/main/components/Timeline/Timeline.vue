<template lang="jade">
  .Timeline
    .Timeline-item(v-for='item, index in items', :class="index%2 == 0 ? 'Timeline-item-even' : 'Timeline-item-odd'")
      .Timeline-item-year
        .Timeline-item-year-value {{item.year}}
      a.Timeline-item-block(:href="item.link", target="_blank")
        .Timeline-item-block-image(:is="svgComponent(item.image)")
        .Timeline-item-block-description(v-html="item.description")
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
        'text': ['regular', 'bold'],
        'title': ['regular']
      });
    }
  };
</script>

<style lang="stylus" src="./Timeline.styl"></style>
