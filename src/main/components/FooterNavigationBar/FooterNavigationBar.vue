<template lang="jade">
	.FooterNavigationBar
		.FooterNavigationBar-useful-width-box
			.FooterNavigationBar-margin-box
				nav.FooterNavigationBar-links-list
					template(v-for="(link, label) in links")
						router-link.FooterNavigationBar-link(v-if="typeof link === 'string'", :to="'/'+link") {{label}}
						span.FooterNavigationBar-label(v-else-if="link") {{label}}

</template>

<script>

import data from 'data/footer/navigation.yaml';

import {mixin as fontLoader} from 'tools/font-loader';

export default {
	name: 'FooterNavigationBar',
	mixins: [fontLoader],
	data: function () {
		return data;
	},
	created: function () {
		this.loadFont({
			text: 'thin'
		});
	}
};
</script>

<style lang="stylus">
	.FooterNavigationBar
		overflow hidden
		display block
		background-color color__$blue
	
	.FooterNavigationBar-useful-width-box
		layout__outerBox()

	.FooterNavigationBar-margin-box
		layout__innerBox()
	
	.FooterNavigationBar-links-list
		layout__centeredGridBox(28)
		text-align center
		padding-top 10px
		padding-bottom 12px
	
	.FooterNavigationBar-label,
	.FooterNavigationBar-link
		display inline-block
		font__useTextThin 12
		font__line-height 16
		color white
		position relative
	
	.FooterNavigationBar-link
		text-decoration none
		
		&:hover, &:focus
			color color__$uiEnabled
	
	.FooterNavigationBar-link+.FooterNavigationBar-link,
	.FooterNavigationBar-link+.FooterNavigationBar-label,
	.FooterNavigationBar-label+.FooterNavigationBar-link,
	.FooterNavigationBar-label+.FooterNavigationBar-label
		margin-left 30px
		
		&:before
			shape__circle(4px, white)
			content ''
			position absolute
			top 50%
			left -17px
			transform translateY(-50%)
</style>
