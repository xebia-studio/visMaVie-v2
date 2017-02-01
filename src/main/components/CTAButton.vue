<template lang="jade">
    a.CTAButton(v-bind:class="type", :href="link", :target="newTab ? '_blank' : '_self'", v-html="label", @click.stop="() => null")
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
            type: {
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
    }
</script>

<style lang="stylus">
    _CTAButtonPrimaryBackgroundColor = color__$flashOrange
    _CTAButtonSecondaryBackgroundColor = color__$lightBlue

    .CTAButton
        display block
        text-transform uppercase
        color white
        text-align center
        font__useTextRegular font__$textFontSize
        text-decoration none
        padding 14px 42px
        border-radius 5px
        &.primary
            background-color _CTAButtonPrimaryBackgroundColor
        &.secondary
            background-color _CTAButtonSecondaryBackgroundColor
</style>