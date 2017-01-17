<template lang="jade">
    .StatCard
        .StatCard-inner-wrapper
            .StatCard-picto-wrapper
                .StatCard-picto(:is='picto')
            .StatCard-stat-text-wrapper
                .StatCard-stat {{stat}}
                .StatCard-text {{text}}

</template>

<script>
    import { mixin as fontLoader } from 'tools/font-loader'

    export default {
        name: 'StatCard',
        mixins: [fontLoader],
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
                'title': 'bold'
            });
        }
    }
</script>

<style lang="stylus">
    _pictoColor = color__$orange
    _statColor = color__$blue
    _textColor = color__$blue

    _statFontSize = font__$sectionTitle
    _textFontSize = font__$mainFontSize

    .StatCard
        background-color white
        border-radius 0 0 5px 5px

    .StatCard-inner-wrapper
        padding 10px

    .StatCard-picto-wrapper
        height (100*2/3) %
        width 100%
        padding 15px 0 10px 0
        border-bottom 1px solid color__$sectionEven

    .StatCard-picto
        color _pictoColor
        margin-left auto
        margin-right auto
        display block
        width 80px

    .StatCard-stat-text-wrapper
        height (100*1/3) %

    .StatCard-stat
        padding-top 10px
        color _statColor
        font__useTitleBold 36px
        text-align center

    .StatCard-text
        padding-top 10px
        color _textColor
        font__useTextLight font__$sectionSubTitle
        text-align center

</style>
