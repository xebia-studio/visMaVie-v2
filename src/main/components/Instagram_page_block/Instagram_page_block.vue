<template lang="jade">
	.Instagram_page_block
		h1 hello
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
		created: function(){
			this.feed = new Instafeed({
				get: "user",
				userId: this.credentials.userId,
				clientId: this.credentials.clientId,
				accessToken: this.credentials.accessToken,
				mock: true,
				success: data => {
					onSuccess(data);
				}
			});

			const onSuccess = data => {
				console.log(data)
			}

			this.feed.run();
		}
	}
</script>