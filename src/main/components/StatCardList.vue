<template lang="jade">
    .StatCard-list
        template(v-for="statItemData in statData")
            StatCard(:picto="statItemData.picto", :stat="statItemData.stat", :text="statItemData.text")
</template>

<script>
import StatCard from 'components/StatCard'

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
}
</script>

<style lang="stylus">
    .StatCard-list
        layout__gridBlock(24, 1)

    .size-class-width-compact
        _grid('.StatCard', 24, 2, 1, 15px)

    .size-class-not-width-compact
        _grid('.StatCard', 24, 4, 2, 40px)

</style>
