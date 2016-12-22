<template lang="jade">
    StatCard(:picto="statData.picto", :stat="statData.stat", :text="statData.text")
</template>

<script>
import StatCard from 'components/StatCard'
import LogoXebia from 'src/generated/components/LogoXebia'

export default {
	name: 'Tester',
	data: function () {
		return {
			statData: {
				picto: LogoXebia,
				stat: '3',
				text: 'Toto'
			}
		}
	},
	components: {
		StatCard,
		LogoXebia
	}
}
</script>

<style lang="stylus">
    body
        background-color black
</style>
