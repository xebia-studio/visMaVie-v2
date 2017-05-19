<template lang="jade">
	.Quote
		.Quote-content(v-html="quotedContent")
		.Quote-author(v-if="author")
			.Quote-author-name(v-html="author")
			.Quote-author-job(v-if="job", v-html="job")
</template>

<script>

import {mixin as fontLoader} from 'tools/font-loader';

export default {
	name: 'Quote',
	mixins: [fontLoader],
	props: {
		content: {
			type: String,
			required: true
		},
		author: String,
		job: String
	},
	computed: {
		quotedContent: function () {
			return `<span class="Quote-content-quote-open">“</span>${this.content}<span class="Quote-content-quote-close">”</span>`;
		}
	},
	created: function () {
		this.loadFont({
			title : 'light',
			text: ['regular', 'italic', 'black']
		})
	}
}

</script>

<style lang="stylus">
	requireSettings(
		'Quote__$quotesColor',
		'Quote__$contentColor',
		'Quote__$authorColor',
		'Quote__$jobColor',
		'Quote__$authorUnderlineColor'
	)
	
	.Quote-content
		font__useTextLight 15
		color Quote__$contentColor
		font__line-height 20
	
	.Quote-content-quote-open,
	.Quote-content-quote-close
		font__useTextBlack 32
		font__line-height 20
		color Quote__$quotesColor
		position relative
		top 8px
	
	.Quote-content-quote-open
		margin-right 4px
	
	.Quote-content-quote-close
		margin-left 4px
	
	.Quote-content+.Quote-author
		margin-top 20px
		
		.size-class-width-compact &
			margin-top 10px
		
	.Quote-author
		clearfix()
		display flex
		align-items center

	.Quote-author-name,
	.Quote-author-job
		float left

	.Quote-author-name
		font__useTitleLight 22
		color Quote__$authorColor
		padding-bottom 4px
		border-bottom 1px solid Quote__$authorUnderlineColor

	.Quote-author-job
		font__useTextItalic 13
		color Quote__$jobColor
		position relative
		margin-left 20px
		
		&:before
			display block
			position absolute
			left -18px
			top 50%
			top calc(50% - 2px)
			font__useTitleLight 22
			color Quote__$authorColor
			content "-"
			margin-left 4px
			margin-right 8px
			transform translateY(-50%)
</style>