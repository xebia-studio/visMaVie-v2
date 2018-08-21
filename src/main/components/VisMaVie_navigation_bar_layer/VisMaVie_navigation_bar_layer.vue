<template lang="jade">
	NavigationBarLayer.VisMaVie_navigation_bar_layer(
		:scrollPositionToReachBeforeLightBackground="scrollPositionToReachBeforeLightBackground",
		:settingsNavigation="settingsNavigation",
		:settingsSubNavigation="settingsSubNavigation",
		:socialNetworks="socialNetworks"
	)
		LogoVisMaVie(slot="logo").NavigationBar-logo-svg
</template>

<script>
	import NavigationBarLayer from 'xebia-web-common/components/NavigationBarLayer';

	import settingsNavigation from 'data/header/$settings.json';
	import settingsSubNavigation from 'data/header/sous-navigation.yaml';
	import socialNetworks from 'data/footer/reseaux-sociaux.yaml';

	import LogoVisMaVie from 'generated/assets/components/AppPage/LogoVisMaVie';

	export default {
		name: 'AppPage',
		components: {
			NavigationBarLayer,
			LogoVisMaVie
		},
		data(){
			return {
				settingsNavigation,
				settingsSubNavigation,
				socialNetworks
			}
		},
		props: {
			scrollPositionToReachBeforeLightBackground: Number
		}

	}
</script>

<style lang="stylus">
	.VisMaVie_navigation_bar_layer .NavigationBar.on--light-background,
	.VisMaVie_navigation_bar_layer .NavigationBar.menu--is-open
		.NavigationBar-logo > .NavigationBar-logo-svg.LogoVisMaVie path
			fill color__$flashOrange !important

		.chaport-container
			z-index -1

	.size-class-navigation-bar-width-compact
		.VisMaVie_navigation_bar_layer .NavigationBar-logo
			> .NavigationBar-logo-svg.LogoVisMaVie
				transform translate(20px, -2px)
</style>
