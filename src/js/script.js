const $ = require('jquery');

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reiji = (() => {

	// 変数宣言
	const pointPC = window.matchMedia('screen and (max-width: 1128px)');
	const pointSP = window.matchMedia('screen and (max-width: 767px)');

	// このJSのinit
	function init() {

		// smoothScroll();
		menuTrigger();

		carousel();

		scrollAnimation();
	}

	// 関数 ------------------------------------
	function fixedBG() {
		$('body').addClass('is-fixed');
	}

	function fixedBGReset() {
		$('body').removeClass('is-fixed');
	}

	function scrollAnimation() {
		gsap.utils.toArray('[data-scroll]').forEach((scroll, i) => {
			ScrollTrigger.create({
				trigger: scroll,
				start: 'top 90%',
				// markers: true,
				// toggleClass: 'is-active',
				onEnter: () => scroll.classList.add('is-active')
			});
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
		const $trigger = $('[aria-controls="l-nav-global"]');
		const $nav = $('.' + $trigger.attr('aria-controls'));
		const $anchor = $nav.find('a[href*="#"]');

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

		function checkBreakPoint(mq) {
			if (!mq.matches) {
				$trigger.attr('aria-expanded', false);
				$nav.attr('aria-hidden', true);
				fixedBGReset();
			}
		}

		pointPC.addListener(checkBreakPoint);
		// checkBreakPoint(pointPC);

		$anchor.off('click').on('click', () => {
			fixedBGReset();

			$trigger.attr('aria-expanded', false);
			$nav.attr('aria-hidden', true);
		});
	}

	function carousel() {
		const swiper = new Swiper('.js-carousel', {
			allowTouchMove: false,
			autoplay: {
				delay: 0,
			},
			centeredSlides: true,
			// lazy: true,
			loop: true,
			slidesPerView: 'auto',
			speed: 24000,
		});
	}
	// -----------------------------------------

	return {
		init : init
	};

})();

// このタイミングで実行
$(() => {
	reiji.init();
});
