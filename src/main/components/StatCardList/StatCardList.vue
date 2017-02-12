<template lang="jade">
  .StatCard-list
    StatCard(:picto="statCard.picto", :stat="statCard.stat", :text="statCard.text" v-for="statCard in statCards")
</template>

<script>
  import StatCard from 'components/StatCard/StatCard';

  export default {
    name: 'StatCardList',
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

<style lang="stylus" src="./StatCardList.styl"></style>
