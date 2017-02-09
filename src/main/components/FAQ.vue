<template lang="jade">
    .FAQ
        .FAQ-left-part
        .FAQ-themes
            .FAQ-theme(v-bind:class="{active: isThemeActive(theme)}" v-for="(questions, theme, index) in themes", :style="themeStyle[theme]", ref="theme", v-on:click="selectTheme(theme)")
                .FAQ-theme-title-number(v-if="!isWidthCompact", :is="svgComponent('BulletTransparentWhite' + (index + 1))")
                .FAQ-theme-title
                    .FAQ-theme-title-label(v-html="theme")
                    .FAQ-theme-title-picto(:is="svgComponent(isThemeActive(theme) ? 'IconCircledArrowUp' : 'IconCircledArrowDown')")
                .FAQ-theme-questions
                    .FAQ-theme-question(v-for="question in questions")
                        .FAQ-theme-question-title(v-html="question.title")
                        .FAQ-theme-question-body(v-html="question.answer")
            CTAButton.FAQ-question-button(:label="questionButtonLabel", :link="'mailto:recrutement@xebia.fr'", :newTab="false", :type="'primary'")
</template>

<script>
    import { nextTick } from 'vue';
    import _ from 'lodash';
    import { domHeight } from '@alexistessier/dom';

    import CTAButton from 'components/CTAButton';

    import { mixin as fontLoader } from 'tools/font-loader';
    import { mixin as svgComponent } from 'tools/svg-component';
    import { mixin as sizeClassHelper } from 'tools/size-class-helper';
    import { mixin as scrollController } from 'tools/scroll-controller';

    import animatedScrollTo from 'xebia-web-common/tools/animated-scroll-to';
    import centralEventBus from 'xebia-web-common/tools/central-event-bus';

    export default {
        name: 'FAQ',
        mixins: [fontLoader, svgComponent, sizeClassHelper, scrollController],
        props: {
            themes: {
                type: Object,
                required: true
            },
            questionButtonLabel: {
                type: String,
                required: true
            }
        },
        data: function () {
            return {
                isWidthCompact: this.getSizeClassHelper().isActive('width-compact'),
                themeStyle: _.mapValues(this.themes, () => undefined),
                selectedThemeLabel: _.keys(this.themes)[0]
            };
        },
        methods: {
            isThemeActive: function (themeLabel) {
                return _.isEqual(themeLabel, this.selectedThemeLabel);
            },
            selectTheme: function (themeLabel) {
                this.selectedThemeLabel = themeLabel;
            },
            updateLayoutOnResize: function () {
                const temporaryThemeStyle = {};
                _.keys(this.themes).forEach((themeLabel) => {
                    this.themeStyle[themeLabel] = {height: 'auto'};
                });
                nextTick(() => {
                    if(this.$refs.theme) {
                        _.keys(this.themes).forEach((themeLabel, index) => {
                            temporaryThemeStyle[themeLabel] = {height: domHeight(this.$refs.theme[index])+'px'};
                            this.themeStyle = _.mapValues(this.themes, () => {return {height: undefined};});
                        });
                    }
                    requestAnimationFrame(() => {
                        this.themeStyle = _.cloneDeep(temporaryThemeStyle);
                    });
                });
            }
        },
        computed: {
            selectedThemeIndex: function () {
                const selectedThemeIndex = -1;
                for(const themeLabel in this.themes) {
                    if(this.isThemeActive(themeLabel)) {
                        return _.indexOf(_.keys(this.themes), themeLabel);
                    }
                }
                return selectedThemeIndex;
            }
        },
        created: function () {
            this.loadFont({
                'text': ['light', 'regular', 'bold'],
                'title': ['light', 'bold']
            });
            this.getSizeClassHelper().on('resize', () => {
                this.isWidthCompact = this.getSizeClassHelper().isActive('width-compact');
            });
            const resize = () => {
                this.updateLayoutOnResize();
            };
            this.resizeListenerArguments = ['change', resize];
            this.getSizeClassHelper().on(...this.resizeListenerArguments);
        },
        mounted: function () {
            this.updateLayoutOnResize();
        },
        watch: {
            selectedThemeLabel: function(to, from) {
                if(!_.isEqual(to, from)) {
                    this.updateLayoutOnResize();
                }
                nextTick(() => {
                    requestAnimationFrame(() => {
                        centralEventBus.$emit('force-hide-parallaxed-layer', 'navigation-bar');
                        let heightToAdd = 0;
                        this.$refs.theme.slice(0, this.selectedThemeIndex).forEach((themeElement) => {
                            heightToAdd += domHeight(themeElement)+20;
                        });
                        animatedScrollTo(this.getScrollController().nodePosition(this.$refs.theme[0]) + heightToAdd);
                    });
                });
            }
        },
        beforeDestroy: function () {
            this.getSizeClassHelper().off(...this.resizeListenerArguments);
        },
        components: {
            CTAButton
        }
    };
</script>

<style lang="stylus">
    _themeTitleMobileHeight = 60
    _themeTitleBackgroundColor = color__$blue
    _themeColor = color__$uiImportantEnabledText
    _questionBackgroundColor = color__$sectionOdd
    _leftPartDesktopNumberOfColumns = VotreIntegration__$leftPartNumberOfColumns
    _leftPartDesktopPercentage = (_leftPartDesktopNumberOfColumns/layout__$gridSectionNumberOfColumns*100)
    _rightPartDesktopPercentage = 100 - _leftPartDesktopPercentage
    _questionHeight = 50

    .FAQ
        background-color color__$sectionEven
        clearfix()

    .FAQ-left-part
        .size-class-width-compact &
            display none
        .size-class-not-width-compact &
            background no-repeat 25% top/100px url('~assets/images/svg/picto-plant.svg')
            height 500px
            float left
            width (_leftPartDesktopPercentage)%

    .FAQ-themes
        .size-class-not-width-compact &
            float left
            width (_rightPartDesktopPercentage)%

    .FAQ-theme
        width 100%
        transition height 320ms ease__inOutQuad() 120ms
        margin-bottom 20px
        &.active
            border-radius 0 0 8px 8px
        .size-class-not-width-compact &
            position relative

    .FAQ-theme-title-number
        .size-class-not-width-compact &
            width (BulletPoints__$bigBulletSize)px
            height (BulletPoints__$bigBulletSize)px
            position absolute
            left -(BulletPoints__$bigBulletSize + 20)px
            top ((_themeTitleMobileHeight - BulletPoints__$bigBulletSize)/2)px
        .size-class-not-width-compact .FAQ-theme.active &
            & circle
                stroke _themeTitleBackgroundColor !important
            & path
                fill _themeTitleBackgroundColor !important

    .FAQ-theme-title
        padding ((_themeTitleMobileHeight - font__$textFontSize)/2)px 35px ((_themeTitleMobileHeight - font__$textFontSize)/2)px 10px
        cursor pointer
        background-color _themeTitleBackgroundColor
        position relative
        .size-class-not-width-compact &
            padding-left 20px

    .FAQ-theme-title-label
        font__useTextRegular font__$textFontSize
        padding-right 10px
        color _themeColor

    .FAQ-theme-title-picto
        width 25px
        position absolute
        right 10px
        top 'calc(%s - %s)' % (50% (25/2)px)
        .size-class-not-width-compact &
            right 20px

    .FAQ-theme-questions
        overflow hidden
        .FAQ-theme:not(.active) &
            height 0px

    .FAQ-theme-question
        background-color _questionBackgroundColor
        .size-class-width-compact &
            padding 0px 10px 30px 10px

    .FAQ-theme-question-title
        padding ((_questionHeight - font__$textFontSize)/2)px 0
        color color__$blue
        font__useTextBold font__$textFontSize
        .size-class-not-width-compact &
            padding 30px 0 30px 20px

    .FAQ-theme-question-body
        color color__$text
        line-height (font__$textLineHeight)px
        .size-class-not-width-compact &
            margin 0 80px
            padding-bottom 30px
        .size-class-not-width-compact .FAQ-theme-question:not(:last-child) > &
            border-bottom 2px solid color__$sectionEven

    .FAQ-question-button
        max-width 180px
        margin 40px auto 10px auto
        padding 15px 20px
        .size-class-not-width-compact &
            margin 20px 0 0 75px
            float right


</style>
