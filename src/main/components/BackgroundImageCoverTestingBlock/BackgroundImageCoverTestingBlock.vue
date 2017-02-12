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
};
</script>

<style lang="stylus" src="./BackgroundImageCoverTestingBlock.styl"></style>
