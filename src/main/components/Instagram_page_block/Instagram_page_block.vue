<template lang="jade">
	.Instagram_page_block
		.Instagram_page_block-navigation
			.Instagram_page_block-navigation-hitbox-left(:class="leftNavigationDisabled ? 'is--disabled' : ''", @mouseover="moveTo('left')", @mouseleave="stopMoving()") LEFT
			.Instagram_page_block-navigation-hitbox-right(:class="rightNavigationDisabled ? 'is--disabled' : ''", @mouseover="moveTo('right')", @mouseleave="stopMoving()") RIGHT
		.Instagram_page_block-main-width-useful-width
			.Instagram_page_block-main-width-margin-width
				a.Instagram_page_block-instagram-link(target="_blank", :href="instagramUrl")
					.Instagram_page_block-instagram-link-picto
						.Instagram_page_block-instagram-link-picto-svg
							LogoInstagram
						.Instagram_page_block-instagram-link-picto-label {{credentials.id}}
				.Instagram_page_block-main-width(ref="mainWidth")
		.Instagram_page_block-scroll-view-wrapper(:style="scrollViewWrapperStyle")
			.Instagram_page_block-photos-scroll-view(ref="scrollView")
				ul.Instagram_page_block-photos-list(:style="'width:'+photosListWidth+'px'")
					li.Instagram_page_block-photo(v-for="photo in ordererPhotos")
						a.Instagram_page_block-link(target="_blank", :href="photo.link")
							.Instagram_page_block-photo-image(:style="'background-image:url('+photo.url+')'")
							.Instagram_page_block-photo-information
								.Instagram_page_block-photo-xebia-picto
									.Instagram_page_block-photo-xebia-picto-instagram
										LogoInstagram
									.Instagram_page_block-photo-xebia-picto-label {{credentials.id}}
								.Instagram_page_block-photo-caption(v-html="photo.caption")
					li.Instagram_page_block-xebia-instagram
						a.Instagram_page_block-xebia-instagram-link(target="_blank", :href="instagramUrl")
							.Instagram_page_block-xebia-instagram-link-picto
								.Instagram_page_block-xebia-instagram-link-picto-svg
									LogoInstagram
								.Instagram_page_block-xebia-instagram-link-picto-label {{credentials.id}}
					li.Instagram_page_block-offset(:style="'width:'+offsetWidth")


</template>

<script>
	import {nextTick} from 'vue'; 

	import Instafeed from 'instafeed.js';

	import {domWidth} from '@alexistessier/dom';

	import {mixin as sizeClassHelper} from 'tools/size-class-helper';
	import {mixin as fontLoader} from 'tools/font-loader';

	import LogoInstagram from 'generated/assets/components/Instagram_page_block/LogoInstagram';

	import getScrollBarWidth from 'tools/get-scroll-bar-width'
	let scrollBarWidth = getScrollBarWidth();

	export default {
		name: "Instagram_page_block",
		mixins: [sizeClassHelper, fontLoader],
		components: {
			LogoInstagram
		},
		props: {
			credentials: {
				type: Object,
				required: true
			}
		},
		data: function () {
			return {
				photos: [],
				screenWidth: 0,
				mainWidth: 0,
				widthCompact: false,
				leftNavigationDisabled: false,
				rightNavigationDisabled: false,
				scrollViewWrapperStyle: {
					height: (200 - scrollBarWidth)+'px'
				}
			}
		},
		created: function(){
			this.loadFont({
				text: ['light', 'regular']
			});

			const resize = ()=>{
				this.updateLayoutOnResize();
			}

			this.resizeListenerArguments = ['resize', resize];
			this.getSizeClassHelper().on(...this.resizeListenerArguments);

			const onSuccess = ({data}) => {
				this.photos = [];
				data.forEach(photo => {
					this.addPhoto(photo);
				});
				this.scrollToLast();
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

			this.stopLoop = false;

			let previousTime = Date.now();

			const _this = this;

			(function loop() {
				const currentTime = Date.now();
				let deltaTime = currentTime - previousTime;

				if (deltaTime > 100) {
					deltaTime = 0;
				}

				_this.loopEvent(deltaTime);

				previousTime = currentTime;

				if (!_this.stopLoop) {
					requestAnimationFrame(()=>{loop()})
				}
			})()
		},
		beforeDestroy: function () {
			this.getSizeClassHelper().off(...this.resizeListenerArguments);
			this.stopLoop = true;
		},
		computed: {
			offsetWidth: function () {
				const offset = (this.screenWidth-this.mainWidth)/2;

				return offset > 0 ? offset+'px' : 'auto';
			},
			photosListWidth: function () {
				const numberOfPhotos = this.ordererPhotos.length;
				return (numberOfPhotos ? (
					numberOfPhotos*200+(numberOfPhotos-1)
				) : 0)+(this.widthCompact ? 0 :
					221+(this.offsetWidth === 'auto' ? 0 : parseInt(this.offsetWidth, 10))
				);
			},
			ordererPhotos: function () {
				return this.photos.reverse();
			},
			instagramUrl: function () {
				return `https://www.instagram.com/${this.credentials.id}/`;
			}
		},
		methods: {
			loopEvent: function (deltaTime) {
				const moveBy = 620*(this.isMoving || 0)*deltaTime/1000;
				
				const scrollView = this.$refs.scrollView;

				if (scrollView) {
					const actualPosition = scrollView.scrollLeft;

					scrollView.scrollBy({
						behavior: 'instant',
						left: moveBy,
						top: 0
					});

					this.leftNavigationDisabled = actualPosition === 0;
					this.rightNavigationDisabled = actualPosition === (this.photosListWidth - domWidth(scrollView));
				}
			},
			moveTo: function (direction) {
				if (direction) {
					this.isMoving = ({
						right: 1,
						left: -1
					})[direction];
				}
			},
			stopMoving: function () {
				this.isMoving = 0;
			},
			updateLayoutOnResize: function () {
				const helper = this.getSizeClassHelper();
				this.screenWidth = helper.size.width;
				const mainWidth = this.$refs.mainWidth;
				this.widthCompact = helper.isActive('width-compact');

				this.mainWidth = mainWidth ? domWidth(mainWidth) : 0;

				this.scrollToLast();
			},
			addPhoto: function (instagramData) {
				this.photos.push({
					link: instagramData.link,
					url: '"'+instagramData.images.low_resolution.url+'"',
					caption: instagramData.caption.text
				});
			},
			scrollToLast: function () {
				this.scrollTo(this.photosListWidth);
			},
			scrollTo: function (position) {
				if (this.$refs.scrollView) {
					nextTick(()=>{
						this.$refs.scrollView.scroll({
							behavior: 'instant',
							left: position,
							top: 0
						});
					});
					
				}
			}
		},
		mounted: function () {
			this.updateLayoutOnResize();
			this.scrollToLast();
		}
	}
</script>

<style lang="stylus">
	Instagram_page_block__colorHover = color__$uiImportantClickable
	
	.Instagram_page_block-navigation
		display none

	.no-touchevents
		.Instagram_page_block-navigation
			layout__outerBox()
			position relative
			z-index 20
			
		&.size-class-width-compact
			.Instagram_page_block-navigation
				top 50px

		.Instagram_page_block-navigation-hitbox-left,
		.Instagram_page_block-navigation-hitbox-right
			display block
			position absolute
			width 20%
			height 200px
			top 0
			z-index 20
			font-size 0px

			&:after
				content ''
				display block
				position absolute
				top 0
				height 100%
				width 1000px
				
			&.is--disabled
				display none

	.Instagram_page_block-navigation-hitbox-left
		left 0
		&:after
			right 100%
		
		&:hover
			cursor: w-resize;
	
	.Instagram_page_block-navigation-hitbox-right
		right 0
		&:after
			left 100%
		
		&:hover
			cursor: e-resize;

	.Instagram_page_block-scroll-view-wrapper
		height 200px
		width 100%
		position relative
		overflow hidden
		
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

	.Instagram_page_block-main-width-useful-width
		layout__outerBox()
		background-color Instagram_page_block__colorHover
	
	.Instagram_page_block-main-width-margin-width
		layout__innerBox()
		
	.Instagram_page_block-main-width
		layout__centeredGridBox(28)

	.Instagram_page_block-photos-scroll-view
		position relative
		z-index 5
		width 100%
		height 100%
		overflow-x scroll
		overflow-y hidden
		clearfix()
		-webkit-overflow-scrolling: touch;
	
	.Instagram_page_block-photos-list
		clearfix()
	
	.Instagram_page_block-photo
		shape__square(200px)
		float left
		position relative
		
	.Instagram_page_block-photo+.Instagram_page_block-photo
		border-left 1px solid white

	.Instagram_page_block-link
		color white
		text-decoration none

	.Instagram_page_block-photo-image
		position absolute
		width 100%
		height 100%
		top 0
		left 0
		background-position center center
		background-repeat no-repeat
		z-index 1
		
	.Instagram_page_block-photo-information
		display none
		position absolute
		width 100%
		height 100%
		top 0
		left 0
		background-color Instagram_page_block__colorHover
		z-index 3
		
		.Instagram_page_block-link:hover &,
		.Instagram_page_block-link:focus &
			display block
			

	.Instagram_page_block-photo-xebia-picto,
	.Instagram_page_block-photo-caption
		margin 18px
	
	.Instagram_page_block-photo-xebia-picto
		clearfix()
	
	.Instagram_page_block-photo-xebia-picto-instagram,
	.Instagram_page_block-photo-xebia-picto-label
		display block
		float left
	
	.Instagram_page_block-photo-xebia-picto-instagram
		width 30px
		height 30px
		
		> .LogoInstagram
			display block
			max-width 100%
			max-height 100%
	
	.Instagram_page_block-photo-xebia-picto-label
		line-height 30px
		margin-left 12px
		font__useTextRegular 18
	
	.Instagram_page_block-photo-caption
		font__useTextLight 14
		font__line-height 18
	
	.Instagram_page_block-xebia-instagram
		display block
		float left
		width 220px
		height 200px
		border-left 1px solid white
		position relative
		
		.size-class-width-compact &
			display none
	
	.Instagram_page_block-xebia-instagram-link
		display block
		text-decoration none
		color white
		position absolute
		top 0
		left 0
		width 100%
		height 100%
		
		&:after
			content ''
			display block
			position absolute
			height 100%
			top 0
			left 100%
			width 40px
	
	.Instagram_page_block-xebia-instagram-link-picto
		clearfix()
		position absolute
		right 0
		top 50%
		transform translateY(-50%)
	
	.Instagram_page_block-xebia-instagram-link-picto-svg,
	.Instagram_page_block-xebia-instagram-link-picto-label
		display block
		float left
	
	.Instagram_page_block-xebia-instagram-link-picto-svg
		width 60px
		height 60px
		
		> .LogoInstagram
			display block
			max-width 100%
			max-height 100%
	
	.Instagram_page_block-xebia-instagram-link-picto-label
		margin-left 20px
		line-height 60px
		font__useTextRegular 30
	
	.Instagram_page_block-offset
		display block
		float left
		height 200px
		
		.size-class-width-compact &
			display none
	
	.Instagram_page_block-instagram-link
		display none
		position relative
		color white
		text-decoration none
		
		.size-class-width-compact &
			display block
			height 50px
			width 100%
			
	.Instagram_page_block-instagram-link-picto
		clearfix()
		position absolute
		left 0
		top 50%
		transform translateY(-50%)
	
	.Instagram_page_block-instagram-link-picto-svg,
	.Instagram_page_block-instagram-link-picto-label
		display block
		float left
	
	.Instagram_page_block-instagram-link-picto-svg
		width 35px
		height 35px
	
		> .LogoInstagram
			display block
			max-height 100%
			max-width 100%
	
	.Instagram_page_block-instagram-link-picto-label
		line-height 35px
		margin-left 20px
		font__useTextRegular 18
</style>