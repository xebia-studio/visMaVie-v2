<template lang="jade">
	AppPage.NosValeurs_page(:header="header")
		SharingKnowledge_section.NosValeurs_page-sharing-knowlegde
		CustomerIntimacy_section.NosValeurs_page-customer-intimacy
</template>

<script>
	import AppPage from 'components/AppPage';

	import SharingKnowledge_section from 'components/SharingKnowledge_section'
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
			SharingKnowledge_section,
			CustomerIntimacy_section
		}
	};
</script>
