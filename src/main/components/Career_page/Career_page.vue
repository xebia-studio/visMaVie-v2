<template lang="jade">
  AppPage.Career_page(:header="header")
    AppSection.Career_page-top-section.AppSection-odd(:title="content.name", :baseline="content.baseline")
        .Career_page-menu(slot='section-content')
            .Career_page-menu-title(v-html="content.menu_title")
    .Career_page-menu-nav-outer-wrapper
        .Career_page-menu-nav-inner-wrapper
            .Career_page-menu-nav
                button.Career_page-menu-nav-previous(type="button", ref="button-previous", @click="buttonClick($event, 'button-previous', navigationPrevious)")
                    ArrowBottom
                button.Career_page-menu-nav-next(type="button", ref="button-next", @click="buttonClick($event, 'button-next', navigationNext)")
                    ArrowBottom
                .Career_page-menu-scroll-view(ref="scrollView")
                    nav.Career_page-menu-links-list
                        a.Career_page-menu-link(v-for="(career, label) in carrieres", :href="career.url", :class="menuButtonIsActiveModifier(career.url)", @click="clickOnCareerItem($event, career.url)", :ref="'link_'+career.url")
                            .Career_page-menu-link-picto(:is="getSvgComponentCareer(career.svg_picto)")
                            .Career_page-menu-link-label(v-html="label")
    .Career_page-profile
        .Career_page-profile-useful-width
            .Career_page-profile-margin-constraint
                .Career_page-profile-contact-card
                    .Career_page-profile-contact-card-inner-wrapper
                        .Career_page-profile-contact-card-photo
                        .Career_page-profile-contact-name Pablo <strong>Lopez</strong>
                        .Career_page-profile-contact-sep
                        .Career_page-profile-contact-job Directeur Technique
                        .Career_page-profile-contact-button
                            CallToActionButton(:important="true", link="mailto:recrutement@xebia.fr", label="Le contacter")
                .Career_page-profile-starts-at-xebia
                    .Career_page-profile-title Ses débuts chez Xebia
                    .Career_page-profile-expertise
                        .Career_page-profile-expertise-picto-wrapper
                            .Career_page-profile-expertise-picto
                            .Career_page-profile-expertise-name back
                        .Career_page-profile-expertise-description Rentré en tant que <strong>Développeur Java JEE</strong> en 2009
                .Career_page-profile-new-works
                    .Career_page-profile-title Ses nouveaux terrains de jeu
                    ul.Career_page-profile-expertise-list
                        li.Career_page-profile-expertise
                            .Career_page-profile-expertise-picto-wrapper
                                .Career_page-profile-expertise-picto
                                .Career_page-profile-expertise-name back
                            ul.Career_page-profile-expertise-skills-list
                                li.Career_page-profile-expertise-skill Coding Architect
                                li.Career_page-profile-expertise-skill Lead Tech
                            ul.Career_page-profile-expertise-skills-list
                                li.Career_page-profile-expertise-skill Coding Architect
                                li.Career_page-profile-expertise-skill Lead Tech
                            ul.Career_page-profile-expertise-skills-list
                                li.Career_page-profile-expertise-skill Coding Architect
                                li.Career_page-profile-expertise-skill Lead Tech
</template>

<script>
import AppPage from 'components/AppPage';
import header from 'data/carriere/header.json';
import content from 'data/carriere/content.json';
import settings from 'data/carriere/$settings.json';

const scrollBehaviorUseSavedPositionObject = require('tools/scroll-behavior-use-saved-position-object');

import { mixin as fontLoader } from 'tools/font-loader';
import { mixin as sizeClassHelper } from 'tools/size-class-helper';
import { mixin as uiNavigationButton } from 'xebia-web-common/tools/ui-navigation-button';

import AppSection from 'components/AppSection';

import headerImageCacheSetter from 'generated/tools/components/Career_page/blurryHeaderImageCacheSetter';

import getSvgComponentCareer from 'generated/assets/pictoCareers/svgComponents/sync'

import getScrollBarWidth from 'tools/get-scroll-bar-width'

import ArrowBottom from 'generated/assets/components/Career_page/ArrowBottom'

import CallToActionButton from 'xebia-web-common/components/CallToActionButton'

import { domWidth } from '@alexistessier/dom'

export default {
    name: 'Career_page',
    mixins: [fontLoader, uiNavigationButton, sizeClassHelper],
    components: {
        AppPage,
        AppSection,
        ArrowBottom,
        CallToActionButton
    },
    data: function () {
        return {
            header: Object.assign({}, header, {
                imageCacheSetter: headerImageCacheSetter
            }),
            content,
            carrieres: settings.carrieres,
            isWidthCompact: false
        };
    },
    computed: {
        currentPage(){
            return this.$route.params.career;
        }
    },
    watch: {
        currentPage(){
            this.menuScrollToCurrent()
        }
    },
    methods: {
        getSvgComponentCareer,
        menuButtonIsActiveModifier(url){
            return this.$route.path === `/carriere/${url}` ? 'is--active' : 'is--unactive';
        },
        clickOnCareerItem: function (e, careerPath) {
            e.preventDefault();
            scrollBehaviorUseSavedPositionObject.value = true;
            this.$router.push({path: '/carriere/'+careerPath});
        },
        navigationPrevious(){
            const scrollView = this.$refs.scrollView;
            const target = this.getCurrentMenuElement();

            scrollView.scrollBy({
                behavior: "smooth",
                left: (-3)*domWidth(target),
                top: 0
            });
        },
        navigationNext(){
            const scrollView = this.$refs.scrollView;
            const target = this.getCurrentMenuElement();

            scrollView.scrollBy({
                behavior: "smooth",
                left: 3*domWidth(target),
                top: 0
            });
        },
        getCurrentMenuElement(){
            if(!this.$refs){
                return null;
            }

            if(!this.$refs['link_'+this.currentPage]){
                return null;
            }

            return this.$refs['link_'+this.currentPage][0] || null;
        },
        menuScrollToCurrent(behavior = "smooth"){
            this.menuScrollToTarget(this.getCurrentMenuElement(), behavior);
        },
        menuScrollToTarget(target, behavior = "smooth"){
            if(target){
                const scrollView = this.$refs.scrollView;

                scrollView.scrollTo({
                    behavior,
                    left: target.offsetLeft - domWidth(target),
                    top: 0
                });
            }
        },
        updateLayoutOnResize(){
            this.menuScrollToCurrent("instant");
        }
    },
    created(){
        this.loadFont({
            text: ['light', 'regular'],
            title: 'medium'
        });

        const sizeClassHelper = this.getSizeClassHelper();

        const resize = ()=>{
            this.updateLayoutOnResize();
        };

        this.resizeListenerArguments = ['resize', resize];
        sizeClassHelper.on(...this.resizeListenerArguments);
    },
    mounted(){
        this.updateLayoutOnResize();
    },
    beforeDestroy(){
        this.getSizeClassHelper().off(...this.resizeListenerArguments);
    }

};
</script>

<style lang="stylus">
    .Career_page-top-section.AppSection-odd
        border-bottom 0
        padding-bottom 0 !important
        
    .Career_page-menu-title
        font__useTitleMedium 32
        color color__$blue

    .Career_page-top-section+.Career_page-menu-nav-outer-wrapper
        margin-top 25px
        
    .Career_page-menu-nav-outer-wrapper
        .size-class-not-width-compact &
            layout__outerBox()
        
        .size-class-width-compact &
            position relative
            overflow hidden
            &:before, &:after
                display block
                content ''
                position absolute
                left 0
                width 100%
                height 1px
                background-color color__$neutral50
            
            &:before
                bottom 0
            &:after
                top 0
    
    .Career_page-menu-nav-inner-wrapper
        .size-class-not-width-compact &
            layout__innerBox()
        
    .Career_page-menu-nav
        .size-class-not-width-compact &
            layout__centeredGridBox(28)
        .size-class-width-compact &
            height (94 + 18px)
            position relative
    
    .Career_page-menu-scroll-view
        .size-class-width-compact &
            overflow-x scroll
            overflow-y hidden
            margin-left 45px
            margin-right 45px
            -webkit-overflow-scrolling: touch;
            position relative
            z-index 5
    
    .Career_page-menu-links-list
        .size-class-not-width-compact &
            layout__grid('.Career_page-menu-link', 28, 8, 1)
        
        .size-class-width-compact &
            width (92px * 8)
            width calc(100% / 3 * 8)
            clearfix()
    
    .Career_page-menu-link
        text-align center
        color color__$neutral50
        text-decoration none
        float left
        
        .size-class-width-compact &
            width 92px !important
            padding-top 18px
            height 94px
            width calc(100% / 8) !important

        &:hover, &:focus
            cursor pointer
            _hover_color = darken(color__$neutral50, 30%)
            color _hover_color
            
            > .Career_page-menu-link-picto
                path
                    fill _hover_color
    
    .Career_page-menu-link+.Career_page-menu-link
        .size-class-width-compact &
            position relative
            &:before
                content ''
                display block
                position absolute
                left 0
                top 0
                width 1px
                height 100%
                background-color color__$neutral50
    
    .Career_page-menu-link-picto
        display block
        width 100%
        path
            fill color__$neutral50
        
        .size-class-width-compact &
            width 70px
            height 51px
            max-width 100%
            margin-left auto
            margin-right auto
    
    .Career_page-menu-link-picto+.Career_page-menu-link-label
        margin-top 5px
        
        .size-class-width-compact &
            margin-top 13px

    .Career_page-menu-link-label
        font__useTextLight 14

    .Career_page-menu-link.is--active
        color color__$flashOrange
        > .Career_page-menu-link-picto
            path
                fill color__$flashOrange
    
    .size-class-not-width-compact
        .Career_page-menu-nav-previous,
        .Career_page-menu-nav-next
            display none

    .size-class-width-compact
        .Career_page-menu-nav-previous,
        .Career_page-menu-nav-next
            button__resetStyle()
            position absolute
            height 110px
            top 1px
            background-color white
            width 46px
            z-index 12
            
            &:hover, &:focus
                cursor pointer
                
                > .ArrowBottom
                    path
                        fill darken(color__$neutral50, 30%)
            
            > .ArrowBottom
                width 32px
                height 10px
                display block
                margin-left auto
                margin-right auto
                path
                    fill color__$neutral50
            
        .Career_page-menu-nav-previous
            left 0
            border-right 1px solid color__$neutral50
            
            > .ArrowBottom
                transform rotate(90deg)
        
        .Career_page-menu-nav-next
            right 0
            border-left 1px solid color__$neutral50

            > .ArrowBottom
                transform rotate(-90deg)
    
    .Career_page-menu-nav-outer-wrapper+.Career_page-profile
        margin-top 20px
        
        .size-class-not-width-compact &
            border-top 1px solid color__$neutral50
            border-bottom 1px solid color__$neutral50
    
    .Career_page-profile-useful-width
        layout__outerBox()
    .Career_page-profile-margin-constraint
        layout__innerBox()
        position relative
        min-height 450px
    
    .Career_page-profile-contact-card
        .size-class-not-width-compact &
            layout__gridBox(9)
            layout__gridTab(1)
            position absolute
            height 100%
            top 0
            left 0
            
            &:after
                content ''
                display block
                width 1px
                height 100%
                position absolute
                right 0
                top 0
                background-color color__$neutral50
    
    .Career_page-profile-contact-card-inner-wrapper
        padding-top 30px
        .size-class-not-width-compact &
            layout__gridBox(7, gridNumberOfColumns: 9)
    
    .Career_page-profile-contact-card-photo
        height 160px
        border-bottom 1px solid color__$neutral50
        background-position center bottom
        background-repeat no-repeat
        background-size 190px 160px
    
    .Career_page-profile-contact-card-photo+.Career_page-profile-contact-name
        margin-top 25px
    
    .Career_page-profile-contact-name,
    .Career_page-profile-contact-job
        text-align center
        font__useTextLight 14
        
        > strong
            font__useTextRegular()
    
    .Career_page-profile-contact-name
        color color__$blue
        
    .Career_page-profile-contact-sep
        display block
        margin 10px auto
        width 40px
        background-color color__$neutral50
        height 1px
    
    .Career_page-profile-contact-job
        color color__$text
    
    .Career_page-profile-contact-job+.Career_page-profile-contact-button
        margin-top 60px
    
    .Career_page-profile-contact-button
        layout__centeredGridBox(5, gridNumberOfColumns: 7)
        padding-bottom 30px
    
    .Career_page-profile-starts-at-xebia,
    .Career_page-profile-new-works
        layout__gridBox(16)
        layout__gridTab(12)
        padding-bottom 30px
    
    .Career_page-profile-starts-at-xebia
        padding-top 35px
    
    .Career_page-profile-new-works
        padding-top 20px
    
    .Career_page-profile-starts-at-xebia+.Career_page-profile-new-works
        position relative
        &:before
            content ''
            display block
            height 1px
            background-color color__$neutral50
            width 100%
            position absolute
            padding-right 2000px
            offset = 2 / 16 * 100%
            padding-left offset
            top 0
            left -(offset)
            
    
    .Career_page-profile-title
        font__useTitleMedium 28
        color color__$blue
</style>