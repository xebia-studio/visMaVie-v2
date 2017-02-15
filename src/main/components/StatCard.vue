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

<style lang="stylus">
    _pictoColor = color__$orange
    _statColor = color__$blue
    _textColor = color__$blue

    _statFontSize = font__$cardTitleFontSize
    _textFontSize = font__$cardTextFontSize

    .StatCard
        background-color white
        border-radius 0 0 5px 5px

    .StatCard-inner-wrapper
        padding 0 10px 10px 10px

    .StatCard-picto-wrapper
        height (100*2/3) %
        width 100%
        padding-bottom 15px
        border-bottom 1px solid color__$sectionEven

    .StatCard-picto
        color _pictoColor
        margin-left auto
        margin-right auto
        display block

    .StatCard-stat-text-wrapper
        height (100*1/3) %

    .StatCard-stat
        padding-top 10px
        color _statColor
        font__useTitleRegular _statFontSize
        text-align center

    .StatCard-text
        padding-top 5px
        color _textColor
        font__useTextLight _textFontSize
        text-align center
        height 32px
        display table
        width 100%
        & span
            display table-cell
            vertical-align middle

</style>
