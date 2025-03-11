const $ = require('jquery');

// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hogehoge = (() => {

	// 変数宣言
	const pointSP = window.matchMedia('(max-width: 767px)');

	// このJSのinit
	function init() {

		smoothScroll();
		menuTrigger();

		// telLink();

		// visualFunction();
		// carousel();
		// modal();

		// tab();

		// accordion();

		scrollAnimation();
		scrollDisplay();
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

	function scrollDisplay() {
		gsap.to('.p-visual', {
			scrollTrigger: {
				trigger: '.p-visual',
				start: 'bottom top',
				endTrigger: 'html',
				end: 'bottom top',
				toggleClass: {targets: '.l-header__contact', className: 'is-active'},
			}
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

		pointSP.addEventListener('change', checkBreakPoint);
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

		const swiper = new Swiper('.js-carousel', {
			autoplay: {
				delay: 5000,
			},
			centeredSlides: true,
			lazy: true,
			loop: true,
			slidesPerView: 'auto',
			spaceBetween: 30,
		});
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
		$trigger.off('click.smoothScroll').on('click', (event) => {
			const $self = $(event.currentTarget);
			const expanded = $self.attr('aria-expanded');
			const $target = $('#' + $self.attr('aria-controls'));
			const $other = $target.find('[aria-controls*="panel"]');

			if (expanded === 'false') {
				$('[aria-controls*="'+ $self.attr('aria-controls').replace(/[^a-z]/gi, '') +'"]').attr('aria-expanded', false);
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
