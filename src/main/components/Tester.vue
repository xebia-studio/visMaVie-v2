<template lang="jade">
    .Section
        .StatCard-list
            StatCard(:picto="statData.picto", :stat="statData.stat", :text="statData.text")
            StatCard(:picto="statData.picto", :stat="statData.stat", :text="statData.text")
            StatCard(:picto="statData.picto", :stat="statData.stat", :text="statData.text")
            StatCard(:picto="statData.picto", :stat="statData.stat", :text="statData.text")
            StatCard(:picto="statData.picto", :stat="statData.stat", :text="statData.text")
            StatCard(:picto="statData.picto", :stat="statData.stat", :text="statData.text")
            StatCard(:picto="statData.picto", :stat="statData.stat", :text="statData.text")
            StatCard(:picto="statData.picto", :stat="statData.stat", :text="statData.text")
</template>

<script>
import StatCard from 'components/StatCard'
import HomeStat1 from 'src/generated/components/HomeStat1'

export default {
	name: 'Tester',
	data: function () {
		return {
			statData: {
				picto: HomeStat1,
				stat: '125',
				text: 'Consultants en France'
			}
		}
	},
	components: {
		StatCard,
		HomeStat1
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
