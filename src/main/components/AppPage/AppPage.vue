<template>
    <div class="AppPage">
      <ParallaxedLayersGroup>
          <div class="announcement"><p>Depuis le 15 novembre 2018, <span>Xebia</span> a rejoint <span>Publicis Sapient</span>, leader de la Digital Business Transformation.</p></div>

          <VisMaVie_navigation_bar_layer :scrollPositionToReachBeforeLightBackground="scrollPositionToReachBeforeLightBackground"></VisMaVie_navigation_bar_layer>
        <slot></slot>
        <VisMaVie_footer_layer class="AppPage-footer-layer"></VisMaVie_footer_layer>
      </ParallaxedLayersGroup>
    </div>
</template>

<script>
    import { mixin as layout } from 'tools/page-layout'

    import VisMaVie_navigation_bar_layer from 'components/VisMaVie_navigation_bar_layer';
    import VisMaVie_footer_layer from 'components/VisMaVie_footer_layer'

    import BlurryHeaderLayer from 'xebia-web-common/components/BlurryHeaderLayer';

    import { BlurryHeaderLayer as blurryHeaderLayerSettings } from 'settings/components';

    import CallToActionLayer from 'components/CallToActionLayer';

    import layoutSettings from 'settings/layout';

    export default {
        name: 'AppPage',
        mixins: [layout],
        props: {
            header: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                scrollPositionToReachBeforeLightBackground: undefined,
                configScreenFiller: {
                    'width-compact': '500px',
                    'default': (blurryHeaderLayerSettings.heightBlurryHeader / layoutSettings.screenHeightIdeal * 100)
                }
            };
        },
        methods: {
            headerResize: function (headerHeight) {
                this.scrollPositionToReachBeforeLightBackground = parseInt(headerHeight, 10);
            }
        },
        components: {
            VisMaVie_navigation_bar_layer,
            BlurryHeaderLayer,
            CallToActionLayer,
            VisMaVie_footer_layer
        }
    }
</script>

<style lang="stylus">
    .announcement
        position absolute
        width 100%
        background white
        min-height 40px
        top 40px
        z-index  10
        opacity 0.8

        & p
            width auto
            text-align center
            font__useTitleRegular 16
            padding 20px 0

            & span
                font__useTitleBold 16

        .size-class-navigation-bar-width-compact &
            top 50px
            & p
                line-height 18px

        .size-class-width-compact &
            display block


 </style>
