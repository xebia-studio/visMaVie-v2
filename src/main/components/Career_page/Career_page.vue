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
                        a.Career_page-menu-link(v-for="(career, label) in carrieres", :href="career.url", :class="menuButtonIsActiveModifier[career.url]", @click="clickOnCareerItem($event, career.url)", :ref="'link_'+career.url")
                            .Career_page-menu-link-picto(:is="getSvgComponentCareer(career.svg_picto)")
                            .Career_page-menu-link-label(v-html="label")
    .Career_page-profile(v-if="currentCareer")
        .Career_page-profile-useful-width
            .Career_page-profile-margin-constraint
                .Career_page-profile-contact-card
                    .Career_page-profile-contact-card-inner-wrapper
                        .Career_page-profile-contact-card-photo(:style="photoStyle")
                        .Career_page-profile-contact-name(v-html="currentCareer.name")
                        .Career_page-profile-contact-sep
                        .Career_page-profile-contact-job {{currentCareer.job}}
                        .Career_page-profile-contact-button
                            CallToActionButton(:important="true", :link="contactLink", :label="contactLabel")
                .Career_page-profile-starts-at-xebia
                    .Career_page-profile-title Ses débuts chez Xebia
                    .Career_page-profile-start-expertise
                        .Career_page-profile-start-expertise-picto-wrapper
                            .Career_page-profile-start-expertise-picto(:is="getSvgComponentCareer(currentCareer.svg_picto_expertise)")
                            .Career_page-profile-start-expertise-name {{currentCareer.expertise_name}}
                        .Career_page-profile-start-expertise-description
                            span(v-html="currentCareer.expertise_description")
                .Career_page-profile-new-works
                    .Career_page-profile-title Ses nouveaux terrains de jeu
                    ul.Career_page-profile-expertise-list
                        li.Career_page-profile-expertise(v-for="expertise in currentCareer.new_works")
                            .Career_page-profile-expertise-picto-wrapper
                                .Career_page-profile-expertise-picto(:is="getSvgComponentCareer(expertise.svg_picto)")
                                .Career_page-profile-expertise-name {{expertise.name}}
                                ul.Career_page-profile-expertise-skills-list
                                    li.Career_page-profile-expertise-skill(v-for="skill in expertise.skills") {{skill}}
                .Career_page-profile-interventions(v-if="currentCareer.interventions")
                    .Career_page-profile-title Ses dernières interventions
                    ul.Career_page-profile-interventions-list
                        li.Career_page-profile-intervention(v-for="(link, label) in currentCareer.interventions") 
                            span(v-if="link === true") {{label}}
                            a(v-else, :href="link", target="_blank") {{label}}
                .Career_page-profile-creations
                    .Career_page-profile-title Ses créations chez Xebia
                    ul.Career_page-profile-creations-list
                        li.Career_page-profile-creation speaker
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
            isWidthCompact: false,
            photoCache: null
        };
    },
    computed: {
        contactLink(){
            const currentCareer = this.currentCareer;
            return currentCareer.contact_button_link ? currentCareer.contact_button_link : settings.contact_button_link;
        },
        contactLabel(){
            const currentCareer = this.currentCareer;
            return currentCareer.contact_button_label ? currentCareer.contact_button_label : settings.contact_button_label;
        },
        photoStyle(){
            return this.photoCache ? {
                "background-image": `url("${this.photoCache}")`
            } : null;
        },
        currentCareer(){
            for(const label in this.carrieres){
                const career = this.carrieres[label];

                if (this.currentPage === career.url) {
                    return career;
                }
            }
            return null;
        },
        currentPage(){
            return this.$route.params.career;
        },
        menuButtonIsActiveModifier(){
            const classList = {};

            for(const label in this.carrieres){
                const career = this.carrieres[label];

                classList[career.url] = this.$route.path === `/carriere/${career.url}` ? 'is--active' : 'is--unactive';
            }

            return classList;
        }
    },
    watch: {
        currentPage(){
            this.menuScrollToCurrent();
        },
        currentCareer(){
            this.loadPhoto();
        }
    },
    methods: {
        getSvgComponentCareer,
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
        },
        loadPhoto(){
            this.photoCache = null;
            require.ensure([], require => {
                this.photoCache = require(`generated/assets/components/Career_page/images/${this.currentCareer.photo}`);
            });
        }
    },
    created(){
        this.loadFont({
            text: ['light', 'regular'],
            title: ['medium', 'regular']
        });

        const sizeClassHelper = this.getSizeClassHelper();

        sizeClassHelper.setSizeClass('career-page-width-compact', {
            minWidth: 0,
            maxWidth: 600
        });

        const resize = ()=>{
            this.updateLayoutOnResize();
        };

        this.resizeListenerArguments = ['resize', resize];
        sizeClassHelper.on(...this.resizeListenerArguments);
    },
    mounted(){
        this.updateLayoutOnResize();
        this.loadPhoto();
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
            z-index 8
            
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
    
    .Career_page-profile
        .size-class-not-width-compact &
            clearfix()
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
        padding-top 24px
        .size-class-not-width-compact &
            layout__gridBox(7, gridNumberOfColumns: 9)
        
        .size-class-width-compact &
            layout__centeredGridBox(18)
    
    .Career_page-profile-contact-card-photo
        height 160px
        border-bottom 1px solid color__$neutral50
        background-position center bottom
        background-repeat no-repeat
        background-size auto 100%
        background-size contain
    
    .Career_page-profile-contact-card-photo+.Career_page-profile-contact-name
        margin-top 25px
    
    .Career_page-profile-contact-name,
    .Career_page-profile-contact-job
        text-align center
        font__useTextLight()
        
        > strong
            font__useTextRegular()
    
    .Career_page-profile-contact-name
        font__rem-size 20

    .Career_page-profile-contact-job
        font__rem-size 14

    .Career_page-profile-contact-name
        color color__$blue
        white-space nowrap
        
    .Career_page-profile-contact-sep
        display block
        margin 10px auto
        width 40px
        background-color color__$neutral50
        height 1px
    
    .Career_page-profile-contact-job
        color color__$text
        white-space nowrap
    
    .Career_page-profile-contact-job+.Career_page-profile-contact-button
        margin-top 60px
        
        .size-class-width-compact &
            margin-top 30px
    
    .Career_page-profile-contact-button
        padding-bottom 15px
        
        .size-class-not-width-compact &
            layout__centeredGridBox(5, gridNumberOfColumns: 7)
            padding-bottom 30px
    
    .Career_page-profile-starts-at-xebia,
    .Career_page-profile-new-works
        padding-bottom 30px
        
        .size-class-not-width-compact &
            layout__gridBox(16)
            layout__gridTab(12)
    
    .Career_page-profile-starts-at-xebia
        padding-top 35px
    
    .Career_page-profile-new-works
        padding-top 20px
        
        .size-class-width-compact &
            padding-top 0px
    
    .Career_page-profile-starts-at-xebia+.Career_page-profile-new-works
        .size-class-not-width-compact &
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
        font__useTitleRegular 24
        color color__$blue
        
    .Career_page-profile-title+.Career_page-profile-start-expertise
    .Career_page-profile-title+.Career_page-profile-expertise-list
        margin-top 20px
    
    .Career_page-profile-start-expertise,
    .Career_page-profile-expertise
        clearfix()
        position relative

    .Career_page-profile-start-expertise-picto-wrapper,
    .Career_page-profile-expertise-picto-wrapper
        margin-left 10px
        text-align center
        width 70px
        
    .Career_page-profile-start-expertise-picto,
    .Career_page-profile-expertise-picto
        display block
        width 100%
    
    .Career_page-profile-start-expertise-picto
        path
            fill color__$flashOrange
        
    .Career_page-profile-start-expertise-picto+.Career_page-profile-start-expertise-name,
    .Career_page-profile-expertise-picto+.Career_page-profile-expertise-name
        margin-top 10px

    .Career_page-profile-start-expertise-name,
    .Career_page-profile-expertise-name
        font__useTextLight 14
        color #B3B3B3
    
    .Career_page-profile-start-expertise-description,
    .Career_page-profile-expertise-skills-list
        position absolute
        top 50%
        left 0
        width 100%
        transform translateY(-50%)
        
        > span,
        > .Career_page-profile-expertise-skill
            display block
            padding-left 105px
            transform translateY(-10px)
            
            
            > strong
                font__useTextRegular()
                color color__$flashOrange
    
    .Career_page-profile-start-expertise-description,
    .Career_page-profile-expertise-skill
        font__useTextLight 15
        font__line-height 18
        color color__$text

    .Career_page-profile-expertise-skill
        text-align left
        position relative
        white-space nowrap

        &:before
            display block
            content ''
            position relative
            top 7px
            margin-right 8px
            float left
            shape__circle(4px, color__$text)
    
    .Career_page-profile-expertise-list
        .size-class-not-career-page-width-compact &
            layout__grid('.Career_page-profile-expertise', 16, 2, 2, 20px)
    
    .Career_page-profile-expertise+.Career_page-profile-expertise
        .size-class-career-page-width-compact &
            margin-top 20px
    
    .Career_page-profile-expertise-picto
        path
            fill color__$lightBlue

    .Career_page-profile-interventions,
    .Career_page-profile-creations
        padding-top 20px
        padding-bottom 30px
        float left
        border-top 1px solid color__$neutral50
    
    .Career_page-profile-interventions
        layout__gridBox(9)
        layout__gridTab(1)
    
    .Career_page-profile-creations
        layout__gridBox(18)
        //layout__gridTab(12)
</style>