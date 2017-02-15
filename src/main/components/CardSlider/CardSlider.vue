<template lang="jade">
    .CardSlider(v-bind:style="{height: isWidthCompact ? '' : componentDesktopHeight}")
        .CardSlider-wrapper
            Slider.CardSlider-slider(:breakpoints='sliderBreakpoints', ref='slider', loop=false, :speed='400', pagination='.CardSlider-pagination', :paginationBulletRender='paginationBulletRender')
                SliderSlide.CardSlider-slide(v-for="card, index in cards", ref="card", v-bind:style="cardsDesktopPosition[index].css")
                    .CardSlider-slide-inner-wrapper(v-bind:style="maxCardHeight[index]")
                        .Card-image(:is="svgComponent(card.image)")
                        .Card-title(v-html="card.title")
                        .Card-text(v-html="card.text", v-if="!isWidthCompact")
                        ArrowLink.Card-link(:url="card.link", :label="'En Savoir Plus'", :external="true")
        .CardSlider-pagination(ref='pagination', :style="{width: paginationWidth+ 'px'}")
</template>

<script>
  import {range} from 'lodash';
  import {nextTick} from 'vue';
  import {domHeight} from '@alexistessier/dom';

  import {mixin as fontLoader} from 'tools/font-loader';
  import {mixin as svgComponent} from 'tools/svg-component';
  import {mixin as sizeClassHelper, config as sizeClassHelperConfig} from 'tools/size-class-helper';

  import {CardSlider as settings} from 'settings/components';

  import Slider from 'xebia-web-common/components/Slider/Slider';
  import SliderSlide from 'xebia-web-common/components/Slider/SliderSlide';
  import ArrowLink from 'xebia-web-common/components/ArrowLink';

  import getScrollBarWidth from 'scrollbar-width';
  const scrollBarWidth = getScrollBarWidth();

  export default {
    name : 'CardSlider',
    mixins : [fontLoader, svgComponent, sizeClassHelper],
    props : {
      cards : {
        required : true
      }
    },
    data : function() {
      return {
        isWidthCompact : this.getSizeClassHelper().isActive('width-compact'),
        maxCardHeight : this.cards.map(() => {
          return {height : 'auto'};
        }),
        cardsDesktopPosition : this.cards.map(() => {
          return {css : {top : '0px', left : '0px'}, rawTop : 0};
        }),
        componentDesktopHeight : 0
      };
    },
    computed : {
      paginationWidth : function() {
        const paginationBulletSize = settings.paginationBulletSize + (settings.paginationBulletBorderWidth * 2);
        return (this.cards.length * paginationBulletSize + Math.max(0, this.cards.length - 1) * settings.paginationBulletsSpaceBetween);
      },
      sliderBreakpoints : function() {
        const conf = {};
        conf[sizeClassHelperConfig['width-compact'].maxWidth + scrollBarWidth] = {
          slidesPerView : 1,
          spaceBetween : 20
        };

        //Infinity
        //Must be defined, otherwise the pagination is bugged when switching from one breakpoints to an other
        conf[Infinity] = {
          slidesPerView : 1,
          spaceBetween : 0
        };
        return conf;
      }
    },
    methods : {
      paginationBulletRender : function(swiper, index, className) {
        return '<button type="button" class="CardSlider-pagination-bullet ' + className + '">' + (index + 1) + '</button>';
      },
      updateLayoutOnDeviceChange : function() {
        this.$refs.slider ? this.$refs.slider.update(true) : null;
      },
      updateLayoutOnResize : function() {
        this.maxCardHeight = this.cards.map(() => {
          return {height : 'auto'};
        });
        nextTick(() => {
          if (this.$refs.card) {
            if (this.isWidthCompact) {
              const maxCardHeight = Math.max(...this.$refs.card.map((cardItem) => domHeight(cardItem.$el)));
              this.maxCardHeight = this.cards.map(() => {
                return {height : (maxCardHeight - (settings.cardBorder * 2)) + 'px'};
              });
            } else {
              const columnHeights = range(settings.desktopCardsPerRow).map(() => 0);
              const temporaryCardsDesktopPosition = this.cards.map(() => {
                return {css : {top : '0px', left : '0px'}, rawTop : 0};
              });
              const cardHeights = this.$refs.card.map((card) => {
                return domHeight(card.$el);
              });
              this.cards.forEach((card, index) => {
                // Get the column where you have to place the card
                let targetColumnIndex = -1;
                if (index >= parseInt(this.cards.length / settings.desktopCardsPerRow) * settings.desktopCardsPerRow && this.cards.length % settings.desktopCardsPerRow != 0) {
                  targetColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
                } else {
                  targetColumnIndex = index % settings.desktopCardsPerRow;
                }
                temporaryCardsDesktopPosition[index].css.left = 1 / settings.desktopCardsPerRow * 100 * (targetColumnIndex) + '%';
                if (index >= settings.desktopCardsPerRow) {
                  const targetColumnLastCardIndex = ((parseInt(index / settings.desktopCardsPerRow) - 1) * settings.desktopCardsPerRow) + targetColumnIndex;
                  const targetColumnLastCardBottom = temporaryCardsDesktopPosition[targetColumnLastCardIndex].rawTop + cardHeights[targetColumnLastCardIndex];
                  temporaryCardsDesktopPosition[index].css.top = 'calc(' + targetColumnLastCardBottom + 'px + ' + parseInt(index / settings.desktopCardsPerRow) * 2 + 'vw)';
                  temporaryCardsDesktopPosition[index].rawTop = targetColumnLastCardBottom;
                }
                columnHeights[targetColumnIndex] += cardHeights[index];
              });
              this.componentDesktopHeight = 'calc(' + (Math.max(...columnHeights) + 'px + ' + parseInt(this.cards.length / settings.desktopCardsPerRow) * 2) + 'vw';
              this.cardsDesktopPosition = temporaryCardsDesktopPosition;
            }
          }
        });
      }
    },
    created : function() {
      this.loadFont({
          'text' : [],
          'title' : ['light', 'regular']
        },
        {
          fontactive : () => {
            this.activeFont = this.activeFont ? (this.activeFont + 1) : 1;
            if (this.activeFont >= 2) {
              this.updateLayoutOnResize();
            }
          }
        });
      const sizeClassHelper = this.getSizeClassHelper();
      this.getSizeClassHelper().on('resize', () => {
        this.isWidthCompact = this.getSizeClassHelper().isActive('width-compact');
      });
      const change = () => {
        this.updateLayoutOnDeviceChange();
      };
      const resize = () => {
        this.updateLayoutOnResize();
      };
      this.deviceChangeListenerArguments = ['change', change];
      sizeClassHelper.on(...this.deviceChangeListenerArguments);
      this.resizeListenerArguments = ['resize', resize];
      sizeClassHelper.on(...this.resizeListenerArguments);
    },
    mounted : function() {
      this.updateLayoutOnResize();
      this.updateLayoutOnDeviceChange();
    },
    beforeDestroy : function() {
      this.getSizeClassHelper().off(...this.deviceChangeListenerArguments);
      this.getSizeClassHelper().off(...this.resizeListenerArguments);
    },
    components : {
      Slider,
      SliderSlide,
      ArrowLink
    }
  };
</script>

<style lang="stylus" src="./CardSlider.styl"></style>
