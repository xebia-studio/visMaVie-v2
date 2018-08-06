<template lang="jade">
    .AppPage
        ParallaxedLayersGroup
            VisMaVie_navigation_bar_layer(:scrollPositionToReachBeforeLightBackground="scrollPositionToReachBeforeLightBackground")


            slot

            VisMaVie_footer_layer.AppPage-footer-layer
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
