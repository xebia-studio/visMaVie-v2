<template lang="jade">
    .FAQ
        .FAQ-left-part
        .FAQ-themes
            .FAQ-theme(v-bind:class="{active: isThemeActive(theme)}" v-for="(questions, theme, index) in themes", :style="themeStyle[theme]", ref="theme", v-on:click="selectTheme(theme)")
                .FAQ-theme-title-number(v-if="!isWidthCompact", :is="svgComponent('BulletTransparentWhite' + (index + 1))")
                .FAQ-theme-title {{theme}}
                    div(:is="svgComponent(isThemeActive(theme) ? 'IconCircledArrowUp' : 'IconCircledArrowDown')")
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
                themeStyle: _.mapValues(this.jobs, () => undefined),
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
                let selectedThemeHeight = undefined;

                this.themeStyle[this.selectedThemeLabel] = {height: 'auto'};
                nextTick(() => {
                    if(this.$refs.theme) {
                        selectedThemeHeight = domHeight(this.$refs.theme[this.selectedThemeIndex])+'px';
                        this.themeStyle = _.mapValues(this.themes, () => {return {height: undefined};});
                    }
                    requestAnimationFrame(() => {
                        this.themeStyle[this.selectedThemeLabel] = {height: selectedThemeHeight};
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
                        animatedScrollTo(this.getScrollController().nodePosition(this.$refs.theme[0]) + (100*this.selectedThemeIndex));
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
    _themeTitleMobileHeight = 80
    _themeTitleBackgroundColor = color__$blue
    _themeColor = color__$uiImportantEnabledText
    _questionBackgroundColor = color__$sectionOdd
    _leftPartDesktopNumberOfColumns = VotreIntegration__$leftPartNumberOfColumns
    _leftPartDesktopPercentage = (_leftPartDesktopNumberOfColumns/layout__$gridSectionNumberOfColumns*100)
    _rightPartDesktopPercentage = 100 - _leftPartDesktopPercentage
    _questionHeight = 50

    .FAQ
        background-color color__$sectionEven

    .FAQ-left-part
        .size-class-width-compact &
            display none
        .size-class-not-width-compact &
            float left
            width (_leftPartDesktopPercentage)%

    .FAQ-themes
        .size-class-not-width-compact &
            float left
            width (_rightPartDesktopPercentage)%

    .FAQ-theme
        width 100%
        overflow hidden
        transition height 320ms ease__inOutQuad() 120ms
        margin 20px 0
        &.active
            border-radius 0 0 8px 8px
        &:not(.active)
            height (_themeTitleMobileHeight)px

    .FAQ-theme-title
        cursor pointer
        background-color _themeTitleBackgroundColor
        color _themeColor
        text-transform uppercase
        font__useTextRegular font__$textFontSize
        padding ((_themeTitleMobileHeight - font__$textFontSize)/2)px 10px
        .size-class-not-width-compact &
            position relative

    .FAQ-theme-title-number
        display none
        width (BulletPoints__$bigBulletSize)px
        height (BulletPoints__$bigBulletSize)px
        .size-class-not-width-compact &
            background-color _jobBackgroundColor
        .size-class-not-width-compact .FAQ-theme.active &
            position absolute
            left 30px
            & svg
                fill _themeTitleBackgroundColor

    .IconCircledArrowUp, .IconCircledArrowDown
        width 25px
        float right
        margin-top -5px

    .FAQ-theme-question
        background-color _questionBackgroundColor
        .size-class-width-compact &
            padding 0px 10px 30px 10px
        .size-class-not-width-compact &
            padding 15px 0 50px 0

    .FAQ-theme-question-title
        padding ((_questionHeight - font__$textFontSize)/2)px 0
        color color__$blue
        font__useTextBold font__$textFontSize

    .FAQ-theme-question-body
        color color__$text
        line-height (font__$textLineHeight)px
        .size-class-not-width-compact &
            margin-left 40px
            margin-bottom 1px solid red

    .FAQ-question-button
        margin 15px auto
        max-width 85px
        .size-class-not-width-compact &
            margin 20px 0 0 75px


</style>
