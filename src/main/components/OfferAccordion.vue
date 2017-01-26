<template lang="jade">
    .OfferAccordion
        .OfferAccordion-jobs
            router-link(class="OfferAccordion-job", v-bind:class="{active: isJobActive(job)}" v-for="(job, label, index) in jobs", :to="'/nous-rejoindre/' + jobRoutes[label]", tag="div")
                .OfferAccordion-job-title(v-bind:style="{top: (jobTitleDesktopHeight+jobTitleDesktopBorder)*index + 'px'}")
                    .OfferAccordion-job-title-number
                        div(v-if="isWidthCompact") {{ index + 1 }}
                        div(v-else :is="svgComponent((isJobActive(job) ? 'BulletTransparentGold' : 'BulletTransparentWhite') + (index + 1))")
                    .OfferAccordion-job-title-label {{label}}
                .OfferAccordion-details
                    .OfferAccordion-details-part(v-for="(partList, partLabel, index) in job")
                        .OfferAccordion-details-part-title
                            .OfferAccordion-details-part-title-number
                                div(:is="svgComponent('BulletBlue' + (index + 1))")
                            .OfferAccordion-details-part-title-label {{partLabel}} :
                        .OfferAccordion-details-part-body(v-for="partItem in partList") {{partItem}}
                    .OfferAccordion-details-part
                        CTAButton.OfferAccordion-details-job-button(:label="jobButtonLabel")
            .OfferAccordion-jobs-talent-wrapper(v-bind:style="{top: (jobTitleDesktopHeight+jobTitleDesktopBorder)*Object.keys(jobs).length + 'px'}")
                .OfferAccordion-job-talent-filler
                .OfferAccordion-jobs-talent-label(v-html="talentButtonLabel")
</template>

<script>
    import _ from 'lodash';

    import CTAButton from 'components/CTAButton';

    import { mixin as fontLoader } from 'tools/font-loader';
    import { mixin as svgComponent } from 'tools/svg-component';
    import { mixin as sizeClassHelper } from 'tools/size-class-helper';

    import { OfferAccordion as settings } from 'settings/components'

    export default {
        name: 'OfferAccordion',
        mixins: [fontLoader, svgComponent, sizeClassHelper],
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
        data: function () {
            return {
                jobTitleDesktopHeight: settings.jobTitleDesktopHeight,
                jobTitleDesktopBorder: settings.jobTitleDesktopBorder
            }
        },
        methods: {
            isJobActive: function (job) {
                return _.isEqual(job, this.selectedJob);
            }
        },
        computed: {
            selectedJob: function () {
                // Check if the $route.params.job parameter is in our job range
                const jobLabel = _.findKey(this.jobRoutes, (value) => value === this.$route.params.job);
                return jobLabel ? this.jobs[jobLabel] : this.jobs[_.keys(this.jobs)[0]];
            },
            jobRoutes: function () {
                const jobRoutes = {};
                for(const jobLabel in this.jobs){
                    jobRoutes[jobLabel] = _.kebabCase(jobLabel);
                }
                return jobRoutes;
            },
            isWidthCompact: function () {
                console.log(this.getSizeClassHelper().isActive('width-compact'));
                return this.getSizeClassHelper().isActive('width-compact');
            }
        },
        created: function () {
            this.loadFont({
                'text': ['light', 'regular', 'bold'],
                'title': 'bold'
            });
        },
        components: {
            CTAButton
        }
    }
</script>

<style lang="stylus">
    _jobTitleDesktopNumberOfColumns = 8.5
    _detailsDesktopNumberOfColumns = layout__$gridContainerNumberOfColumns - _jobTitleDesktopNumberOfColumns
    _jobTitleDesktopPercentage = (_jobTitleDesktopNumberOfColumns/layout__$gridSectionNumberOfColumns*100)
    _detailsDesktopPercentage = 100 - _jobTitleDesktopPercentage

    _jobsBackgroundColor = color__$sectionEven
    _jobsMaxWidth = 345px

    _jobBackgroundColor = color__$blue
    _jobSelectedBackgroundColor = color__$flashOrange
    _jobColor = color__$uiImportantEnabledText
    _jobFontSize = font__$textFontSize
    _jobTitleMobileHeight = 40
    _jobTitleDesktopHeight = OfferAccordion__$jobTitleDesktopHeight
    _jobTitleDesktopBorder = OfferAccordion__$jobTitleDesktopBorder
    _jobTitleNumberWidth = 40

    _selectedJobTriangleBase = (_jobTitleDesktopHeight / 5)

    _talentButtonBackgroundColor = color__$lightBlue
    _talentButtonMobileFontSize = font__$sectionBaselineMobileFontSize

    _detailsBackgroundColor = color__$sectionOdd
    _detailsPartTitleColor = color__$uiImportantClickable
    _detailsPartTitleLineHeight = BulletPoints__$blueBulletSize
    _detailsPartTitleHeight = 30
    _detailsPartBodyColor = color__$text

    _jobMobileBulletSize = BulletPoints__$blueBulletSize
    _jobDesktopBulletSize = BulletPoints__$transparentBulletSize
    _jobPartBulletSize = BulletPoints__$blueBulletSize

    .OfferAccordion
        clearfix()

    .OfferAccordion-jobs
        background-color _jobsBackgroundColor
        width 100%
        float left

    .OfferAccordion-job
        width 100%

    .OfferAccordion-job-title
        width 100%
        .size-class-not-width-compact &
            position absolute
            width (_jobTitleDesktopPercentage) %
            height _jobTitleDesktopHeight px

    .OfferAccordion-job-title-number, .OfferAccordion-job-talent-filler
        color white
        text-align center
        float left
        width _jobMobileBulletSize px
        height _jobMobileBulletSize px
        background-color _jobSelectedBackgroundColor
        padding ((_jobTitleMobileHeight - _jobMobileBulletSize)/2)px 5px
        .OfferAccordion-job.active &
            background-color _jobBackgroundColor
        .size-class-not-width-compact &
            width _jobTitleNumberWidth px
            height _jobDesktopBulletSize px
            padding ((_jobTitleDesktopHeight - _jobDesktopBulletSize)/2)px 10px ((_jobTitleDesktopHeight - _jobDesktopBulletSize)/2)px 0px
            background-color _jobsBackgroundColor
            & svg
                width _jobDesktopBulletSize px
        .size-class-not-width-compact .OfferAccordion-job.active &
            background-color _jobsBackgroundColor

    .OfferAccordion-job-title-label,
    .OfferAccordion-jobs-talent-label
        color _jobColor
        text-transform uppercase
        width auto
        .size-class-not-width-compact &
            padding ((_jobTitleDesktopHeight - _jobFontSize)/2)px 20px ((_jobTitleDesktopHeight - _jobFontSize)/2)px (_jobTitleNumberWidth + 30)px

    .OfferAccordion-job-title-label
        padding ((_jobTitleMobileHeight - _jobFontSize)/2)px 10px ((_jobTitleMobileHeight - _jobFontSize)/2)px (_jobTitleNumberWidth + 10)px
        background-color _jobBackgroundColor
        font__useTextRegular _jobFontSize
        .OfferAccordion-job.active &
            background-color _jobSelectedBackgroundColor
        .size-class-not-width-compact .OfferAccordion-job.active &
            &:after
                z-index 1000
                shape__triangle(_selectedJobTriangleBase px, _selectedJobTriangleBase/2 px, color:_jobSelectedBackgroundColor, direction:right)
                content ''
                position absolute
                right -(_selectedJobTriangleBase/2)px
                top (_jobTitleDesktopHeight/2 - _selectedJobTriangleBase/2) px

    .OfferAccordion-jobs-talent-wrapper
        margin-top 25px
        .size-class-not-width-compact &
            position absolute
            width (_jobTitleDesktopPercentage) %
            height 100%

    .OfferAccordion-jobs-talent-label
        text-align center
        background-color _talentButtonBackgroundColor
        line-height 30px
        font__useTextRegular _talentButtonMobileFontSize
        padding 20px 50px
        .size-class-not-width-compact &
            text-align left
            width auto
            font__useTextRegular _jobFontSize

    .OfferAccordion-job-talent-filler
        .size-class-not-width-compact &
            height 100%
        .size-class-width-compact &
            display none

    .OfferAccordion-details
        padding 0px 10px 20px 10px
        .size-class-not-width-compact &
            float right
            position relative
            padding 15px 0
            width (_detailsDesktopPercentage) %
            background no-repeat _detailsBackgroundColor right -15px top -15px/180px url('~assets/images/svg/target.svg')

    .OfferAccordion-details-part
        font__useTextRegular font__$textFontSize
        padding 15px 0
        .size-class-not-width-compact &
            padding 15px 30px

    .OfferAccordion-details-part-title-number
        float left
        width _jobPartBulletSize px
        height _jobPartBulletSize px
        padding ((_detailsPartTitleHeight - _jobPartBulletSize)/2)px 10px ((_detailsPartTitleHeight - _jobPartBulletSize)/2)px 0

    .OfferAccordion-details-part-title-label
        width auto
        padding ((_detailsPartTitleHeight - font__$textFontSize)/2)px 10px ((_detailsPartTitleHeight - font__$textFontSize)/2)px 0
        color _detailsPartTitleColor
        font__useTextBold font__$textFontSize
        .size-class-not-width-compact &
            width (7/8*100) %

    .OfferAccordion-details-part-body
        color _detailsPartBodyColor
        margin-top 10px
        .size-class-not-width-compact &
            text-indent (1/8*100) %

    .OfferAccordion-details-job-button
        margin-left auto
        margin-right auto
        .size-class-not-width-compact &
            margin 10px 0 0 50px


</style>
