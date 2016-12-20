<template lang="jade">
	a.DiscoverExpertiseButton(:href="expertiseLinkUrl") Découvrir tous nos savoir-faire
</template>

<script>
export default {
	name: 'DiscoverExpertiseButton',
	props: {
		expertiseLinkUrl: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="stylus">
	.DiscoverExpertiseButton
		display block
		background-color color__$uiEnabled
		border-radius 8px
		padding 6px 25px
		text-align center
		color color__$uiEnabledText
		text-transform uppercase
		margin auto
		
		&:hover, &:focus
			text-decoration underline
			cursor pointer
</style>