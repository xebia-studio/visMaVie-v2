<template lang="jade">
    RegularSection(:title="statSection.title", :baseline="statSection.baseline")
        StatCardList(:statData="statSection.statData", slot="section-content")
</template>

<script>
import RegularSection from 'components/RegularSection'
import StatCardList from 'components/StatCardList'
import HandWorldPicto from 'src/generated/components/HandWorldPicto'
import HandCouplePicto from 'src/generated/components/HandCouplePicto'
import HandPaperPenPicto from 'src/generated/components/HandPaperPenPicto'
import HandCoinPicto from 'src/generated/components/HandCoinPicto'
import HandBalloonsPicto from 'src/generated/components/HandBalloonsPicto'
import HandMoneyPigPicto from 'src/generated/components/HandMoneyPigPicto'
import HandMicroPicto from 'src/generated/components/HandMicroPicto'
import HandFactoryPicto from 'src/generated/components/HandFactoryPicto'

export default {
	name: 'Tester',
	data: function () {
		return {
		    statSection: {
		        title: 'Xebia en quelques chiffres',
		        //baseline: 'Écrire, enseigner, construire, manager... Les contributions internes sont nombreuses et chacun a la possibilité de participer en fonction de ses savoirs-faire et savoirs-être !',
                statData: [{
                    picto: HandWorldPicto,
                    stat: '3',
                    text: 'Pays'
                },
                {
                    picto: HandCouplePicto,
                    stat: '125',
                    text: 'Consultants en France'
                },
                {
                    picto: HandPaperPenPicto,
                    stat: '1800',
                    text: 'Articles de blog'
                },
                {
                    picto: HandCoinPicto,
                    stat: '5%',
                    text: 'du CA dédié aux XKE*'
                },
                {
                    picto: HandBalloonsPicto,
                    stat: '15',
                    text: 'Ans'
                },
                {
                    picto: HandMoneyPigPicto,
                    stat: '45',
                    text: 'Millions de CA'
                },
                {
                    picto: HandMicroPicto,
                    stat: '182',
                    text: 'Slots en XKE en 2016'
                },
                {
                    picto: HandFactoryPicto,
                    stat: '8',
                    text: 'Fondations techniques'
                }]
            }
		}
	},
	components: {
	    RegularSection,
		StatCardList,
		HandWorldPicto,
		HandCouplePicto,
		HandPaperPenPicto,
		HandCoinPicto,
		HandBalloonsPicto,
		HandMoneyPigPicto,
		HandMicroPicto,
		HandFactoryPicto
	}
}
</script>

<style lang="stylus">
    body
        background-color color__$sectionEven

    .Section
        max-width (layout__$gridUsefulWidth)px
</style>
