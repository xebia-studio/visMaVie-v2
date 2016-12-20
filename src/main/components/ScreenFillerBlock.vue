<template lang="jade">
	.ScreenFillerBlock(:style="{height: blockHeight + 'px'}")
		slot
</template>

<script>

import {
	isObject,
	isFunction,
	isNumber,
	isArray,
	includes
} from 'lodash'

import { mixin } from 'tools/size-class-helper'

const defaultPercentageOfScreenFilled = 100;

export default {
	mixins: [mixin],
	name: 'ScreenFillerBlock',
	props: {
		percentageOfScreenFilled: {
			type: [Number, Object],
			default: defaultPercentageOfScreenFilled
		}
	},
	data: function () {
		return {
			blockHeight: 0
		}
	},
	created: function () {
		const sizeClassHelper = this.getSizeClassHelper();

		const resize = (size) => {
			const screenHeight = size.height;

			const calc = percentage => parseInt(percentage*screenHeight*0.01);

			const percentage = this.percentageOfScreenFilled;

			this.blockHeight = (() => {
				if (isObject(percentage)) {
					const defaultPercentage = isNumber(percentage.default) ? percentage.default : defaultPercentageOfScreenFilled;
					for(let sizeClass in percentage){
						if(sizeClass != 'default'){
							if(sizeClassHelper.isActive(sizeClass)){
								return calc(percentage[sizeClass]);
							}
						}
					}
					return calc(defaultPercentage);
				}

				return calc(percentage);
			})()
		};

		sizeClassHelper.on('resize', resize);

		resize(sizeClassHelper.size);
	}
}
</script>

<style lang="stylus">
	.ScreenFillerBlock
		width 100%
</style>