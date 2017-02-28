<template lang="jade">
	mixin innerTitle()
		span.TitleBlock-main(v-if="main", v-html="main", :class="{'is--subtitle': subtitle}")
		span.TitleBlock-secondary(v-if="secondary", v-html="secondary")

	h1.TitleBlock(v-if="titleLevel == 1")
		+innerTitle()
	h2.TitleBlock(v-else-if="titleLevel == 2")
		+innerTitle()
	h3.TitleBlock(v-else-if="titleLevel == 3")
		+innerTitle()
	h4.TitleBlock(v-else-if="titleLevel == 4")
		+innerTitle()
	h5.TitleBlock(v-else-if="titleLevel == 5")
		+innerTitle()
	h6.TitleBlock(v-else-if="titleLevel == 6")
		+innerTitle()
	.TitleBlock(v-else)
		+innerTitle()
		
</template>

<script>

import { mixin as fontLoader } from 'tools/font-loader';

export default {
	name: 'TitleBlock',
	mixins: [fontLoader],
	props: {
		subtitle: Boolean,
		main: {
			type: String,
			required: true
		},
		secondary: String,
		titleLevel: Number
	},
	created: function () {
		this.loadFont({
			'text': 'light',
			'title': 'bold'
		}, {
			fontactive: () => {
				this.activeFont = this.activeFont ? (this.activeFont+1) : 1;
				if(this.activeFont >= 2){
					this.$emit('fontsactive');
				}
			}
		});
	}
};
</script>

<style lang="stylus">
	xebiaUI__titleBlock('.TitleBlock-main', '.TitleBlock-secondary')
	
	.TitleBlock-main.is--subtitle
		.size-class-width-compact &
			font__rem-size 25px
			font__line-height 32px
</style>
