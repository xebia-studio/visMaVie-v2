<template lang="jade">
    AppPage.NosCreations(:header="header")
</template>

<script>
import AppPage from 'components/AppPage';
import header from 'assets/data/nos-creations/header.json';

import AppSection from 'components/AppSection';

import { mixin as fontLoader } from 'tools/font-loader';

export default {
	name: 'NosCreations',
	mixins: [fontLoader],
	data: function () {
		return {
		    header
		};
	},
	created: function () {
            this.loadFont({
                'text': ['light', 'regular'],
            });
    },
	components: {
	    AppPage,
	    AppSection
	}
};
</script>

<style lang="stylus">
</style>
