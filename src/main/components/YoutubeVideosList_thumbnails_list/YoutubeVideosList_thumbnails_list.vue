<template lang="jade">
	.YoutubeVideosList_thumbnails_list YoutubeVideosList_thumbnails_list
</template>

<script>
	import google from 'google-client-api'
 
	export default {
		name: 'YoutubeVideosList_thumbnails_list',
		methods: {
			getVideos: function () {
				gapi.client.init({
			    'apiKey': 'AIzaSyBXTNHXHYs-at06dkT49gahU3on1RXoqLU',
			  }).then(function() {
			    // 3. Initialize and make the API request.
			    return gapi.client.request({
			      'path': 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PL-Wbj9VN8zDS5PcUgk-lr8BMQaS8r8z3P&part=contentDetails,id,snippet&maxResults=10',
			    })
			  }).then(function(response) {
			    console.log(response.result);
			  }, function(reason) {
			    console.log('Error: ' + reason.result.error.message);
			  });
			}
		},
		created: function () {
			google().then(gapi => {
				this.gapi = gapi;
				gapi.load('client', ()=>{
					this.getVideos();
				});
			})
		}
	}
</script>

<style lang="stylus">
	.YoutubeVideosList_thumbnails_list
		//
</style>