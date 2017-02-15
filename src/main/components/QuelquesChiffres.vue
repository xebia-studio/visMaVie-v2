<template lang="jade">
    .QuelquesChiffres
        StatCard(:picto="statCard.picto", :stat="statCard.stat", :text="statCard.text", :orientation="'vertical'", v-for="statCard in statCards")
</template>

<script>
import StatCard from 'components/StatCard';

export default {
	name: 'QuelquesChiffres',
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
    .QuelquesChiffres
        clearfix()
        .size-class-width-compact &
            _grid('.StatCard', layout__$gridContainerNumberOfColumns, 2, 1, 3vw)
        .size-class-not-width-compact &
            _grid('.StatCard', layout__$gridContainerNumberOfColumns, 4, 2, 40px)

</style>
