<template lang="jade">
	AppPage.HomePage(:header="header")
		AppSection.AppSection-even(:title="'Xebia en quelques chiffres'")
			QuelquesChiffres(:statCards="quelquesChiffres", slot="section-content")
</template>

<script>
  import AppPage from 'components/AppPage/AppPage';
  import AppSection from 'components/AppSection/AppSection';

  import {mixin as fontLoader} from 'tools/font-loader';
  import {mixin as sizeClassHelper} from 'tools/size-class-helper';

  import {HomePage as settings} from 'settings/components';
  import header from 'assets/data/home/header.json';

  import QuelquesChiffres from 'components/QuelquesChiffres/QuelquesChiffres';
  import quelquesChiffres from 'assets/data/home/quelques-chiffres.json';

  export default {
    name: 'HomePage',
    mixins: [fontLoader, sizeClassHelper],
    data: function() {
      return {
        header,
        quelquesChiffres
      };
    },
    created: function() {
      this.loadFont({
        'text': 'light',
        'title': 'regular'
      });
    },
    computed: {
      settings : function() {
        return settings;
      }
    },
    components: {
      AppPage,
      AppSection,
      QuelquesChiffres
    }
  };
</script>

<style lang="stylus" src="./Home.styl"></style>
