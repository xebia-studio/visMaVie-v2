<template lang="jade">
    .StatCard-list
        StatCard(:picto="statItemData.picto", :stat="statItemData.stat", :text="statItemData.text" v-for="statItemData in statData")
</template>

<script>
import StatCard from 'components/StatCard';

export default {
	name: 'StatCardList',
	props: {
	    statData: {
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
        min-height 600px

    .size-class-width-compact
        _grid('.StatCard', layout__$gridContainerNumberOfColumns, 2, 1, 3vw)

    .size-class-not-width-compact
        _grid('.StatCard', layout__$gridContainerNumberOfColumns, 4, 2, 40px)

</style>
