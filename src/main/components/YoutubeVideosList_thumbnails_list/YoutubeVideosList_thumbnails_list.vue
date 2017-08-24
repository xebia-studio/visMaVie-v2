<template lang="jade">
	.YoutubeVideosList_thumbnails_list
		.YoutubeVideosList_thumbnails_list-scroll-view
			ul.YoutubeVideosList_thumbnails_list-videos-list
				li.YoutubeVideosList_thumbnails_list-video(v-for="video in formattedVideos")
					.YoutubeVideosList_thumbnails_list-video-inner-wrapper
						.YoutubeVideosList_thumbnails_list-video-thumbnail
							.YoutubeVideosList_thumbnails_list-video-player(:id="video.playerId")
						.YoutubeVideosList_thumbnails_list-video-title {{video.title}}
</template>

<script>
 	import {client as googleClient} from 'tools/google-api';
 	import youtubePlayer from 'youtube-player';

 	let uniqueIdCounter = 0;

	export default {
		name: 'YoutubeVideosList_thumbnails_list',
		data: function () {
			return {
				videos:[]
			}
		},
		props: {
			playlistIds: {
				required: true,
				type: Array
			} 
		},
		computed: {
			formattedVideos: function () {
				const formattedVideos = this.videos.map(video => {
					return {
						playerId: this.getUniqueVideoId(),
						videoId: video.contentDetails.videoId,
						title: video.snippet.title
					}
				})

				console.log(formattedVideos)

				return formattedVideos;
			}
		},
		methods: {
			getUniqueVideoId: function () {
				return 'YoutubeVideosList_thumbnails_list-video'+(++uniqueIdCounter);
			},
			getVideos: function () {
				const playlists = [];

				Promise.all(this.playlistIds.map(playlistId => (new Promise((resolve, reject) => {
					googleClient.buildRequest('youtube/v3/playlistItems', {
						playlistId,
						part: 'contentDetails,id,snippet',
						maxResults: 4
					}).then(function(response) {
						playlists.push(response.result.items);
						resolve();
					}).catch(err => reject(err));
				})))).then(()=>{
					const videos = [];
					for(let videoIndex = 0;videoIndex < 4;videoIndex++){
						for(let playlistIndex = 0; playlistIndex < playlists.length; playlistIndex++){
							const video = playlists[playlistIndex][videoIndex];
							if (video && videos.length < 4) {
								videos.push(video);
							}
						}
					}

					this.videos = videos;
				});
			}
		},
		created: function () {
			this.getVideos();
		}
	}
</script>

<style lang="stylus">
	.YoutubeVideosList_thumbnails_list
		//
</style>