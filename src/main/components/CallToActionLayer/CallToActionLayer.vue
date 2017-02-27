<template lang="jade">
	AppHeaderSubBarLayer.CallToActionLayer(rightSlotClass="CallToActionLayer-button-outer-wrapper")
		CTAButton.CallToActionLayer-button(v-if="currentPage !== 'nous-rejoindre'", :label="'Nous rejoindre'", :link="'/nous-rejoindre'", :type="'primary'", slot="right")
		CTAButton.CallToActionLayer-button(v-else :label="'Postuler !'", :link="'mailto:recrutement@xebia.fr'", :type="'secondary'", slot="right")

		LogoXebiaVisMaVie.CallToActionLayer-logo(slot="left")
</template>

<script>

import AppHeaderSubBarLayer from 'xebia-web-common/components/AppHeaderSubBarLayer';
import CTAButton from 'components/CTAButton';

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
		CTAButton,
		LogoXebiaVisMaVie
	}
};
</script>

<style lang="stylus" src="./CallToActionLayer.styl"></style>
