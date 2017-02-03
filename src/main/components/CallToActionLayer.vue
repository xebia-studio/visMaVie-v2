<template lang="jade">
	AppHeaderSubBarLayer.CallToActionLayer(rightSlotClass="CallToActionLayer-button-outer-wrapper")
		CTAButton.CallToActionLayer-button(:label="'Nous rejoindre'", :link="'/nous-rejoindre'", :type="'primary'", slot="right")

		LogoXebiaVisMaVie.CallToActionLayer-logo(slot="left")
</template>

<script>

import AppHeaderSubBarLayer from 'xebia-web-common/components/AppHeaderSubBarLayer';
import CTAButton from 'components/CTAButton';

import LogoXebiaVisMaVie from 'src/generated/components/LogoXebiaVisMaVie';

export default {
	name: 'CallToActionLayer',
	components: {
		AppHeaderSubBarLayer,
		CTAButton,
		LogoXebiaVisMaVie
	}
}
</script>

<style lang="stylus">
	.CallToActionLayer-button-outer-wrapper
		padding 12px 0
		min-width (284px / 2)

	.CallToActionLayer-button
		.size-class-width-compact &
			padding-left 10px !important
			padding-right 10px !important

	.CallToActionLayer-logo
		position relative
		path
			fill white
		.size-class-width-compact &
			padding 10px 0
			height 45px
			top 2px
		.size-class-not-width-compact &
			height 64px
</style>