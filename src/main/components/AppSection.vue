<template lang="jade">
    .AppSection
        .AppSection-title {{title}}
        .AppSection-baseline {{baseline}}
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
                required: true
            },
            baseline: {
                type: String
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
    _appSectionTitleFontSize = font__$sectionTitleFontSize
    _appSectionTitleColor = color__$title

    _appSectionBaselineDesktopFontSize = font__$sectionBaselineDesktopFontSize
    _appSectionBaselineMobileFontSize = font__$sectionBaselineMobileFontSize
    _appSectionBaselineColor = color__$text

    .AppSection
        max-width (layout__$gridUsefulWidth)px

    .AppSection-title
        font__useTitleBold _appSectionTitleFontSize
        color _appSectionTitleColor
        margin-bottom 30px

    .size-class-not-width-compact
        .AppSection-title
            margin-bottom 15px

    AppSection-baseline
        font__useTextRegular _appSectionBaselineMobileFontSize
        color _appSectionBaselineColor
        margin-bottom 30px

    .size-class-not-width-compact
        .AppSection-baseline
            font__useTextRegular _appSectionBaselineDesktopFontSize
            margin-bottom 80px

</style>