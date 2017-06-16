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
        .Career_page-profile-useful-width(ref="profileScrollView")
            .Career_page-profile-margin-constraint(:class="'contains--'+currentCareer.new_works.length+'-expertises'")
                .Career_page-profile-mobile-first-column
                    .Career_page-profile-contact-card
                        .Career_page-profile-contact-card-inner-wrapper
                            .Career_page-profile-contact-card-photo(:style="photoStyle")
                            .Career_page-profile-contact-name(v-html="currentCareer.name")
                            .Career_page-profile-contact-sep
                            .Career_page-profile-contact-job {{currentCareer.job}}
                            .Career_page-profile-contact-button
                                .Career_page-profile-contact-button-inner-wrapper
                                    CallToActionButton(:important="true", :link="contactLink", :label="contactLabel")
                    .Career_page-profile-starts-at-xebia-outer-wrapper
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
                    ul.Career_page-profile-expertise-list(:class="'contains--'+currentCareer.new_works.length+'-expertises'")
                        li.Career_page-profile-expertise(v-for="expertise in currentCareer.new_works")
                            .Career_page-profile-expertise-picto-wrapper
                                .Career_page-profile-expertise-picto(:is="getSvgComponentCareer(expertise.svg_picto)")
                                .Career_page-profile-expertise-name {{expertise.name}}
                                ul.Career_page-profile-expertise-skills-list
                                    li.Career_page-profile-expertise-skill(v-for="skill in expertise.skills")
                                        span {{skill}}
                .Career_page-profile-interventions(v-if="currentCareer.interventions")
                    .Career_page-profile-title Ses dernières interventions
                    ul.Career_page-profile-interventions-list
                        li.Career_page-profile-intervention(v-for="(link, label) in currentCareer.interventions") 
                            span(v-if="link === true") {{label}}
                            a(v-else, :href="link", target="_blank") {{label}}
                .Career_page-profile-creations
                    .Career_page-profile-title Ses créations chez Xebia
                    ul.Career_page-profile-creations-list
                        li.Career_page-profile-creation(v-for="tag in creations", :class="{'is--active': currentCareer && currentCareer.creations && currentCareer.creations.includes(tag)}") {{tag}}
    .Career_page-profile-passions(v-if="currentCareer && currentCareer.passions && currentCareer.passions.length")
        .Career_page-profile-passions-useful-width
            .Career_page-profile-passions-margin-constraint
                .Career_page-profile-title Ses passions du moment
                ul.Career_page-profile-passions-list
                    li.Career_page-profile-passion(v-for="passion in currentCareer.passions")
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
            creations: settings.creations,
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

                classList[career.url] = this.currentPage === `${career.url}` ? 'is--active' : 'is--unactive';
            }

            return classList;
        }
    },
    watch: {
        currentPage(){
            this.menuScrollToCurrent();

            const scrollView = this.$refs.profileScrollView;
            if (scrollView) {
                scrollView.scrollTo({
                    behavior: 'smooth',
                    left: 0,
                    top: 0
                });
            }
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
    _mobileFirstColumnWidth = 298px
    _mobileLastColumnsWidth = (760px / 2)
    
    _mobileNewWorkBaseWidth = 545/2
    _mobileNewWorkGutterWidth = 75/2
    _mobileNewWorkColumnWidth = ( ( _mobileNewWorkBaseWidth - _mobileNewWorkGutterWidth ) / 2 )
    _mobileExpertiseListMarginHorizontal = 30px

    _mobileNewWorkWidth(col)
        return ( (_mobileNewWorkColumnWidth * col) + (_mobileNewWorkGutterWidth * (col - 1) ) )

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
    
    menuLinkPaddingTop = 18

    .Career_page-menu-nav
        .size-class-not-width-compact &
            layout__centeredGridBox(28)
        .size-class-width-compact &
            height (Career_page__$mobileMenuSliderHeight + menuLinkPaddingTop) px
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
            padding-top menuLinkPaddingTop px
            height Career_page__$mobileMenuSliderHeight px
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
        .size-class-not-width-compact &
            margin-top 20px
            border-top 1px solid color__$neutral50
    
    _mobileProfileHeight = 525

    .Career_page-profile
        border-bottom 1px solid color__$neutral50
        .size-class-not-width-compact &
            clearfix()

        .size-class-width-compact &
            overflow hidden
            height _mobileProfileHeight px
            
    .Career_page-profile-useful-width
        .size-class-not-width-compact &
            layout__outerBox()
        
        .size-class-width-compact &
            overflow-y hidden
            overflow-x scroll
            -webkit-overflow-scrolling: touch;

    .Career_page-profile-margin-constraint
        position relative
        
        .size-class-not-width-compact &
            layout__innerBox()
            min-height 450px
        
        .size-class-width-compact &
            clearfix()
            height _mobileProfileHeight px
            
            fullWidth(col)
                return (_mobileFirstColumnWidth + _mobileLastColumnsWidth + _mobileNewWorkWidth(col) + (_mobileExpertiseListMarginHorizontal*2) )

            &.contains--1-expertises,
            &.contains--2-expertises,
            &.contains--3-expertises,
            &.contains--4-expertises
                width fullWidth(2)
            
            &.contains--5-expertises,
            &.contains--6-expertises
                width fullWidth(3)
                
            &.contains--7-expertises,
            &.contains--8-expertises
                width fullWidth(4)
            
            &.contains--9-expertises,
            &.contains--10-expertises
                width fullWidth(5)
        
    .Career_page-profile-mobile-first-column
        .size-class-width-compact &
            float left
            height 100%
            position relative
            
            &:after
                content ''
                display block
                width 1px
                height 100%
                position absolute
                right 0
                top 0
                background-color color__$neutral50
    
    .Career_page-profile-contact-card    
        float left
        position relative
        
        .size-class-width-compact &
            width _mobileFirstColumnWidth
            padding-bottom 60px
            border-bottom 1px solid color__$neutral50
            
        .size-class-not-width-compact &
            layout__gridBox(9)
            layout__gridTab(1)

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
            layout__centeredGridBox(22)
    
    .Career_page-profile-contact-card-photo
        height 160px
        border-bottom 1px solid color__$neutral50
        background-position center bottom
        background-repeat no-repeat
        background-size auto 100%
        background-size contain
        
        .size-class-width-compact &
            height 150px
            position relative
            &:after
                display block
                content ''
                position absolute
                width 298px
                height 1px
                background-color color__$neutral50
                top 100%
                left -40px
    
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
        
        .size-class-width-compact &
            margin-top 30px
    
    .Career_page-profile-contact-button        
        .size-class-not-width-compact &
            layout__centeredGridBox(5, gridNumberOfColumns: 7)
            padding-bottom 30px
        
        .size-class-width-compact &
            position absolute
            left 0
            bottom 0
            width 100%
            transform translateY(50%)
    
    .Career_page-profile-contact-button-inner-wrapper
        .size-class-width-compact &
            layout__centeredGridBox(5, gridNumberOfColumns: 7)
    
    .Career_page-profile-starts-at-xebia,
    .Career_page-profile-new-works
        .size-class-not-width-compact &
            padding-bottom 30px
            float right
            position relative
            
            &:after
                display block
                content ''
                width 1px
                height 100%
                position absolute
                top 0
                left -1px
                background-color color__$neutral50
    
    .Career_page-profile-starts-at-xebia
        padding-top 35px
        
        .size-class-width-compact &
            padding-top 60px
            > .Career_page-profile-title
                text-align center

        .size-class-not-width-compact &
            layout__gridBox(20)

            > .Career_page-profile-title
                margin-left (2 / 20 * 100%)
                margin-right (1 / 20 * 100%)
                
    .Career_page-profile-starts-at-xebia-outer-wrapper
        .size-class-width-compact &
            width 298px

    .Career_page-profile-starts-at-xebia > .Career_page-profile-title,
    .Career_page-profile-start-expertise
        .size-class-width-compact &
            layout__centeredGridBox(22)

    .Career_page-profile-start-expertise,
    .Career_page-profile-expertise-list
        .size-class-not-width-compact & 
            margin-left (2 / 20 * 100%)
            margin-right (2 / 20 * 100%)
        
    .Career_page-profile-new-works
        .size-class-width-compact &
            float left
            position relative
            height 100%
            
            > .Career_page-profile-title
                margin-top 25px
                margin-left 30px
                margin-right 30px
            
            &:after
                display block
                content ''
                width 1px
                height 100%
                position absolute
                top 0
                right -1px
                background-color color__$neutral50
        
        .size-class-not-width-compact &
            padding-top 20px
            layout__gridBox(20)
            position relative
            
            > .Career_page-profile-title
                margin-left (2 / 20 * 100%)
                margin-right (1 / 20 * 100%)
            
            &:before
                content ''
                display block
                height 1px
                background-color color__$neutral50
                width 200%
                position absolute
                top 0
                left 0

    .Career_page-profile-title
        font__useTitleRegular 24
        color color__$blue
        
    .Career_page-profile-title+.Career_page-profile-start-expertise
    .Career_page-profile-title+.Career_page-profile-expertise-list
        margin-top 20px
        
    .Career_page-profile-title+.Career_page-profile-expertise-list
        .size-class-width-compact &
            margin-top 70px
    
    .Career_page-profile-start-expertise,
    .Career_page-profile-expertise
        clearfix()
        position relative

    .Career_page-profile-start-expertise-picto-wrapper,
    .Career_page-profile-expertise-picto-wrapper
        margin-left 10px
        text-align center
        width 70px
    
    .Career_page-profile-expertise-picto-wrapper
        .size-class-width-compact &
            margin-left auto
            margin-right auto
        
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
    
    .Career_page-profile-expertise-name+.Career_page-profile-expertise-skills-list
        .size-class-width-compact &
            margin-top 15px
            position relative
            
            &:before
                display block
                content ''
                position absolute
                top -6px
                height 1px
                width 70px
                background-color color__$neutral50
                left 50%
                transform translateX(-50%)
    
    .Career_page-profile-start-expertise-description
        position absolute
        top 50%
        left 0
        width 100%
        transform translateY(-50%)
        
        > span
            display block
            padding-left 105px
            
            .size-class-not-width-compact &
                transform translateY(-10px)
            
            > strong
                font__useTextRegular()
                color color__$flashOrange
    
    .Career_page-profile-expertise-skills-list
        .size-class-not-width-compact &
            position absolute
            top 50%
            left 0
            width 100%
            transform translateY(-50%)

        .size-class-width-compact &
            transform translateX(-50%)
            margin-left 50%
        
    .Career_page-profile-expertise-skill
        display block
        white-space nowrap
            
        .size-class-not-width-compact &
            padding-left 105px
            transform translateY(-10px)
            display block
        
        .size-class-width-compact &
            text-align center
            
            &:before
                display none
            
            > span
                position relative
                
                &:before
                    display block
                    content ''
                    position absolute
                    top 8px
                    shape__circle(4px, color__$text)
                    left -10px
    
    .Career_page-profile-start-expertise-description,
    .Career_page-profile-expertise-skill,
    .Career_page-profile-intervention
        font__useTextLight 15
        font__line-height 20
        color color__$text
        
        a
            color color__$text
            text-decoration underline
            &:hover, &:focus
                color color__$flashOrange

    .Career_page-profile-expertise-skill,
    .Career_page-profile-intervention
        text-align left
        position relative

        &:before
            display block
            content ''
            position relative
            top 9px
            margin-right 8px
            float left
            shape__circle(4px, color__$text)
    
    .Career_page-profile-expertise-list
        .size-class-not-width-compact &
            layout__grid('.Career_page-profile-expertise', 16, 2, 2, 20px)
        .size-class-width-compact &
            margin-left _mobileExpertiseListMarginHorizontal
            margin-right _mobileExpertiseListMarginHorizontal
        
    .size-class-width-compact
        baseWidth = _mobileNewWorkBaseWidth
        gutterWidth = _mobileNewWorkGutterWidth
        colWidth = _mobileNewWorkColumnWidth
        
        styleExpertiseList(col)
            fullWidth = _mobileNewWorkWidth(col)
            layout__grid('.Career_page-profile-expertise', fullWidth, col, gutterWidth, 35px)
            width fullWidth px

            .Career_page-profile-expertise-skills-list
                width colWidth px
        
        .Career_page-profile-expertise-list
            &.contains--1-expertises,
            &.contains--2-expertises,
            &.contains--3-expertises,
            &.contains--4-expertises
                styleExpertiseList(2)
            
            &.contains--5-expertises,
            &.contains--6-expertises
                styleExpertiseList(3)
            
            &.contains--7-expertises,
            &.contains--8-expertises
                styleExpertiseList(4)
            
            &.contains--9-expertises,
            &.contains--10-expertises
                styleExpertiseList(5)
    
    .Career_page-profile-expertise-picto
        path
            fill color__$lightBlue

    .Career_page-profile-interventions
        .size-class-not-width-compact &
            clear both

    .Career_page-profile-interventions,
    .Career_page-profile-creations
        padding-top 20px
        padding-bottom 30px
        
        .size-class-not-width-compact &
            float left
            border-top 1px solid color__$neutral50
        
        .size-class-width-compact &
            width _mobileLastColumnsWidth
            padding-top 25px
            float left
    
            > .Career_page-profile-title,
            > .Career_page-profile-interventions-list,
            > .Career_page-profile-creations-list
                margin-left 25px
                margin-right 25px

    .Career_page-profile-interventions
        .size-class-not-width-compact &
            layout__gridBox(10)
            position relative
            
            > .Career_page-profile-title
                margin-left (1 / 10 * 100)%
                margin-right (1 / 10 * 100)%
            
            &:before, &:after
                display block
                content ''
                background-color color__$neutral50
                position absolute
            
            &:before
                top -1px
                right 100%
                width 200%
                height 1px
            
            &:after
                width 1px
                height 100%
                right 0
                top 0
        
        .size-class-width-compact &
            bottom 0

    .Career_page-profile-title+.Career_page-profile-interventions-list,
    .Career_page-profile-title+.Career_page-profile-creations-list
        margin-top 30px

    .Career_page-profile-interventions-list
        .size-class-not-width-compact &
            margin-left (1 / 10 * 100)%
            margin-right (1 / 10 * 100)%
    
    .Career_page-profile-creations
        border-top 1px solid color__$neutral50
        
        .size-class-not-width-compact &
            position relative
            layout__gridBox(20)
            
            > .Career_page-profile-title
                margin-left (2 / 20 * 100%)
                margin-right (1 / 20 * 100%)
            
            &:before, &:after
                display block
                content ''
                background-color color__$neutral50
                position absolute
            
            &:before
                top -1px
                left 100%
                width 200%
                height 1px
            
            &:after
                width 1px
                height 100%
                left -1px
                top 0
    
    .Career_page-profile-creations-list
        .size-class-not-width-compact &
            margin-left (2 / 20 * 100%)
            margin-right (1 / 20 * 100%)
    
    .Career_page-profile-creation
        display inline-block
        background-color color__$neutral50
        color white
        font__useTextLight 14
        margin-right 10px
        margin-bottom 15px
        padding 4px 12px
        font__line-height 16
        border-radius font__pxToRem(16)
        
        &.is--active
            background-color color__$lightBlue
    
    .Career_page-profile-passions
        background-color color__$sectionEven
        padding-top 25px
        padding-bottom 20px

    .Career_page-profile-passions-useful-width
        layout__outerBox()
    
    .Career_page-profile-passions-margin-constraint
        layout__innerBox()
        
    .Career_page-profile-passions-margin-constraint > .Career_page-profile-title,
    .Career_page-profile-passions-list
        layout__centeredGridBox(28)
</style>