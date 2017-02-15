<template lang="jade">
    .QuelquesChiffres
        StatCard(:picto="statCard.picto", :stat="statCard.stat", :text="statCard.text", :orientation="'vertical'", ref='card', v-for="statCard, index in statCards", :style="maxCardHeight[index]")
</template>

<script>
import {nextTick} from 'vue';

import {domHeight} from '@alexistessier/dom';

import { mixin as sizeClassHelper } from 'tools/size-class-helper';

import StatCard from 'components/StatCard/StatCard';

export default {
	name: 'QuelquesChiffres',
	mixins: [sizeClassHelper],
	props: {
	    statCards: {
	        required: true
	    }
	},
	data: function () {
	    return {
	        maxCardHeight : this.statCards.map(() => {
              return {height : 'auto'};
            })
	    };
	},
	methods: {
        updateLayoutOnResize : function() {
            this.maxCardHeight = this.statCards.map(() => {
              return {height : 'auto'};
            });
            nextTick(() => {
                if (this.$refs.card) {
                    const maxCardHeight = Math.max(...this.$refs.card.map((cardItem) => domHeight(cardItem.$el)));
                    this.maxCardHeight = this.statCards.map(() => {
                        return {height : maxCardHeight + 'px'};
                    });
                }
            });
        }
    },
	created: function () {
        const sizeClassHelper = this.getSizeClassHelper();
        const resize = () => {
            this.updateLayoutOnResize();
        };
        this.resizeListenerArguments = ['resize', resize];
        sizeClassHelper.on(...this.resizeListenerArguments);
    },
    mounted : function() {
        this.updateLayoutOnResize();
    },
    beforeDestroy : function() {
        this.getSizeClassHelper().off(...this.resizeListenerArguments);
    },
	components: {
		StatCard
	}
};
</script>

<style lang="stylus" src="./QuelquesChiffres.styl"></style>
