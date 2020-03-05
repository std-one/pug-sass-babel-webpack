const $ = require('jquery');

import picturefill from 'picturefill';
import lazysizes from 'lazysizes';
import 'lazysizes/plugins/aspectratio/ls.aspectratio';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import slick from 'slick-carousel';

const hogehoge = (() => {

	// 変数宣言
	const pointSP = window.matchMedia('screen and (max-width: 767px)');
	let scrollY;

	// このJSのinit
	function init() {

		AOS.init({
			offset: 100,
			duration: 1200,
			once: true
		});

		smoothScroll();
		menuTrigger();

		// telLink();

		// visualFunction();
		// carousel();
		// modal();

		// tab();

		// accordion();
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

	function telLink() {
		const $tel = $('.js-tel');

		$tel.each((index, element) => {
			const $self = $(element);
			const str = $self.text();

			$self.attr('href', 'tel:' + str.replace(/-/g, ''));
		});
	}

	function visualFunction() {
		const $visual = $('.visual-main');
		const $slide = $visual.find('.visual-main__slide').not('.slick-initialized');

		$slide.slick({
			autoplay: true,
			autoplaySpeed: 8000,
			arrows: false,
			fade: true,
			pauseOnHover: false,
			speed: 3000
		});

		const $item = $visual.find('.slick-slide');
		$item.eq(0).addClass('-animation');

		$slide.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			$item.eq(nextSlide).addClass('-animation');

			setTimeout(function() {
				$item.eq(currentSlide).removeClass('-animation');
			}, 3000);
		});
	}

	function carousel() {
		const $carousel = $('.js-carousel');
		if($carousel.length) {
			$carousel.slick({
				autoplay: true,
				autoplaySpeed: 0,
				arrows: false,
				cssEase: 'linear',
				speed: 10000,
				variableWidth: true
			});
		}
	}

	function modal() {
		const $trigger = $('[aria-controls*="modal"]');
		$trigger.off('click.smoothScroll').on('click', (event) => {
			const $self = $(event.currentTarget);
			const expanded = $self.attr('aria-expanded');
			const $target = $('#' + $self.attr('aria-controls'));
			const $other = $target.find('[aria-controls*="modal"]');

			if (expanded === 'false') {
				$self.attr('aria-expanded', true).addClass('is-active');
				$other.attr('aria-expanded', true);
				$target.attr('aria-hidden', false).addClass('is-active');

				fixedBG();
			} else {
				$trigger.attr('aria-expanded', false).removeClass('is-active');
				$target.attr('aria-hidden', true).removeClass('is-active');

				fixedBGReset();
			}

			return false;
		});
	}

	function tab() {
		const $trigger = $('[aria-controls*="panel"]');
		$trigger.on('click', (event) => {
			const $self = $(event.currentTarget);
			const expanded = $self.attr('aria-expanded');
			const $target = $('#' + $self.attr('aria-controls'));
			const $other = $target.find('[aria-controls*="panel"]');

			if (expanded === 'false') {
				$trigger.attr('aria-expanded', false);
				$trigger.filter('[aria-controls="'+ $self.attr('aria-controls') +'"]').attr('aria-expanded', true);
				$target.attr('aria-hidden', false).siblings('[id]').attr('aria-hidden', true);
			}

			return false;
		});
	}

	function accordion() {
		const $trigger = $('[aria-controls*="accordion"]');
		$trigger.stop().on('click', (event) => {
			const $self = $(event.currentTarget);
			const expanded = $self.attr('aria-expanded');
			const $target = $('#' + $self.attr('aria-controls'));

			if (expanded === 'false') {
				$self.attr('aria-expanded', true);
				$target.attr('aria-hidden', false).slideDown();
			} else {
				$self.attr('aria-expanded', false);
				$target.attr('aria-hidden', true).slideUp();
			}
		});
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
