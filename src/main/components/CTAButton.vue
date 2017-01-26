<template lang="jade">
    .CTAButton
        a(:href="link", target="_blank" v-html="label")
</template>

<script>
    import { mixin as fontLoader } from 'tools/font-loader'

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
            }
        },
        created: function () {
            this.loadFont({
                'text': 'regular'
            });
        }
    }
</script>

<style lang="stylus">
    _CTAButtonBackgroundColor = color__$flashOrange

    .CTAButton
        text-transform uppercase
        background-color _CTAButtonBackgroundColor
        color white
        padding 14px 42px
        border-radius 5px
        display table
        text-align center
        font__useTextRegular font__$textFontSize
        & span
            display table-cell
            vertical-align middle
</style>