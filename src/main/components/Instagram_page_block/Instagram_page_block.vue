<template lang="jade">
	.Instagram_page_block
		ul.Instagram_page_block-photos-list
			li.Instagram_page_block-photo(v-for="photo in photos")
				a.Instagram_page_block-link(target="_blank", :href="photo.link")
					.Instagram_page_block-photo-image(:style="'background-image:url('+photo.url+')'")
					.Instagram_page_block-photo-information
						.Instagram_page_block-photo-xebia-picto Instagram xebiafr
						.Instagram_page_block-content(v-html="photo.caption")

</template>

<script>
	import Instafeed from 'instafeed.js';

	export default {
		name: "Instagram_page_block",
		props: {
			credentials: {
				type: Object,
				required: true
			}
		},
		data: function () {
			return {
				photos: []
			}
		},
		created: function(){
			const onSuccess = ({data}) => {
				this.photos = [];
				data.forEach(photo => {
					this.addPhoto(photo);
				});
			};

			this.feed = new Instafeed({
				get: "user",
				userId: this.credentials.userId,
				clientId: this.credentials.clientId,
				accessToken: this.credentials.accessToken,
				mock: true,
				success: res => {
					onSuccess(res);
				}
			});

			

			this.feed.run();
		},
		methods: {
			addPhoto: function (instagramData) {
				this.photos.push({
					link: instagramData.link,
					url: '"'+instagramData.images.low_resolution.url+'"',
					caption: instagramData.caption.text
				});
			}
		}
	}
</script>

<style lang="stylus">
	Instagram_page_block__colorHover = color__$uiImportantClickable
	
	.Instagram_page_block
		height 200px
		width 100%
		position relative
		
		&:before
			display block
			content ''
			position absolute
			height 100%
			width 50%
			z-index 1
			top 0
			right 0
			background-color Instagram_page_block__colorHover
			
</style>