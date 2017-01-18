<template lang="jade">
	.App
		header.App-header
		router-view
		footer.App-footer
</template>

<script>
import { mixin as sizeClassHelper } from 'tools/size-class-helper'

export default {
	name: 'App',
	mixins: [sizeClassHelper],
	created: function () {
		const sizeClassHelper = this.getSizeClassHelper();
	}
}
</script>

<style lang="stylus">
	global-reset()

	html
		font-size (font__$mainFontSize px) !important
		overflow-x hidden

	.App
		min-height 5000px
</style>
