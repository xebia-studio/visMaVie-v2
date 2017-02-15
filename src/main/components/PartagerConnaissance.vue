<template lang="jade">
    .PartagerConnaissance
        StatCard(:picto="statCard.picto", :stat="statCard.stat", :text="statCard.text", :orientation="'horizontal'", v-for="statCard in statCards")
</template>

<script>
import StatCard from 'components/StatCard';

export default {
	name: 'PartagerConnaissance',
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
    .PartagerConnaissance
        clearfix()
        .size-class-width-compact &
            _grid('.StatCard', layout__$gridContainerNumberOfColumns, 2, 1, 3vw)
        .size-class-not-width-compact &
            _grid('.StatCard', layout__$gridContainerNumberOfColumns, 3, 2, 40px)

</style>
