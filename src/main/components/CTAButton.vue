<template lang="jade">
    a.CTAButton(:href="link", :target="newTab ? '_blank' : '_self'", v-html="label", @click.stop="() => null")
</template>

<script>
    import { mixin as fontLoader } from 'tools/font-loader';

    export default {
        name: 'CTAButton',
        mixins: [fontLoader],
        props: {
            label: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: false
            },
            newTab: {
                type: Boolean,
                required: false
            }
        },
        created: function () {
            this.loadFont({
                'text': 'regular'
            });
        }
    };
</script>

<style lang="stylus">
    _CTAButtonBackgroundColor = color__$flashOrange

    .CTAButton
        display block
        text-transform uppercase
        background-color _CTAButtonBackgroundColor
        color white
        text-align center
        font__useTextRegular font__$textFontSize
        text-decoration none
        padding 14px 42px
        border-radius 5px

</style>
