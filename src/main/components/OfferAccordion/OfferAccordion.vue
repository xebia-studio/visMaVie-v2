<template lang="jade">
	.OfferAccordion
		.OfferAccordion-jobs
			.OfferAccordion-job(ref="job", v-for="(job, label, index) in jobs", :class="{active: isJobActive(job)}", :style="jobStyle[label]")
				button.OfferAccordion-job-title(v-bind:style="{top: (jobTitleDesktopHeight+jobTitleDesktopBorder)*index + 'px'}", @click.prevent="buttonClick($event, 'jobButton_'+index, ()=>{clickOnJobItem(jobRoutes[label])})", :ref="'jobButton_'+index")
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
					CallToActionButton.OfferAccordion-details-job-button(:label="jobButtonLabel", :link="'mailto:recrutement@xebia.fr'", :important="true")

			a.OfferAccordion-jobs-talent-wrapper(href="mailto:recrutement@xebia.fr",
				v-bind:style="{top: (jobTitleDesktopHeight+jobTitleDesktopBorder)*Object.keys(jobs).length + 'px'}"
			)
				CallToActionButton.OfferAccordion-jobs-talent-label(:label="talentButtonLabel", :empty="true")
</template>

<script>
	import {nextTick} from 'vue';
	import _ from 'lodash';
	import {domHeight} from '@alexistessier/dom';

	import CallToActionButton from 'xebia-web-common/components/CallToActionButton';

	import {mixin as fontLoader} from 'tools/font-loader';
	import {mixin as sizeClassHelper} from 'tools/size-class-helper';
	import {mixin as scrollController} from 'tools/scroll-controller';
	import {mixin as uiNavigation} from 'xebia-web-common/tools/ui-navigation-button';

	import animatedScrollTo from 'xebia-web-common/tools/animated-scroll-to';
	import centralEventBus from 'xebia-web-common/tools/central-event-bus';

	import {OfferAccordion as settings} from 'settings/components';

	import svgComponent from 'generated/assets/components/OfferAccordion/svgComponents/sync';

	import scrollBehaviorUseSavedPositionObject from 'tools/scroll-behavior-use-saved-position-object';

	export default {
		name : 'OfferAccordion',
		mixins : [fontLoader, sizeClassHelper, scrollController, uiNavigation],
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
				jobStyle : _.mapValues(this.jobs, () => undefined),
				previousSelectedJobIndex: 0
			};
		},
		methods : {
			svgComponent,
			clickOnJobItem: function (jobPath) {
				scrollBehaviorUseSavedPositionObject.value = true;
				this.$router.push({path: '/nous-rejoindre/'+jobPath});
			},
			isJobActive : function(job) {
				return _.isEqual(job, this.selectedJob);
			},
			updateLayoutOnResize : function(useTransition = true) {
				const widthCompact = this.getSizeClassHelper().isActive('width-compact');
				const selectedJobLabel = _.keys(this.jobs)[this.selectedJobIndex];
				let selectedJobHeight = undefined;
				let previousSelectedJobHeight = undefined;
				this.jobStyle = _.mapValues(this.jobs, () => undefined);

				if (widthCompact) {
				  this.jobStyle = _.mapValues(this.jobs, () => ({height: 'auto'}));				  

				  nextTick(() => {
				  	if (this.$refs.job) {
				  		selectedJobHeight = domHeight(this.$refs.job[this.selectedJobIndex]) + 'px';
				  		previousSelectedJobHeight = domHeight(this.$refs.job[this.previousSelectedJobIndex]) + 'px';

				  		let j = 0;
				  		this.jobStyle = _.mapValues(this.jobs, () => {
				  			j++;
				  			return (j-1) === this.previousSelectedJobIndex ? {height: previousSelectedJobHeight} : undefined;
				  		});

				  		const updateHeight = ()=>{
				  			let i = 0;
					  		this.jobStyle = _.mapValues(this.jobs, () => {
					  			i++;
					  			return (i-1) === this.selectedJobIndex ? {height: selectedJobHeight} : undefined;
							});
				  		};

				  		if (useTransition) {
				  			setTimeout(()=>{
					  			updateHeight()
					  		}, 80);
				  		}
				  		else{
				  			updateHeight();
				  		}
				  	};
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
			let isWidthCompactCache = this.getSizeClassHelper().isActive('width-compact');
			const resize = () => {
				this.isWidthCompact = this.getSizeClassHelper().isActive('width-compact');

				if (this.isWidthCompact !== isWidthCompactCache) {
					this.updateLayoutOnResize();
				}
				else{
					this.updateLayoutOnResize(false);
				}

				isWidthCompactCache = this.isWidthCompact;
			};
			this.resizeListenerArguments = ['resize', resize];
			this.getSizeClassHelper().on(...this.resizeListenerArguments);
		},
		mounted : function() {
			this.updateLayoutOnResize();
		},
		watch : {
			selectedJob : function(to, from) {
				if (!_.isEqual(to, from)) {
				  this.updateLayoutOnResize();

				  if (this.getSizeClassHelper().isActive('width-compact')) {
				    setTimeout(() => {
				        centralEventBus.$emit('force-hide-parallaxed-layer', 'navigation-bar');
				        animatedScrollTo(this.getScrollController().nodePosition(this.$refs.job[0]) + (41 * this.selectedJobIndex));
				    }, 520);
				  }
				}
			},
			selectedJobIndex: function (to, from) {
				this.previousSelectedJobIndex = from;
			}
		},
		beforeDestroy : function() {
			this.getSizeClassHelper().off(...this.resizeListenerArguments);
		},
		components : {
			CallToActionButton
		}
	};
</script>

<style lang="stylus" src="./OfferAccordion.styl"></style>
