<template lang="jade">
	AppPage.HomePage(:header="header")
		AppSection.AppSection-even(:title="statSection.title", :baseline="statSection.baseline")
			StatCardList(:statData="statSection.statData", slot="section-content")
</template>

<script>
  import AppPage from 'components/AppPage';
  import AppSection from 'components/AppSection';
  import StatCardList from 'components/StatCardList';

  import LogoXebia from 'xebia-web-common/generated/components/LogoXebia';
  import HandWorldPicto from 'src/generated/components/HandWorldPicto';
  import HandCouplePicto from 'src/generated/components/HandCouplePicto';
  import HandPaperPenPicto from 'src/generated/components/HandPaperPenPicto';
  import HandCoinPicto from 'src/generated/components/HandCoinPicto';
  import HandBalloonsPicto from 'src/generated/components/HandBalloonsPicto';
  import HandMoneyPigPicto from 'src/generated/components/HandMoneyPigPicto';
  import HandMicroPicto from 'src/generated/components/HandMicroPicto';
  import HandFactoryPicto from 'src/generated/components/HandFactoryPicto';

  import {mixin as fontLoader} from 'tools/font-loader';
  import {mixin as sizeClassHelper} from 'tools/size-class-helper';

  import {HomePage as settings} from 'settings/components';
  import header from 'assets/data/home/header.json';

  export default {
    name : 'HomePage',
    mixins : [fontLoader, sizeClassHelper],
    data : function() {
      return {
        header,
        statSection : {
          title : 'Xebia en quelques chiffres',
          //baseline: 'Écrire, enseigner, construire, manager... Les contributions internes sont nombreuses et chacun a la possibilité de participer en fonction de ses savoirs-faire et savoirs-être !',
          statData : [
            {
              picto : HandWorldPicto,
              stat : '3',
              text : 'Pays'
            },
            {
              picto : HandCouplePicto,
              stat : '125',
              text : 'Consultants en France'
            },
            {
              picto : HandPaperPenPicto,
              stat : '1800',
              text : 'Articles de blog'
            },
            {
              picto : HandCoinPicto,
              stat : '5%',
              text : 'du CA dédié aux XKE*'
            },
            {
              picto : HandBalloonsPicto,
              stat : '15',
              text : 'Ans'
            },
            {
              picto : HandMoneyPigPicto,
              stat : '45',
              text : 'Millions de CA'
            },
            {
              picto : HandMicroPicto,
              stat : '182',
              text : 'Slots en XKE en 2016'
            },
            {
              picto : HandFactoryPicto,
              stat : '8',
              text : 'Fondations techniques'
            }
          ]
        }
      };
    },
    components : {
      AppPage,
      LogoXebia,
      AppSection,
      StatCardList,
      HandWorldPicto,
      HandCouplePicto,
      HandPaperPenPicto,
      HandCoinPicto,
      HandBalloonsPicto,
      HandMoneyPigPicto,
      HandMicroPicto,
      HandFactoryPicto
    },
    created : function() {
      this.loadFont({
        'text' : 'light',
        'title' : 'regular'
      });
    },
    computed : {
      settings : function() {
        return settings;
      }
    }
  };
</script>

<style lang="stylus" src="./HomePage.styl"></style>
