<template lang="jade">
    .OfferAccordion
        .OfferAccordion-jobs
            router-link(class="OfferAccordion-job", v-bind:class="{active: isJobActive(job)}" v-for="(job, label, index) in jobs", :to="'/nous-rejoindre/' + jobRoutes[label]", tag="div",
                        :style="jobStyle[label]", ref="job")
                .OfferAccordion-job-title(v-bind:style="{top: (jobTitleDesktopHeight+jobTitleDesktopBorder)*index + 'px'}")
                    .OfferAccordion-job-title-number
                        div(v-if="isWidthCompact", :is="svgComponent('BulletBlue' + (index + 1))")
                        div(v-else :is="svgComponent((isJobActive(job) ? 'BulletTransparentOrange' : 'BulletTransparentWhite') + (index + 1))")
                    .OfferAccordion-job-title-label {{label}}
                        div(v-if="isWidthCompact", :is="svgComponent('IconCircledArrowDown')")
                .OfferAccordion-details(v-bind:class="{desktopActive: isJobActive(job)}")
                    .OfferAccordion-details-part(v-for="(partList, partLabel, index) in job")
                        .OfferAccordion-details-part-title
                            .OfferAccordion-details-part-title-number
                                div(:is="svgComponent('BulletBlue' + (index + 1))")
                            .OfferAccordion-details-part-title-label {{partLabel}} :
                        .OfferAccordion-details-part-body(v-for="partItem in partList") {{partItem}}
                    CTAButton.OfferAccordion-details-job-button(:label="jobButtonLabel", :link="'mailto:recrutement@xebia.fr'", :newTab="false", :type="'primary'")
            a.OfferAccordion-jobs-talent-wrapper(v-bind:style="{top: (jobTitleDesktopHeight+jobTitleDesktopBorder)*Object.keys(jobs).length + 'px'}",
                                                href="mailto:recrutement@xebia.fr")
                CTAButton.OfferAccordion-jobs-talent-label(:label="talentButtonLabel", :type="'secondary'")
</template>

<script>
    import { nextTick } from 'vue';
    import _ from 'lodash';
    import { domHeight } from '@alexistessier/dom';

    import CTAButton from 'components/CTAButton';

    import { mixin as fontLoader } from 'tools/font-loader';
    import { mixin as svgComponent } from 'tools/svg-component';
    import { mixin as sizeClassHelper } from 'tools/size-class-helper';

    import { OfferAccordion as settings } from 'settings/components';

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
                jobTitleDesktopBorder: settings.jobTitleDesktopBorder,
                isWidthCompact: this.getSizeClassHelper().isActive('width-compact'),
                jobStyle: _.mapValues(this.jobs, (value) => undefined)
            }
        },
        methods: {
            isJobActive: function (job) {
                return _.isEqual(job, this.selectedJob);
            },
            updateLayoutOnResize: function () {
                const widthCompact = this.getSizeClassHelper().isActive('width-compact');
                let selectedJobIndex = -1;
                let selectedJobLabel = undefined;
                let selectedJobHeight = undefined;

                if(widthCompact) {
                    for(const jobLabel in this.jobs) {
                        if(this.isJobActive(this.jobs[jobLabel])) {
                            selectedJobIndex = _.indexOf(_.keys(this.jobs), jobLabel);
                            selectedJobLabel = jobLabel;
                            break;
                        }
                    }
                    this.jobStyle[selectedJobLabel] = {height: 'auto'};
                    nextTick(() => {
                        if(this.$refs.job) {
                            selectedJobHeight = domHeight(this.$refs.job[selectedJobIndex].$el)+'px';
                            this.jobStyle = _.mapValues(this.jobs, (value) => {height: undefined});
                        }
                        requestAnimationFrame(() => {
                            this.jobStyle[selectedJobLabel] = {height: selectedJobHeight};
                        });
                    });
                }
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
            }
        },
        created: function () {
            this.loadFont({
                'text': ['light', 'regular', 'bold'],
                'title': 'bold'
            });
            this.getSizeClassHelper().on('resize', () => {
                this.isWidthCompact = this.getSizeClassHelper().isActive('width-compact');
            });
            const resize = () => {
                this.updateLayoutOnResize();
            };
            this.resizeListenerArguments = ['resize', resize];
            this.getSizeClassHelper().on(...this.resizeListenerArguments)
        },
        mounted: function () {
            this.updateLayoutOnResize();
        },
        watch: {
            selectedJob: function(to, from) {
                if(!_.isEqual(to, from)) {
                    this.updateLayoutOnResize();
                }
            }
        },
        beforeDestroy: function () {
            this.getSizeClassHelper().off(...this.resizeListenerArguments)
        },
        components: {
            CTAButton
        }
    }
</script>

<style lang="stylus">
    _jobTitleDesktopNumberOfColumns = 8.5
    _jobTitleDesktopPercentage = (_jobTitleDesktopNumberOfColumns/layout__$gridSectionNumberOfColumns*100)
    _detailsDesktopPercentage = 100 - _jobTitleDesktopPercentage

    _jobsBackgroundColor = color__$sectionEven

    _jobBackgroundColor = color__$blue
    _jobSelectedBackgroundColor = color__$flashOrange
    _jobColor = color__$uiImportantEnabledText
    _jobFontSize = font__$textFontSize
    _jobTitleMobileHeight = 40
    _jobTitleDesktopHeight = OfferAccordion__$jobTitleDesktopHeight
    _jobTitleDesktopBorder = OfferAccordion__$jobTitleDesktopBorder
    _jobTitleNumberWidth = 40

    _selectedJobTriangleBase = (_jobTitleDesktopHeight / 5)

    _talentButtonMargin = 25px

    _detailsBackgroundColor = color__$sectionOdd
    _detailsPartTitleColor = color__$uiImportantClickable
    _detailsPartTitleHeight = 30
    _detailsPartBodyColor = color__$text

    _jobMobileBulletSize = BulletPoints__$blueBulletSize + 5
    _jobDesktopBulletSize = BulletPoints__$transparentBulletSize
    _jobPartBulletSize = BulletPoints__$blueBulletSize

    .OfferAccordion
        clearfix()
        background-color _jobsBackgroundColor
        .size-class-not-width-compact &
            min-height 650px

    .OfferAccordion-jobs
        width 100%
        float left
        .size-class-not-width-compact &
            position relative

    .OfferAccordion-job
        width 100%
        overflow hidden
        .size-class-width-compact &
            transition height 320ms ease__inOutQuad() 120ms
        .size-class-width-compact &
            height (_jobTitleMobileHeight + _jobTitleDesktopBorder)px

    .OfferAccordion-job-title
        width 100%
        cursor pointer
        .size-class-width-compact &
            border-bottom (_jobTitleDesktopBorder)px solid _jobsBackgroundColor
        .size-class-not-width-compact &
            position absolute
            width (_jobTitleDesktopPercentage) %
            height _jobTitleDesktopHeight px

    .OfferAccordion-job-title-number
        color white
        text-align center
        float left
        width _jobMobileBulletSize px
        height _jobMobileBulletSize px
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

    .OfferAccordion-job-title-label
        color _jobColor
        text-transform uppercase
        width auto
        .size-class-not-width-compact &
            padding ((_jobTitleDesktopHeight - _jobFontSize)/2)px 0 ((_jobTitleDesktopHeight - _jobFontSize)/2)px (_jobTitleNumberWidth + 30)px

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

    .IconCircledArrowDown
        width 25px
        float right
        margin-top -5px

    .OfferAccordion-jobs-talent-wrapper
        text-decoration none
        .size-class-not-width-compact &
            position absolute
            left (_jobTitleNumberWidth + 10)px
            width 'calc(%s - %s - %s)' % ((_jobTitleDesktopPercentage)% (_jobTitleNumberWidth + 10)px _talentButtonMargin)

    .OfferAccordion-jobs-talent-label
        margin-top _talentButtonMargin
        text-align center
        padding 20px 50px
        .size-class-not-width-compact &
            padding-left 15px
            padding-right 15px
            text-align left
            font__useTextRegular _jobFontSize

    .OfferAccordion-details
        background-color _detailsBackgroundColor
        .size-class-width-compact &
            padding 0px 10px 20px 10px
        .size-class-not-width-compact &
            float right
            position relative
            padding 15px 0 70px 0
            width (_detailsDesktopPercentage) %
            background no-repeat _detailsBackgroundColor right -15px top -15px/180px url('~assets/images/svg/target.svg')
            &:not(.desktopActive)
                display none

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
        .size-class-not-width-compact &
            padding-right 25px

    .OfferAccordion-details-part-title-label
        width auto
        padding ((_detailsPartTitleHeight - font__$textFontSize)/2)px 10px ((_detailsPartTitleHeight - font__$textFontSize)/2)px 0
        color _detailsPartTitleColor
        font__useTextBold font__$textFontSize

    .OfferAccordion-details-part-body
        color _detailsPartBodyColor
        margin-top 10px
        .size-class-not-width-compact &
            padding-left 45px

    .OfferAccordion-details-job-button
        margin-left auto
        margin-right auto
        margin-top 15px
        max-width 85px
        .size-class-not-width-compact &
            margin 20px 0 0 75px


</style>
