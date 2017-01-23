<template lang="jade">
    .OfferAccordion
        .OfferAccordion-jobs
            .OfferAccordion-job(v-for="(job, label, index) in jobs")
                .OfferAccordion-job-number-wrapper
                    .OfferAccordion-job-number
                        span
                            div(:is="svgComponent('BulletTransparentWhite' + (index + 1))")
                .OfferAccordion-job-label
                    span {{label}}
            .OfferAccordion-jobs-talent-button
                span {{talentButtonLabel}}
        .OfferAccordion-details
            .OfferAccordion-details-part(v-for="(partList, partLabel, index) in selectedJob")
                .OfferAccordion-details-part-number-wrapper
                    .OfferAccordion-details-part-number
                        div(:is="svgComponent('BulletBlue' + (index + 1))")
                .OfferAccordion-details-part-text
                    .OfferAccordion-details-part-text-title
                        {{partLabel}} :
                    .OfferAccordion-details-part-text-body(v-for="partItem in partList") {{partItem}}
            .OfferAccordion-details-job-button {{jobButtonLabel}}
</template>

<script>
    import BulletTransparentGold1 from 'xebia-web-common/generated/components/BulletTransparentGold1';
    import BulletTransparentGold2 from 'xebia-web-common/generated/components/BulletTransparentGold2';
    import BulletTransparentGold3 from 'xebia-web-common/generated/components/BulletTransparentGold3';
    import BulletTransparentGold4 from 'xebia-web-common/generated/components/BulletTransparentGold4';
    import BulletTransparentGold5 from 'xebia-web-common/generated/components/BulletTransparentGold5';
    import BulletTransparentGold6 from 'xebia-web-common/generated/components/BulletTransparentGold6';
    import BulletTransparentGold7 from 'xebia-web-common/generated/components/BulletTransparentGold7';
    import BulletTransparentGold8 from 'xebia-web-common/generated/components/BulletTransparentGold8';
    
    import BulletTransparentWhite1 from 'xebia-web-common/generated/components/BulletTransparentWhite1';
    import BulletTransparentWhite2 from 'xebia-web-common/generated/components/BulletTransparentWhite2';
    import BulletTransparentWhite3 from 'xebia-web-common/generated/components/BulletTransparentWhite3';
    import BulletTransparentWhite4 from 'xebia-web-common/generated/components/BulletTransparentWhite4';
    import BulletTransparentWhite5 from 'xebia-web-common/generated/components/BulletTransparentWhite5';
    import BulletTransparentWhite6 from 'xebia-web-common/generated/components/BulletTransparentWhite6';
    import BulletTransparentWhite7 from 'xebia-web-common/generated/components/BulletTransparentWhite7';
    import BulletTransparentWhite8 from 'xebia-web-common/generated/components/BulletTransparentWhite8';

    import { mixin as fontLoader } from 'tools/font-loader'
    import { mixin as svgComponent } from 'tools/svg-component'

    export default {
        name: 'OfferAccordion',
        mixins: [fontLoader, svgComponent],
        props: {
            jobs: {
                type: Object,
                required: true
            },
            talentButtonLabel: {
                type: String,
                required: true
            },
            jobButtonLabel: {
                type: String,
                required: true
            }
        },
        computed: {
            selectedJob: function () {
                return this.jobs['Coach'];
            }
        },
        created: function () {
            this.loadFont({
                'text': ['light', 'regular', 'bold'],
                'title': 'bold'
            });
        },
        components: {
            BulletTransparentGold1,
            BulletTransparentGold2,
            BulletTransparentGold3,
            BulletTransparentGold4,
            BulletTransparentGold5,
            BulletTransparentGold6,
            BulletTransparentGold7,
            BulletTransparentGold8,
            BulletTransparentWhite1,
            BulletTransparentWhite2,
            BulletTransparentWhite3,
            BulletTransparentWhite4,
            BulletTransparentWhite5,
            BulletTransparentWhite6,
            BulletTransparentWhite7,
            BulletTransparentWhite8
        }
    }
</script>

<style lang="stylus">
    _jobsBackgroundColor = color__$sectionEven

    _jobBackgroundColor = color__$blue
    _jobSelectedBackgroundColor = color__$orange
    _jobColor = color__$uiImportantEnabledText
    _jobFontSize = font__$uiImportantEnabledTextFontSize

    _talentButtonBackgroundColor = color__$lightBlue

    _detailsBackgroundColor = color__$sectionOdd
    _detailsPartTitleColor = color__$uiImportantClickable
    _detailsPartBodyColor = color__$text

    _jobBulletSize = BulletPoints__$transparentBulletSize
    _jobPartBulletSize = BulletPoints__$blueBulletSize

    .OfferAccordion-jobs
        background-color _jobsBackgroundColor
        width (1/3*100) %
        float left

    .OfferAccordion-job
        width 100%
        height 60px

    .OfferAccordion-job-number-wrapper
        float left
        width (1/6*100) %
        height 100%

    .OfferAccordion-job-number
        height 100%
        width _jobBulletSize px
        display table
        & span
            display table-cell
            vertical-align middle

    .OfferAccordion-job-label,
    .OfferAccordion-jobs-talent-button
        width (5/6*100) %
        color _jobColor
        text-transform uppercase
        font__useTextRegular _jobFontSize
        display table
        & span
            padding-left 30px
            display table-cell
            vertical-align middle

    .OfferAccordion-job-label
        float left
        border-bottom 1px solid _jobColor
        background-color _jobBackgroundColor
        height 100%

    .OfferAccordion-jobs-talent-button
        margin-top 25px
        float right
        background-color _talentButtonBackgroundColor
        height 60px

    .OfferAccordion-details
        background-color _detailsBackgroundColor
        width (2/3*100) %
        float right

    .OfferAccordion-details-part
        font__useTextRegular font__$textFontSize
        line-height 20px
        padding 30px
        clearfix()

    .OfferAccordion-details-part-number-wrapper
        float left
        width (1/8*100) %
        min-width 20px
        max-width 50px

    .OfferAccordion-details-part-number
        width _jobPartBulletSize px

    .OfferAccordion-details-part-text
        float left
        width (7/8*100) %

    .OfferAccordion-details-part-text-title
        color _detailsPartTitleColor

    .OfferAccordion-details-part-text-body
        color _detailsPartBodyColor
        margin-top 15px

</style>
