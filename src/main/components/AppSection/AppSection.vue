<template lang="jade">
    .AppSection
        .AppSection-usefull-width-box
            .AppSection-margin-box
                .AppSection-inner-wrapper
                    .AppSection-title-with-baseline
                        .AppSection-title(v-if="title") {{title}}
                        .AppSection-baseline(v-if="baseline") {{baseline}}
                    slot(name="section-content")
</template>

<script>
    import { mixin as fontLoader } from 'tools/font-loader';

    export default {
        name: 'AppSection',
        mixins: [fontLoader],
        props: {
            title: {
                type: String,
                required: false
            },
            baseline: {
                type: String,
                required: false
            }
        },
        created: function () {
            this.loadFont({
                'text': 'regular',
                'title': 'bold'
            });
        }
    };
</script>

<style lang="stylus" src="./AppSection.styl"></style>
