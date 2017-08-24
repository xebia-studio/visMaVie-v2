<template lang="jade">
	.YoutubeVideosList_thumbnails_list
		.YoutubeVideosList_thumbnails_list-scroll-view
			Slider.YoutubeVideosList_thumbnails_list-videos-list(:paginationBulletRender='paginationBulletRender', :breakpoints='sliderBreakpoints', ref="slider", :pagination='"."+uniquePaginationClass')
				SliderSlide.YoutubeVideosList_thumbnails_list-video(v-for="(video, index) in formattedVideos", :style="'height:'+(videosHeight||'auto')", ref="video", :class="videoPlaying[index] ? 'is--playing' : ''")
					a.YoutubeVideosList_thumbnails_list-video-inner-wrapper(target="_blank", :href="video.href", @click="play($event, video.playerId, index)")
						.YoutubeVideosList_thumbnails_list-video-thumbnail
							.YoutubeVideosList_thumbnails_list-video-thumbnail-cache(:style="'background-image:url(\"'+video.thumbnail+'\")'", :class="cacheHidden[index] ? 'is--hidden' : ''")
								PlayerVideo.YoutubeVideosList_thumbnails_list-video-thumbnail-cache-picto
							.YoutubeVideosList_thumbnails_list-video-player(:id="video.playerId")
						.YoutubeVideosList_thumbnails_list-video-title {{video.title}}
			SliderPagination.YoutubeVideosList_thumbnails_list-slider-pagination(:class="uniquePaginationClass", :slideCount="slideCount")
</template>

<script>
	import {domHeight} from '@alexistessier/dom'
	
	import {nextTick} from 'vue';

	import getScrollBarWidth from 'tools/get-scroll-bar-width';

 	import {client as googleClient} from 'tools/google-api';
 	import youtubePlayer from 'youtube-player';

 	import Slider from 'xebia-web-common/components/Slider/Slider';
	import SliderSlide from 'xebia-web-common/components/Slider/SliderSlide';
	import SliderPagination from 'xebia-web-common/components/SliderPagination';

	import PlayerVideo from 'generated/assets/components/YoutubeVideosList_thumbnails_list/PlayerVideo';

	import { mixin as sizeClassHelper, config as sizeClassHelperConfig } from 'tools/size-class-helper';

	import { mixin as fontLoader } from 'tools/font-loader';

	const scrollBarWidth = getScrollBarWidth();

	let uniquePaginationId = 0;
 	let uniqueIdCounter = 0;

	export default {
		name: 'YoutubeVideosList_thumbnails_list',
		mixins: [sizeClassHelper, fontLoader],
		components: {
			Slider,
			SliderSlide,
			SliderPagination,
			PlayerVideo
		},
		data: function () {
			return {
				videos:[],
				uniquePaginationClass: 'YoutubeVideosList_thumbnails_list-slider-pagination-'+(++uniquePaginationId),
				cacheHidden: [],
				videoPlaying: [],
				videosHeight: 'auto'
			}
		},
		props: {
			playlistIds: {
				required: true,
				type: Array
			} 
		},
		computed: {
			slideCount: function () {
				return this.formattedVideos.length;
			},
			formattedVideos: function () {
				return this.videos.map(video => {
					return {
						playerId: this.getUniqueVideoId(),
						videoId: video.contentDetails.videoId,
						title: video.snippet.title,
						href: 'https://www.youtube.com/watch?v='+video.contentDetails.videoId,
						thumbnail:video.snippet.thumbnails.standard.url
					}
				});
			},
			sliderBreakpoints: function () {
				const conf = {};
				conf[sizeClassHelperConfig['width-compact'].maxWidth+scrollBarWidth] = {
					slidesPerView: 1,
					centeredSlides: true,
					spaceBetween: 20
				};

				//Infinity
				//Must be defined, otherwise the pagination is bugged when switching from one breakpoints to an other
				conf[Infinity] = {
					slidesPerView: 4,
					centeredSlides: false,
					spaceBetween: 0
				};
				return conf;
			}
		},
		watch: {
			formattedVideos: function (newValue, oldValue) {
				this.cacheHidden = [];
				this.videoPlaying = [];
				nextTick(()=>{
					this.youtubePlayers = {};

					newValue.forEach(video => {
						this.youtubePlayers[video.playerId] = youtubePlayer(video.playerId, {
							videoId: video.videoId
						});
					});

					if(this.videoAdjustTimeout){
						clearTimeout(this.videoAdjustTimeout);
					}

					this.videoAdjustTimeout = setTimeout(() => {
						this.updateLayoutOnResize();
					}, 800);
				});
			}
		},
		methods: {
			play: function ($event, playerId, index) {
				$event.preventDefault();

				const player = this.youtubePlayers[playerId];

				for(const id in this.youtubePlayers){
					const p =  this.youtubePlayers[id];
					if (p) {
						p.pauseVideo();
					}
				}

				if (player) {
					const cacheHidden = [];
					const videoPlaying = [];
					cacheHidden[index] = true;
					videoPlaying[index] = true;

					this.cacheHidden = cacheHidden;
					this.videoPlaying = videoPlaying;

					player.playVideo();
				}
			},
			updateLayoutOnResize: function () {
				const slider = this.$refs.slider;

				if (slider) {
					slider.update(true)
				}

				this.videosHeight = 'auto';
				nextTick(()=>{
					if (this.$refs.video) {
						const videos = this.$refs.video.map(v => v.$el);

						if (videos.length) {
							requestAnimationFrame(()=>{
								const maxHeight = Math.max(...videos.map(v => domHeight(v)));
								this.videosHeight = maxHeight > 0 ? maxHeight+'px' : 'auto';
							});
						}
					}
					
				})
			},
			paginationBulletRender: SliderPagination.methods.paginationBulletRender,
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

			this.loadFont({
				text: 'light'
			});

			const resize = ()=>{
				this.updateLayoutOnResize();
			}

			this.resizeListenerArguments = ['resize', resize];

			this.getSizeClassHelper().on(...this.resizeListenerArguments);
		},
		mounted: function () {
			this.updateLayoutOnResize();
		},
		beforeDestroy: function () {
			this.getSizeClassHelper().off(...this.resizeListenerArguments);

			if(this.videoAdjustTimeout){
				clearTimeout(this.videoAdjustTimeout);
			}
		}
	}
</script>

<style lang="stylus">
	.YoutubeVideosList_thumbnails_list-videos-list
		.size-class-width-compact &
			clearfix()
			width 100%
		
		.size-class-not-width-compact &
			.Slider-slides-list
				transform translate3d(0px, 0px, 0px) !important;
				
				&:hover
					cursor auto

				layout__grid('.YoutubeVideosList_thumbnails_list-video', 28, 4, 1, 40px, widthImportant: true)
	
	.YoutubeVideosList_thumbnails_list-video
		.size-class-not-width-compact &
			transform scale(1)
			transition transform 220ms ease__inOutQuad()
			z-index 2
			position relative
			
			.YoutubeVideosList_thumbnails_list-video-inner-wrapper:after
				content ''
				display block
				position absolute
				box-shadow 0px 2px 60px rgba(color__$blue, 0.8)
				top 0
				left 0
				width 100%
				height 100%
				opacity 0
				transition opacity 230ms ease__inOutQuad()
				z-index 0

			&.is--playing
				transform scale(1.16)
				z-index 4
				
				.YoutubeVideosList_thumbnails_list-video-inner-wrapper:after
					opacity 1 !important

		.size-class-width-compact &
			float left
			
			&.is--active
				.YoutubeVideosList_thumbnails_list-video-inner-wrapper:before
					opacity 1 !important
	
	.YoutubeVideosList_thumbnails_list-video-inner-wrapper
		display block
		width auto
		height 100%
		border 1px solid color__$neutral50
		border-bottom-right-radius: 4px;
		border-bottom-left-radius: 4px;
		background-color white;
		color color__$text
		text-decoration none
		
		.size-class-width-compact &
			border-radius 4px;
		
		xebiaUI__hoverShadow()

		&:hover
			cursor pointer
		
	.YoutubeVideosList_thumbnails_list-video-thumbnail
		width 100%
		height 121px
		padding-right 1px
		padding-left 1px
		position relative
		left -1px
		top -1px
		
		.size-class-width-compact &
			overflow hidden
			border-top-right-radius: 4px;
			border-top-left-radius: 4px;
			height 181px

	.YoutubeVideosList_thumbnails_list-video-player
		width 100% !important
		height 100% !important
		position absolute
		z-index 1
		top 0
		left 0
	
	.YoutubeVideosList_thumbnails_list-video-thumbnail+.YoutubeVideosList_thumbnails_list-video-title
		margin-top 20px
	
	.YoutubeVideosList_thumbnails_list-video-title
		padding-left 12px
		padding-right 12px
		padding-bottom 20px
		font__useTextLight 14
		font__line-height 18
	
	.YoutubeVideosList_thumbnails_list-video-thumbnail
		position relative

	.YoutubeVideosList_thumbnails_list-video-thumbnail-cache
		background-color color__$blue
		display block
		position absolute
		top 0
		left 0
		height 100%
		width 100%
		z-index 2
		background-position center center
		background-size cover

		&:after
			content ''
			display block
			position absolute
			z-index 2
			top 0
			left 0
			height 100%
			width 100%
			background-color rgba(color__$blue, 0.5)
		
		opacity 1
		transition opacity 320ms ease__inOutQuad()
		
		&.is--hidden
			display none
			
			html.csspointerevents &
				display block
				
				opacity 0
				pointer-events none
		
		html.touchevents &
			display none !important
	
	.YoutubeVideosList_thumbnails_list-video-thumbnail-cache-picto
		display block
		position absolute
		top 50%
		left 50%
		width 60px
		height 60px
		transform translate(-50%, -50%)
	
	.YoutubeVideosList_thumbnails_list-videos-list+.YoutubeVideosList_thumbnails_list-slider-pagination
		margin-top 30px

	.YoutubeVideosList_thumbnails_list-slider-pagination
		.size-class-not-width-compact &
			display none

		margin-left auto
		margin-right auto
</style>