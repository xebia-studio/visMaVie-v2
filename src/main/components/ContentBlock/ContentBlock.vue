<template lang="jade">
	.ContentBlock
		template(v-for="block in blocks")
			h5.ContentBlock-title(v-if="block.isTitle", v-html="block.content")

			h6.ContentBlock-paragraph-title(v-if="block.isParagraphTitle", v-html="block.content")

			p.ContentBlock-paragraph(v-if="block.isText", v-html="block.content")

			ul.ContentBlock-list(v-else-if="block.isList")
				li.ContentBlock-list-element(v-for="element in block.content")
					DotListElement.ContentBlock-list-element-decoration
					.ContentBlock-list-element-content(v-html="element.content")

			.ContentBlock-link(v-else-if="block.isLink", :class="linkModifier(block)")
				a.ContentBlock-link-inner-wrapper(:href="block.content.url", target='_blank', v-if="block.isAbsolute")
					LinkExt.ContentBlock-link-ext-decoration(v-if="block.isAbsolute")
					LinkArrow.ContentBlock-link-decoration
					.ContentBlock-link-label {{ block.content.label }}
					
				router-link.ContentBlock-link-inner-wrapper(:to="'/'+block.content.url", v-else)
					LinkArrow.ContentBlock-link-decoration
					.ContentBlock-link-label {{ block.content.label }}
</template>

<script>

import LinkArrow from 'generated/assets/components/ContentBlock/LinkArrow';
import LinkExt from 'generated/assets/components/ContentBlock/LinkExt';
import DotListElement from 'generated/assets/components/ContentBlock/DotListElement';

import { mixin as fontLoader } from 'tools/font-loader';

export default {
	name: 'ContentBlock',
	mixins: [fontLoader],
	components: {
		LinkArrow,
		LinkExt,
		DotListElement
	},
	props: {
		blocks: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},
	methods : {
		linkModifier: function (blockLink) {
			return (blockLink.isAbsolute ? 'is--absolute' : 'is--relative');
		}
	},
	created: function () {
		this.loadFont({
			'text': ['light', 'bold', 'regular'],
			'title': 'bold'
		}, {
			fontactive: () => {
				this.activeFont = this.activeFont ? (this.activeFont+1) : 1;
				if(this.activeFont >= 3){
					this.$emit('fontsactive');
				}
			}
		});
	}
};
</script>

<style lang="stylus">
	.ContentBlock-paragraph+.ContentBlock-list
		margin-top 25px
	
	xebiaUI__text('.ContentBlock-paragraph, .ContentBlock-list-element')
	
	.ContentBlock-link
		clearfix()
	
	.ContentBlock-paragraph+.ContentBlock-link,
	.ContentBlock-list+.ContentBlock-link
		margin-top ContentBlock__$linkMarginTop px

	_linkWidth = 20px
	.ContentBlock-link-inner-wrapper
		font__useTextRegular 13px
		color color__$textLight
		font__line-height ContentBlock__$linkLineHeight
		display block
		position relative
		text-decoration underline
		float left
		padding-right (8px + _linkWidth)
		
		&:hover, &:focus
			color color__$title
			cursor pointer
			
			.ContentBlock-link-decoration
				transform translateX(10px)
	
	.ContentBlock-link-ext-decoration
		display none

	.ContentBlock-link-decoration
		_linkHeight = 9px
		width _linkWidth
		height _linkHeight
		position absolute
		right 0
		top _linkHeight
		
		transform translateX(0)
		transition transform 200ms ease__inOutQuint()
	
	.ContentBlock-link.is--absolute
		_absoluteLinkHeight = 16px
		_absoluteLinkWidth = 16px

		.ContentBlock-link-inner-wrapper
			padding-left (_absoluteLinkWidth + 8px)
		
		.ContentBlock-link-ext-decoration
			display block
			width _absoluteLinkWidth
			height _absoluteLinkHeight
			position absolute
			left 0
			top ((ContentBlock__$linkLineHeight - _absoluteLinkHeight) / 2) - 2

	.ContentBlock-list-element-decoration
		float left
		_dotWidth = 16px
		width _dotWidth
		margin-right 20px
		margin-top 4px
		
		path
			fill color__$orange
	
	.ContentBlock-title
		color color__$blue
		font__useTitleBold 28
		
	.ContentBlock-paragraph a
		color color__$uiImportantEnabled
		text-decoration none
		
		&:hover, &:focus
			text-decoration underline
	
	.ContentBlock-list+.ContentBlock-paragraph
		margin-top 30px

	.ContentBlock-title+.ContentBlock-title,
	.ContentBlock-paragraph+.ContentBlock-title,
	.ContentBlock-paragraph-title+.ContentBlock-title,
	.ContentBlock-list+.ContentBlock-title,
	.ContentBlock-link+.ContentBlock-title,
	.ContentBlock-title+.ContentBlock-title,
	.ContentBlock-title+.ContentBlock-paragraph,
	.ContentBlock-title+.ContentBlock-paragraph-title,
	.ContentBlock-title+.ContentBlock-list,
	.ContentBlock-title+.ContentBlock-link
		margin-top 60px
	
	.ContentBlock-paragraph-title
		color color__$blue
		font__useTextRegular 18
	
	.ContentBlock-title+.ContentBlock-paragraph-title,
	.ContentBlock-paragraph+.ContentBlock-paragraph-title,
	.ContentBlock-paragraph-title+.ContentBlock-paragraph-title,
	.ContentBlock-list+.ContentBlock-paragraph-title,
	.ContentBlock-link+.ContentBlock-paragraph-title
		margin-top 60px
		
	.ContentBlock-paragraph-title+.ContentBlock-title,
	.ContentBlock-paragraph-title+.ContentBlock-paragraph,
	.ContentBlock-paragraph-title+.ContentBlock-paragraph-title,
	.ContentBlock-paragraph-title+.ContentBlock-list,
	.ContentBlock-paragraph-title+.ContentBlock-link
		margin-top 30px
</style>
