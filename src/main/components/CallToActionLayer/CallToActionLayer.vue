<template lang="jade">
	AppHeaderSubBarLayer.CallToActionLayer(rightSlotClass="CallToActionLayer-button-outer-wrapper")
		CallToActionButton.CallToActionLayer-button(v-if="currentPage !== 'nous-rejoindre'", :label="'Nous rejoindre'", to="nous-rejoindre", :important="true", slot="right")
		CallToActionButton.CallToActionLayer-button(v-else, :label="'Postuler !'", :link="'mailto:recrutement@xebia.fr'", slot="right")

		LogoXebiaVisMaVie.CallToActionLayer-logo(slot="left")
</template>

<script>

import AppHeaderSubBarLayer from 'xebia-web-common/components/AppHeaderSubBarLayer';
import CallToActionButton from 'xebia-web-common/components/CallToActionButton';

import LogoXebiaVisMaVie from 'generated/assets/components/CallToActionLayer/LogoXebiaVisMaVie';

export default {
	name: 'CallToActionLayer',
	computed: {
		currentPage: function () {
			return this.$route.name;
		}
	},
	components: {
		AppHeaderSubBarLayer,
		CallToActionButton,
		LogoXebiaVisMaVie
	}
};
</script>

<style lang="stylus">
	.CallToActionLayer-button-outer-wrapper
		padding-top 12px
		layout__gridBox(5, gridNumberOfColumns: 28)
		min-width : (284px / 2)

	.size-class-width-compact
		.CallToActionLayer-button
			.CallToActionButton-link
				padding-top 1.1em !important
				padding-bottom 0.9em !important
				font-size 14px !important

	.CallToActionLayer-logo
		position relative
		path
			fill white
		.size-class-width-compact &
			padding 10px 0
			height 45px
			top 2px
		.size-class-not-width-compact &
			height 40px
			padding-top 12px
			padding-bottom 12px
</style>
