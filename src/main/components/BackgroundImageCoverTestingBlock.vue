<template lang="jade">
	.BackgroundImageCoverTestingBlock
		input(type="text" v-model="inputValue").BackgroundImageCoverTestingBlock-input
		.BackgroundImageCoverTestingBlock-bg(:style="style")
</template>

<script>

export default {
	name: 'BackgroundImageCoverTestingBlock',
	data: function () {
		return {
			inputValue: ''
		};
	},
	computed:{
		style: function () {
			return 'height:'+this.testedHeight;
		},
		testedHeight: function() {
			return this.inputValue;
		}
	}
}
</script>

<style lang="stylus">
	.BackgroundImageCoverTestingBlock-input
		display block
		position fixed
		top 20px
		left 20px
		z-index 2

	.BackgroundImageCoverTestingBlock-bg
		display block
		position fixed
		z-index 1
		top 0
		left 0
		width 100%
		margin auto
		background-color blue
		background-image url('~assets/images/home-header-desktop.jpg')
		background-position center center
		background-size 100% auto
		background-size cover
</style>