<template lang="jade">
    .AppSection
        .AppSection-useful-width-box
            .AppSection-inner-wrapper
                .AppSection-title(v-if="title") {{title}}
                .AppSection-baseline(v-if="baseline") {{baseline}}
                slot(name="section-content")
</template>

<script>
    import { mixin as fontLoader } from 'tools/font-loader'

    export default {
        name: 'AppSection',
        mixins: [fontLoader],
        props: {
            title: {
                type: String,
                required: false
            },
            baseline: {
                type: String,
                required: false
            }
        },
        created: function () {
            this.loadFont({
                'text': 'regular',
                'title': 'bold'
            });
        }
    }
</script>

<style lang="stylus">
    _appSectionTitleColor = color__$title

    _appSectionBaselineDesktopFontSize = font__$sectionBaselineDesktopFontSize
    _appSectionBaselineMobileFontSize = font__$sectionBaselineMobileFontSize
    _appSectionBaselineColor = color__$text

    .AppSection
        max-width (layout__$usefulWidth)px
        font__useTextRegular font__$textFontSize
        &.AppSection-special
            color color__$sectionOdd
        &:not(.AppSection-no-padding)
            padding 20px 0
            .size-class-not-width-compact &
                padding 40px 0

    .AppSection-even
        background-color color__$sectionEven

    .AppSection-odd
        background-color color__$sectionOdd

    .AppSection-special
        background-color color__$blue

    .AppSection-useful-width-box
        layout__outerBox()
    .AppSection-inner-wrapper
        layout__innerBox()

    .AppSection-title
        font__useTitleBold font__$sectionTitleMobileFontSize
        color _appSectionTitleColor
        margin-bottom 10px
        .AppSection-special &
            color color__$sectionOdd
        .size-class-not-width-compact &
            margin-bottom 30px
            font__useTitleBold font__$sectionTitleDesktopFontSize

    AppSection-baseline
        font__useTextRegular _appSectionBaselineMobileFontSize
        color _appSectionBaselineColor
        margin-bottom 15px
        .AppSection-special &
            color color__$sectionOdd

    .size-class-not-width-compact
        .AppSection-baseline
            font__useTextRegular _appSectionBaselineDesktopFontSize
            margin-bottom 80px

</style>