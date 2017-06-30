<template lang="jade">
	AppPage.Home_page(:header="header") home
</template>

<script>
	import AppPage from 'components/AppPage';

	import header from 'data/home/header.json';
	import headerImageCacheSetter from 'generated/tools/components/Home_page/blurryHeaderImageCacheSetter';

	export default {
		name: 'Home_page',
		data(){
			return {
				header: Object.assign({}, header, {
					imageCacheSetter: headerImageCacheSetter
				})
			}
		},
		components: {
			AppPage
		}
	}
</script>

<style lang="stylus">
	.Home_page
		//
</style>