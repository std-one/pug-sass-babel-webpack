const $ = require('jquery');

import picturefill from 'picturefill';
import LazyLoad from 'vanilla-lazyload';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import slick from 'slick-carousel';

const hogehoge = (() => {

	// 変数宣言
	const pointSP = window.matchMedia('screen and (max-width: 767px)');

	// このJSのinit
	function init() {

		AOS.init({
			offset: 100,
			duration: 1200,
			once: true
		});

		lazyLoad();
		smoothScroll();
		menuTrigger();
	}

	// 関数 ------------------------------------
	function fixedBG() {
		scrollY = $(window).scrollTop();
		$('body').addClass('is-fixed').css('top', -scrollY);
	}

	function fixedBGReset() {
		$('body').removeClass('is-fixed').removeAttr('style');
		$('html, body').scrollTop(scrollY);
	}

	function lazyLoad() {
		const myLazyLoad = new LazyLoad({
			elements_selector: '.lazy',
			to_webp: true
		});
	}

	function smoothScroll() {
		$('a[href^="#"]').on('click.smoothScroll', (event) => {
			const speed = 1200;// ミリ秒
			const href = $(event.currentTarget).attr("href");
			const target = $(href == "#" || href == "" ? 'html' : href);
			const position = target.offset().top;
			$('html, body').animate({ scrollTop: position }, speed, 'swing');
			return false;
		});
	}

	function menuTrigger() {
		const $trigger = $('[aria-controls="nav-global"]');
		const $nav = $('.' + $trigger.attr('aria-controls'));

		$trigger.on('click', () => {
			const expanded = $trigger.attr('aria-expanded');

			if (expanded === 'false') {
				$trigger.attr('aria-expanded', true);
				$nav.attr('aria-hidden', false);
				fixedBG();
			} else {
				$trigger.attr('aria-expanded', false);
				$nav.attr('aria-hidden', true);
				fixedBGReset();
			}
		});

	  function checkBreakPoint(pointSP) {
	    if (!pointSP.matches) {
				$trigger.attr('aria-expanded', false);
				$nav.attr('aria-hidden', true);
				fixedBGReset();
	    }
	  }

	  pointSP.addListener(checkBreakPoint);
	  // checkBreakPoint(pointSP);
	}
	// -----------------------------------------

	return {
		init : init
	};

})();

// このタイミングで実行
$(() => {
	hogehoge.init();
});
