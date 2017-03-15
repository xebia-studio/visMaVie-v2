<template lang="jade">
    .AppPage
        ParallaxedLayersGroup
            NavigationBarLayer(:scrollPositionToReachBeforeLightBackground="scrollPositionToReachBeforeLightBackground", :settingsNavigation="settingsNavigation")
                LogoVisMaVie(slot="logo")

            BlurryHeaderLayer(@resize="headerResize", :title="header.title", :description="header.description", :image="header.image", :description_image="header.image_description", ref="blurryHeader", :titleLevel="header.titleLevel", :configScreenFiller="configScreenFiller", :headerImageCacheSetter="header.imageCacheSetter")
                slot(name='headerContent')
            .AppPage-in-header-block(ref='inHeaderContainer')
                CallToActionLayer(ref="inHeader")

            slot

            ParallaxedLayer.AppPage-footer-layer
                AppFooter
                    AppFooterSiteMap(slot="col1", :siteMap="siteMap")
                    AppFooterLinksList(slot="col2", label="Nous Recrutons", :links="nousRecrutons")
                    AppFooterContacts(slot="col3", :contacts="contacts", :otherSites="otherSites")
                    AppFooterSocialNetworks(slot="col4", :socialNetworks="socialNetworks")
                FooterNavigationBar
                CookiesBar
</template>

<script>

import ParallaxedLayersGroup from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayersGroup';
import ParallaxedLayer from 'xebia-web-common/components/ParallaxedLayersGroup/ParallaxedLayer';

import NavigationBarLayer from 'xebia-web-common/components/NavigationBarLayer';
import BlurryHeaderLayer from 'xebia-web-common/components/BlurryHeaderLayer';

import LogoVisMaVie from 'generated/assets/components/AppPage/LogoVisMaVie';

import { BlurryHeaderLayer as blurryHeaderLayerSettings } from 'settings/components';

import CallToActionLayer from 'components/CallToActionLayer';
import FooterNavigationBar from 'components/FooterNavigationBar';
import CookiesBar from 'components/CookiesBar';

import settingsNavigation from 'data/header/$settings.json';
import layoutSettings from 'settings/layout';

import AppFooter from 'xebia-web-common/components/AppFooter';
import AppFooterSiteMap from 'xebia-web-common/components/AppFooter/AppFooterNavGroups/AppFooterSiteMap';
import AppFooterLinksList from 'xebia-web-common/components/AppFooter/AppFooterNavGroups/AppFooterLinksList';
import AppFooterSocialNetworks from 'xebia-web-common/components/AppFooter/AppFooterNavGroups/AppFooterSocialNetworks';
import AppFooterContacts from 'xebia-web-common/components/AppFooter/AppFooterNavGroups/AppFooterContacts';

import nousRecrutons from 'data/footer/nous-recrutons.yaml';
import siteMap from 'data/footer/site-map.yaml';
import contacts from 'data/footer/contacts.yaml';
import otherSites from 'data/footer/autres-sites.yaml';
import socialNetworks from 'data/footer/reseaux-sociaux.yaml';

export default {
    name: 'AppPage',
    props: {
        header: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    data: function () {
        return {
            siteMap,
            nousRecrutons,
            contacts,
            otherSites,
            socialNetworks,
            settingsNavigation,
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
        NavigationBarLayer,
        LogoVisMaVie,
        BlurryHeaderLayer,
        CallToActionLayer,
        AppFooter,
        AppFooterSiteMap,
        AppFooterLinksList,
        AppFooterSocialNetworks,
        AppFooterContacts,
        ParallaxedLayersGroup,
        ParallaxedLayer,
        FooterNavigationBar,
        CookiesBar
    }
};
</script>
