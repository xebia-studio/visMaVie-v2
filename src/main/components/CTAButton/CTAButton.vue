<template lang="jade">
    button.CTAButton(v-if="clickable", v-bind:class="type", @click.stop="onClickEvent", v-html="label")
    a.CTAButton(v-else, v-bind:class="type", :href="link", :target="newTab ? '_blank' : '_self'", v-html="label", @click.stop="() => null")
</template>

<script>
  import {mixin as fontLoader} from 'tools/font-loader';

  export default {
    name : 'CTAButton',
    mixins : [fontLoader],
    props : {
      label : {
        type : String,
        required : true
      },
      clickable: {
        type: Boolean,
        default: false
      },
      type : {
        type : String,
        required : true
      },
      link : {
        type : String,
        required : false
      },
      newTab : {
        type : Boolean,
        required : false
      }
    },
    methods: {
      onClickEvent: function () {
        this.$emit('click');
      }
    },
    created : function() {
      this.loadFont({
        'text' : 'regular'
      });
    }
  };
</script>

<style lang="stylus" src="./CTAButton.styl"></style>
