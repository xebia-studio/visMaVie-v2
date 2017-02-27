<template lang="jade">
  .StatCard(:class="'StatCard-'+orientation")
    .StatCard-inner-wrapper
      .StatCard-picto-wrapper
        .StatCard-picto(:is="svgComponent(picto)")
      .StatCard-stat-text-wrapper
        .StatCard-stat(v-html="!stat && isWidthCompact ? '&#x25BE;' : stat")
        .StatCard-text
          span {{text}}

</template>

<script>
    import { mixin as fontLoader } from 'tools/font-loader';
    import { mixin as sizeClassHelper } from 'tools/size-class-helper';

    import svgComponent from 'generated/assets/components/StatCard/svgComponents/sync';

    export default {
        name: 'StatCard',
        mixins: [fontLoader, sizeClassHelper],
        props: {
            picto: {
                required: true
            },
            stat: {
                type: String,
                required: false
            },
            text: {
                type: String,
                required: true
            },
            orientation: {
                type: String,
                required: true
            }
        },
        data: function () {
          return {
              isWidthCompact: this.getSizeClassHelper().isActive('width-compact')
          };
        },
        methods: {
            svgComponent
        },
        created: function () {
            this.loadFont({
                'text': ['regular', 'light'],
                'title': 'regular'
            });
            const sizeClassHelper = this.getSizeClassHelper();
            const resize = () => {
                this.isWidthCompact = this.getSizeClassHelper().isActive('width-compact');
            };
            this.resizeListenerArguments = ['resize', resize];
            sizeClassHelper.on(...this.resizeListenerArguments);
        },
        beforeDestroy : function() {
            this.getSizeClassHelper().off(...this.resizeListenerArguments);
        },
    };
</script>

<style lang="stylus" src="./StatCard.styl"></style>
