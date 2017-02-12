<template lang="jade">
    a.CTAButton(v-bind:class="type", :href="link", :target="newTab ? '_blank' : '_self'", v-html="label", @click.stop="() => null")
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
    created : function() {
      this.loadFont({
        'text' : 'regular'
      });
    }
  };
</script>

<style lang="stylus" src="./CTAButton.styl"></style>
