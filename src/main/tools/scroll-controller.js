import assert from 'assert'
import {isFunction, isObject} from 'lodash'

import eventEmitterFactory from 'event-emitter';

import {domWidth, domHeight} from '@alexistessier/dom'

class ScrollController {
	constructor({
		frame = window,
		document = window.document
	}={}) {

		assert(isObject(frame), 'ScrollController injection frame must be an object');
		assert(isFunction(frame.requestAnimationFrame), 'ScrollController injection frame.requestAnimationFrame must be a function');

		this.eventEmitter = eventEmitterFactory({});

		this.frame = frame;
		this.document = document;
		this.availableEventList = ['scroll'];
		
		this.scroll = {
			change : false,
			toUp : false,
			toDown : false,
			position : this.scrollTop-1,
			timeSinceLastChangeToDown : Infinity,
			timeSinceLastChangeToUp : Infinity,
			timeSinceLastChange : Infinity,
			frame: {
				change: false,
				width: this.frameWidth,
				height: this.frameHeight
			}
		};

		this.previousLoopDate = Date.now();
		this.startLoop();
	}

	/*--------------------------*/
	/*-- Component interfaces --*/
	/*--------------------------*/

	on(){
		return this.eventEmitter.on(...arguments);
	}

	off(){
		return this.eventEmitter.off(...arguments);
	}

	/*--------------------------*/
	/*--------------------------*/
	/*--------------------------*/

	startLoop(){
		this.frame.requestAnimationFrame(()=>{
			let currentDate = Date.now();
			this.updateFrame({
				delta: currentDate - this.previousLoopDate
			});
			this.previousLoopDate = currentDate;
			this.startLoop();
		});
	}

	updateFrame(time){
		let newScrollPosition = this.scrollTop;
		let scroll = this.scroll;
		let newFrameWidth = this.frameWidth;
		let newFrameHeight = this.frameHeight;
		let scrollFrame = scroll.frame;

		scroll.toDown = (newScrollPosition > scroll.position);
		scroll.toUp = (newScrollPosition < scroll.position);
		scroll.change = (this.scroll.toUp || scroll.toDown);

		scroll.change ? scroll.timeSinceLastChange = 0 : scroll.timeSinceLastChange += time.delta;
		scroll.toUp ? scroll.timeSinceLastChangeToUp = 0 : scroll.timeSinceLastChangeToUp += time.delta;
		scroll.toDown ? scroll.timeSinceLastChangeToDown = 0 : scroll.timeSinceLastChangeToDown += time.delta;

		scroll.position = newScrollPosition;

		scrollFrame.change = (newFrameWidth !== scrollFrame.width || newFrameHeight !== scrollFrame.height);

		scrollFrame.width = newFrameWidth;
		scrollFrame.height = newFrameHeight;

		if (scroll.change || scrollFrame.change) {
			this.eventEmitter.emit('scroll', scroll);
		}
	}

	scrollTo(position) {
		this.frame.scroll(0, position);
	}

	scrollToNode(node, modifier = 0){
		this.scrollTo(this.nodePosition(node) + modifier);
	}

	nodePosition(node){
		let rect = node.getBoundingClientRect();
		return rect.top + this.scrollTop;
	}

	get frameWidth(){
		return domWidth(this.frame);
	}

	get frameHeight(){
		return domHeight(this.frame);
	}

	get scrollTop(){
		return this.frame.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
	}
}

let scrollController = null;

const mixin = {
	methods: {
		getScrollController: function () {
			return scrollController || (function () {
				scrollController = new ScrollController();

				return scrollController;
			})();
		}
	}
}

export { ScrollController, mixin };