<template lang="jade">
  .StatCard
    .StatCard-inner-wrapper
      .StatCard-picto-wrapper
        .StatCard-picto(:is="svgComponent(picto)")
      .StatCard-stat-text-wrapper
        .StatCard-stat {{stat}}
        .StatCard-text
          span {{text}}
</template>

<script>
  import { mixin as fontLoader } from 'tools/font-loader';
  import { mixin as svgComponent } from 'tools/svg-component';

  export default {
    name: 'StatCard',
    mixins: [fontLoader, svgComponent],
    props: {
      picto: {
        required: true
      },
      stat: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    },
    created: function () {
      this.loadFont({
        'text': 'light',
        'title': 'regular'
      });
    }
  };
</script>

<style lang="stylus" src="./StatCard.styl"></style>
