<template lang="jade">
	.QualityWithoutCompromise_section
		.QualityWithoutCompromise_section-useful-width
			.QualityWithoutCompromise_section-margin-constraints
				TitleBlock(:titleLevel="3", :main="title").QualityWithoutCompromise_section-title
				ContentBlock(:blocks="[{isText: true, content:introduction}]").QualityWithoutCompromise_section-introduction
				.QualityWithoutCompromise_section-content
					ul.QualityWithoutCompromise_section-key-points
						li.QualityWithoutCompromise_section-key-point(v-for="(icon, label) in key_points")
							.QualityWithoutCompromise_section-icon-wrapper
								.QualityWithoutCompromise_section-icon(:is="svgComponent(icon)")
							.QualityWithoutCompromise_section-label(v-html="label")
				p.QualityWithoutCompromise_section-information(v-html="information")

</template>

<script>
	import data from 'data/nos-valeurs/quality-without-compromise.json';
	import TitleBlock from 'components/TitleBlock';
	import ContentBlock from 'components/ContentBlock';

	import {mixin as fontLoader} from 'tools/font-loader';

	import svgComponent from 'generated/assets/components/QualityWithoutCompromise_section/svgComponents/sync';

	export default {
		name: 'QualityWithoutCompromise_section',
		mixins: [fontLoader],
		data: function() {
			return {
				title: data.title,
				introduction: data.introduction,
				key_points: data.key_points,
				information: data.information
			}
		},
		components: {
			TitleBlock,
			ContentBlock
		},
		methods: {
			svgComponent
		},
		created: function () {
			this.loadFont({
				title: 'regular',
				text: ['light', 'bold']
			})
		}
	};
</script>

<style lang="stylus">
	.QualityWithoutCompromise_section
		xebiaUI__section('odd')

	.QualityWithoutCompromise_section-useful-width
		layout__outerBox()
	.QualityWithoutCompromise_section-margin-constraints
		layout__innerBox()
	
	.QualityWithoutCompromise_section-title,
	.QualityWithoutCompromise_section-introduction,
	.QualityWithoutCompromise_section-information
		layout__centeredGridBox(28)
	
	.QualityWithoutCompromise_section-content
		.size-class-not-width-compact &
			layout__centeredGridBox(22)
			background-image url('~assets/images/svg/background-valeurs-section.svg')
			background-repeat no-repeat
			background-position center center
			background-size 100% 100%
			background-size contain
		.size-class-width-compact &
			layout__centeredGridBox(28)
		

	.QualityWithoutCompromise_section-introduction+.QualityWithoutCompromise_section-content
		margin-top 45px
		
		.size-class-width-compact &
			margin-top 40px
	
	.QualityWithoutCompromise_section-key-points
		.size-class-not-width-compact &
			layout__grid('.QualityWithoutCompromise_section-key-point', 22, 3, 3, 40px)
		.size-class-width-compact &
			layout__grid('.QualityWithoutCompromise_section-key-point', 28, 2, 4, 30px)
	
	.QualityWithoutCompromise_section-key-point
		text-align center

	.QualityWithoutCompromise_section-icon-wrapper
		width 100px
		max-width 50%
		margin-left auto
		margin-right auto
		
		.size-class-width-compact &
			max-width 80%
	
	.QualityWithoutCompromise_section-icon
		display blocks
		width 100%

	.QualityWithoutCompromise_section-icon-wrapper+.QualityWithoutCompromise_section-label
		margin-top 12px

	.QualityWithoutCompromise_section-label
		font__useTitleRegular 18
		color color__$blue
		font__line-height 22

	.QualityWithoutCompromise_section-content+.QualityWithoutCompromise_section-information
		margin-top 60px

	.QualityWithoutCompromise_section-information
		color color__$text
		font__useTextLight 15
		
		> em
			color color__$flashOrange
			font__useTitleRegular 24
			
		> strong
			font__useTextBold()

		.size-class-width-compact &
			display none
</style>
