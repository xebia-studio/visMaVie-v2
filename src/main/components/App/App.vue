<template lang="jade">
	.App(v-bind:class="'is--animation-ready'")
		router-view
</template>

<script>
import { mixin as sizeClassHelper } from 'tools/size-class-helper';

export default {
	name: 'App',
	mixins: [sizeClassHelper],
	created: function () {
		this.getSizeClassHelper();
	}
};
</script>

<style lang="stylus">
	global-reset()

	html
		font-size (font__$mainFontSize px) !important
		overflow-x hidden

	a
		color color__$lightBlue

	.App
		width 100%
		background-color white
		overflow-x hidden
</style>
