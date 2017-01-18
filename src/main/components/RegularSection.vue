<template lang="jade">
    .RegularSection
        .RegularSection-title {{title}}
        .RegularSection-baseline {{baseline}}
        slot(name="section-content")
</template>

<script>
    import { mixin as fontLoader } from 'tools/font-loader'

    export default {
        name: 'RegularSection',
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
    _regularSectionTitleFontSize = font__$sectionTitleFontSize
    _regularSectionTitleColor = color__$title

    _regularSectionBaselineDesktopFontSize = font__$sectionBaselineDesktopFontSize
    _regularSectionBaselineMobileFontSize = font__$sectionBaselineMobileFontSize
    _regularSectionBaselineColor = color__$text

    .RegularSection
        max-width (layout__$gridUsefulWidth)px

    .RegularSection-title
        font__useTitleBold _regularSectionTitleFontSize
        color _regularSectionTitleColor
        margin-bottom 30px

    .size-class-not-width-compact
        .RegularSection-title
            margin-bottom 15px

    .RegularSection-baseline
        font__useTextRegular _regularSectionBaselineMobileFontSize
        color _regularSectionBaselineColor
        margin-bottom 30px

    .size-class-not-width-compact
        .RegularSection-baseline
            font__useTextRegular _regularSectionBaselineDesktopFontSize
            margin-bottom 80px

</style>