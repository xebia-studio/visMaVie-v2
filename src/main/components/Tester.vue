<template lang="jade">
    OfferAccordion(:jobs="jobs", :talentButtonLabel="talentButtonLabel", :jobButtonLabel="jobButtonLabel")
</template>

<script>
  import OfferAccordion from 'components/OfferAccordion';

  import annonces from 'assets/data/nous-rejoindre/annonces.yaml';

  export default {
    name : 'Tester',
    data : function() {
      return {
        jobs : annonces,
        talentButtonLabel : 'Vous avez d\'autres talents&nbsp;? C\'est&nbsp;par&nbsp;ici&nbsp;!',
        jobButtonLabel : 'Postuler !'
      };
    },
    components : {
      OfferAccordion
    }
  };
</script>

<style lang="stylus">
</style>
