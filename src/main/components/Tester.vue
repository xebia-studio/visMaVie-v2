<template lang="jade">
    .Section
        .StatCard-list
            StatCardList
</template>

<script>
import StatCardList from 'components/StatCardList'

export default {
	name: 'Tester',
	components: {
		StatCardList
	}
}
</script>

<style lang="stylus">
    body
        background-color color__$sectionEven

    .Section
        max-width (layout__$gridUsefulWidth)px

    .StatCard-list
        layout__gridBlock(24, 1)

    _grid('.StatCard', 24, 4, 2, 10px)
</style>
