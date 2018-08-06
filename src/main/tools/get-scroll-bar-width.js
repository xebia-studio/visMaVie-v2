'use strict';

import scrollBarWidth from 'scrollbar-width'

let scrollBarWidthValue = null;

module.exports = function getScrollBarWidth() {
	if(scrollBarWidthValue === null || scrollBarWidthValue <= 0){
		scrollBarWidthValue = scrollBarWidth();
	}

	return scrollBarWidthValue;
}