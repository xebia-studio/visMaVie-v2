<template lang="jade">
    .StatCard-list
        StatCard(:picto="statCard.picto", :stat="statCard.stat", :text="statCard.text" v-for="statCard in statCards")
</template>

<script>
import StatCard from 'components/StatCard';

export default {
	name: 'StatCardList',
	props: {
	    statCards: {
	        required: true
	    }
	},
	components: {
		StatCard
	}
};
</script>

<style lang="stylus">
    .StatCard-list
        clearfix()

    .size-class-width-compact
        _grid('.StatCard', layout__$gridContainerNumberOfColumns, 2, 1, 3vw)

    .size-class-not-width-compact
        _grid('.StatCard', layout__$gridContainerNumberOfColumns, 4, 2, 40px)

</style>
