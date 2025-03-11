// const $ = require('jquery');

// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hogehoge = (() => {

	// 変数宣言
	const pointSP = window.matchMedia('(max-width: 767px)');
	const body = document.querySelector('body');

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
	function toggleFixedBG(add) {
		add ? body.classList.add('is-fixed') : body.classList.remove('is-fixed');
	}

	// slideUp
	function slideUp(el, duration = 400) {
		el.style.height = el.offsetHeight + "px";
		el.offsetHeight; // Force reflow
		el.style.transitionProperty = "height, margin, padding";
		el.style.transitionDuration = duration + "ms";
		el.style.transitionTimingFunction = "ease";
		el.style.overflow = "hidden";
		el.style.height = 0;
		el.style.paddingTop = 0;
		el.style.paddingBottom = 0;
		el.style.marginTop = 0;
		el.style.marginBottom = 0;

		setTimeout(function() {
			el.style.display = "none";
			el.style.removeProperty("height");
			el.style.removeProperty("padding-top");
			el.style.removeProperty("padding-bottom");
			el.style.removeProperty("margin-top");
			el.style.removeProperty("margin-bottom");
			el.style.removeProperty("overflow");
			el.style.removeProperty("transition-duration");
			el.style.removeProperty("transition-property");
			el.style.removeProperty("transition-timing-function");
		}, duration);
	}

	// slideDown
	function slideDown(el, duration = 400) {
		el.style.removeProperty("display");
		let display = window.getComputedStyle(el).display;
		if (display === "none") {
			display = "block";
		}
		el.style.display = display;

		let height = el.offsetHeight;
		el.style.overflow = "hidden";
		el.style.height = 0;
		el.style.paddingTop = 0;
		el.style.paddingBottom = 0;
		el.style.marginTop = 0;
		el.style.marginBottom = 0;
		el.offsetHeight; // Force reflow

		el.style.transitionProperty = "height, margin, padding";
		el.style.transitionDuration = duration + "ms";
		el.style.transitionTimingFunction = "ease";
		el.style.height = height + "px";
		el.style.removeProperty("padding-top");
		el.style.removeProperty("padding-bottom");
		el.style.removeProperty("margin-top");
		el.style.removeProperty("margin-bottom");

		setTimeout(function() {
			el.style.removeProperty("height");
			el.style.removeProperty("overflow");
			el.style.removeProperty("transition-duration");
			el.style.removeProperty("transition-property");
			el.style.removeProperty("transition-timing-function");
		}, duration);
	}

	// slideToggle
	function slideToggle(el, duration = 400) {
		if (window.getComputedStyle(el).display === "none") {
			slideDown(el, duration);
		} else {
			slideUp(el, duration);
		}
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
		const links = document.querySelectorAll('a[href^="#"]');
		links.forEach(link => {
			link.addEventListener('click', function(event) {
				event.preventDefault();
				const href = this.getAttribute('href');
				const target = document.querySelector(href === "#" || href === "" ? 'html' : href);
				if (target) {
					const targetPosition = target.offsetTop;
					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth'
					});
				}
			});
		});
	}

	function menuTrigger() {
		const triggers = document.querySelectorAll('[aria-controls="l-nav-global"]');
		const nav = document.querySelector('.l-nav-global');
		const anchors = nav.querySelectorAll('a[href*="#"]');

		function handleTriggerClick(trigger) {
			const expanded = trigger.getAttribute('aria-expanded') === 'true';

			triggers.forEach(trigger => {
				trigger.setAttribute('aria-expanded', !expanded);
			});

			nav.setAttribute('aria-hidden', expanded);
			toggleFixedBG(!expanded);
		}

		triggers.forEach(trigger => {
			trigger.addEventListener('click', () => handleTriggerClick(trigger));
		});

		function checkBreakPoint(mq) {
			if (!mq.matches) {
				triggers.forEach(trigger => {
					trigger.setAttribute('aria-expanded', 'false');
				});
				nav.setAttribute('aria-hidden', 'true');
				toggleFixedBG(false);
			}
		}

		pointSP.addEventListener('change', checkBreakPoint);

		// anchors.forEach(anchor => {
		// 	anchor.addEventListener('click', (event) => {
		// 		triggers.forEach(trigger => {
		// 			trigger.setAttribute('aria-expanded', 'false');
		// 		});
		// 		nav.setAttribute('aria-hidden', 'true');
		// 		toggleFixedBG(false);

		// 		const href = anchor.getAttribute('href');
		// 		const targetId = href.split('#')[1];
		// 		const targetElement = document.getElementById(targetId) || document.documentElement;
		// 		const position = targetElement.offsetTop;
		// 		window.scrollTo({
		// 			top: position,
		// 			behavior: 'smooth'
		// 		});
		// 		event.preventDefault();
		// 	});
		// });
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
		const carousel = document.querySelector('.js-carousel');
		if (carousel) {
			const Swiper = new Swiper(carousel, {
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
	}

	function modal() {
		const triggers = document.querySelectorAll('[aria-controls*="modal"]');

		triggers.forEach(trigger => {
			trigger.addEventListener('click', (event) => {
				event.preventDefault();
				const targetId = trigger.getAttribute('aria-controls');
				const target = document.getElementById(targetId);
				const expanded = trigger.getAttribute('aria-expanded') === 'true';

				// 他のモーダルをすべて閉じる
				document.querySelectorAll('[id*="modal"]').forEach(modal => {
					if (modal.id !== targetId) {
						closeModal(modal);
					}
				});

				if (expanded) {
					closeModal(target);
				} else {
					openModal(target);
				}

				toggleFixedBG(!expanded);
			});
		});

		function closeModal(modal) {
			modal.setAttribute('aria-hidden', 'true');
			modal.classList.remove('is-active');
			document.querySelectorAll(`[aria-controls="${modal.id}"]`).forEach(trigger => {
				trigger.setAttribute('aria-expanded', 'false');
				trigger.classList.remove('is-active');
			});
		}

		function openModal(modal) {
			modal.setAttribute('aria-hidden', 'false');
			modal.classList.add('is-active');
			document.querySelectorAll(`[aria-controls="${modal.id}"]`).forEach(trigger => {
				trigger.setAttribute('aria-expanded', 'true');
				trigger.classList.add('is-active');
			});
		}
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
		const triggers = document.querySelectorAll('[aria-controls*="accordion"]');

		triggers.forEach(trigger => {
			trigger.addEventListener('click', (event) => {
				const self = event.currentTarget;
				const expanded = self.getAttribute('aria-expanded') === 'true';
				const target = document.getElementById(self.getAttribute('aria-controls'));

				if (!expanded) {
					self.setAttribute('aria-expanded', 'true');
					target.setAttribute('aria-hidden', 'false');
					slideDown(target);
				} else {
					self.setAttribute('aria-expanded', 'false');
					target.setAttribute('aria-hidden', 'true');
					slideUp(target);
				}
			});
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
