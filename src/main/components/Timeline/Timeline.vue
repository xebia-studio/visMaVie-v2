<template lang="jade">
  .Timeline
    .Timeline-centralLine
    .Timeline-item(v-for='item in items')
      .Timeline-item-year(v-html='item.year')
      .Timeline-item-block
        .Timeline-item-block-image(v-html='item.image')
        .Timeline-item-block-description(v-html='item.description')
</template>

<script>
  export default {
    name : 'Timeline',
    props : {
      items : {
        required : true
      }
    },
    created : function() {}
  };
</script>

<style lang="stylus" src="./Timeline.styl"></style>
