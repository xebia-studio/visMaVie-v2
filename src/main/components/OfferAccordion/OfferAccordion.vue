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
                    .OfferAccordion-details-title {{ label }}
                    .OfferAccordion-details-part(v-for="(partList, partLabel, index) in job")
                        .OfferAccordion-details-part-title
                            .OfferAccordion-details-part-title-number
                                div(:is="svgComponent('BulletBlue' + (index + 1))")
                            .OfferAccordion-details-part-title-label {{partLabel}}
                        .OfferAccordion-details-part-body(v-for="partItem in partList", v-html="partItem")
                    CTAButton.OfferAccordion-details-job-button(:label="jobButtonLabel", :link="'mailto:recrutement@xebia.fr'", :newTab="false", :type="'primary'")
            a.OfferAccordion-jobs-talent-wrapper(v-bind:style="{top: (jobTitleDesktopHeight+jobTitleDesktopBorder)*Object.keys(jobs).length + 'px'}",
                                                href="mailto:recrutement@xebia.fr")
                CTAButton.OfferAccordion-jobs-talent-label(:label="talentButtonLabel", :type="'secondary'")
</template>

<script>
  import {nextTick} from 'vue';
  import _ from 'lodash';
  import {domHeight} from '@alexistessier/dom';

  import CTAButton from 'components/CTAButton/CTAButton';

  import {mixin as fontLoader} from 'tools/font-loader';
  import {mixin as svgComponent} from 'tools/svg-component';
  import {mixin as sizeClassHelper} from 'tools/size-class-helper';
  import {mixin as scrollController} from 'tools/scroll-controller';

  import animatedScrollTo from 'xebia-web-common/tools/animated-scroll-to';
  import centralEventBus from 'xebia-web-common/tools/central-event-bus';

  import {OfferAccordion as settings} from 'settings/components';

  export default {
    name : 'OfferAccordion',
    mixins : [fontLoader, svgComponent, sizeClassHelper, scrollController],
    props : {
      jobs : {
        type : Object,
        required : true
      },
      talentButtonLabel : {
        type : String,
        required : true
      },
      jobButtonLabel : {
        type : String,
        required : true
      }
    },
    data : function() {
      return {
        jobTitleDesktopHeight : settings.jobTitleDesktopHeight,
        jobTitleDesktopBorder : settings.jobTitleDesktopBorder,
        isWidthCompact : this.getSizeClassHelper().isActive('width-compact'),
        jobStyle : _.mapValues(this.jobs, () => undefined)
      };
    },
    methods : {
      isJobActive : function(job) {
        return _.isEqual(job, this.selectedJob);
      },
      updateLayoutOnResize : function() {
        const widthCompact = this.getSizeClassHelper().isActive('width-compact');
        const selectedJobLabel = _.keys(this.jobs)[this.selectedJobIndex];
        let selectedJobHeight = undefined;

        if (widthCompact) {
          this.jobStyle[selectedJobLabel] = {height : 'auto'};
          nextTick(() => {
            if (this.$refs.job) {
              selectedJobHeight = domHeight(this.$refs.job[this.selectedJobIndex].$el) + 'px';
              this.jobStyle = _.mapValues(this.jobs, () => {
                return {height : undefined};
              });
            }
            requestAnimationFrame(() => {
              this.jobStyle[selectedJobLabel] = {height : selectedJobHeight};
            });
          });
        }
      }
    },
    computed : {
      selectedJob : function() {
        // Check if the $route.params.job parameter is in our job range
        const jobLabel = _.findKey(this.jobRoutes, (value) => value === this.$route.params.job);
        return jobLabel ? this.jobs[jobLabel] : this.jobs[_.keys(this.jobs)[0]];
      },
      selectedJobIndex : function() {
        const selectedJobIndex = -1;
        for (const jobLabel in this.jobs) {
          if (this.isJobActive(this.jobs[jobLabel])) {
            return _.indexOf(_.keys(this.jobs), jobLabel);
          }
        }
        return selectedJobIndex;
      },
      jobRoutes : function() {
        const jobRoutes = {};
        for (const jobLabel in this.jobs) {
          jobRoutes[jobLabel] = _.kebabCase(jobLabel);
        }
        return jobRoutes;
      }
    },
    created : function() {
      this.loadFont({
        'text' : ['light', 'regular', 'bold'],
        'title' : ['light', 'bold']
      });
      this.getSizeClassHelper().on('resize', () => {
        this.isWidthCompact = this.getSizeClassHelper().isActive('width-compact');
      });
      const resize = () => {
        this.updateLayoutOnResize();
      };
      this.resizeListenerArguments = ['change', resize];
      this.getSizeClassHelper().on(...this.resizeListenerArguments);
    },
    mounted : function() {
      this.updateLayoutOnResize();
    },
    watch : {
      selectedJob : function(to, from) {
        if (!_.isEqual(to, from)) {
          this.updateLayoutOnResize();
        }
        if (this.getSizeClassHelper().isActive('width-compact')) {
          nextTick(() => {
            requestAnimationFrame(() => {
              centralEventBus.$emit('force-hide-parallaxed-layer', 'navigation-bar');
              animatedScrollTo(this.getScrollController().nodePosition(this.$refs.job[0].$el) + (41 * this.selectedJobIndex));
            });
          });
        }
      }
    },
    beforeDestroy : function() {
      this.getSizeClassHelper().off(...this.resizeListenerArguments);
    },
    components : {
      CTAButton
    }
  };
</script>

<style lang="stylus" src="./OfferAccordion.styl"></style>
