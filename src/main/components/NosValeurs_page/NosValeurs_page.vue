<template lang="jade">
	AppPage.NosValeurs_page(:header="header")
		PeopleFirst_section.NosValeurs_page-section
		SharingKnowledge_section.NosValeurs_page-section
		QualityWithoutCompromise_section.NosValeurs_page-section
		CustomerIntimacy_section.NosValeurs_page-section
</template>

<script>
	import AppPage from 'components/AppPage';

	import PeopleFirst_section from 'components/PeopleFirst_section'
	import SharingKnowledge_section from 'components/SharingKnowledge_section'
	import QualityWithoutCompromise_section from 'components/QualityWithoutCompromise_section'
	import CustomerIntimacy_section from 'components/CustomerIntimacy_section'

	import header from 'data/nos-valeurs/header.json';
	import headerImageCacheSetter from 'generated/tools/components/NosValeurs_page/blurryHeaderImageCacheSetter';

	export default {
		name: 'NosValeurs_page',
		data: function() {
			return {
				header: Object.assign({}, header, {
					imageCacheSetter: headerImageCacheSetter
				})
			};
		},
		components: {
			AppPage,
			PeopleFirst_section,
			SharingKnowledge_section,
			QualityWithoutCompromise_section,
			CustomerIntimacy_section
		}
	};
</script>

<style lang="stylus">
	.NosValeurs_page-section+.NosValeurs_page-section
		border-top 0
</style>