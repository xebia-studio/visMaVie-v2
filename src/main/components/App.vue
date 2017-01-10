<template lang="jade">
	.App
		header.App-header
		router-view
		footer.App-footer
</template>

<script>
export default {
	name: 'App'
}
</script>

<style lang="stylus">
	global-reset()

	html
		font-size (fontsize__$mainFontSize px) !important
		overflow-x hidden

	.App
		min-height 5000px
</style>
