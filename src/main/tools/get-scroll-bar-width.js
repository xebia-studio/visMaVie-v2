'use strict';

import scrollBarWidth from 'scrollbar-width'

let scrollBarWidthValue = null;

module.exports = function getScrollBarWidth() {
	if(scrollBarWidthValue === null){
		scrollBarWidthValue = scrollBarWidth();
	}

	return scrollBarWidthValue;
}