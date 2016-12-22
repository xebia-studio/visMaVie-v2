<template lang="jade">
    .StatCard
        .StatCard-picto-wrapper
            .StatCard-picto(:is='picto')
        .StatCard-stat-wrapper
            .StatCard-stat {{stat}}
            .StatCard-text {{text}}

</template>

<script>
    export default {
        name: 'StatCard',
        props: {
            picto: {
                required: true
            },
            stat: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="stylus">
    _pictoColor = color__$orange
    _statColor = color__$blue
    _textColor = color__$blue

    _statFontSize = fontsize__$sectionTitle
    _textFontSize = fontsize__$mainFontSize

    .StatCard
        width 80px
        height 100px
        background-color white

    .StatCard-picto-wrapper
        height (100*2/3) %

    .StatCard-picto
        margin-left auto
        margin-right auto
        width 60px
        height 100%
        color _pictoColor

    .StatCard-stat-wrapper
        height (100*1/3) %

    .Statcard-stat
        color _statColor
        font-size _statFontSize

    .StatCard-text
        color _textColor
        font-size _textFontSize

</style>
