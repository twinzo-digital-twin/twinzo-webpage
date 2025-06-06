let isDesktop = $(window).width() > 991;

// Simplified function to track virtual pageview only if a specific virtualPageTitle is not already fired
const trackVirtualPageview = (virtualURL, virtualPageTitle) => {
  // Check if the 'virtualPageTitle' exists in dataLayer with the specific value
  if (!window.dataLayer.some((event) => event.virtualPageTitle === virtualPageTitle)) {
    window.dataLayer.push({
      event: 'virtualPageView',
      virtualPageURL: virtualURL,
      virtualPageTitle: virtualPageTitle,
    });
  }
};

// Add this NEW code after trackVirtualPageview function
const NavManager = {
  currentState: {
    isDark: false,
    isFixed: false,
    isPushed: false,
    logoWhite: true,
  },

  updateNav(newState) {
    const $nav = $('.nav');
    const $logo = $('.nav_logo');

    if (newState.isDark !== this.currentState.isDark) {
      $nav.toggleClass('dark', newState.isDark);
    }

    if (newState.isFixed !== this.currentState.isFixed) {
      $nav.toggleClass('fixed', newState.isFixed);
    }

    if (newState.isPushed !== this.currentState.isPushed) {
      $nav.toggleClass('pushed', newState.isPushed);
    }

    if (newState.logoWhite !== this.currentState.logoWhite) {
      $logo.toggleClass('white', newState.logoWhite);
    }

    this.currentState = { ...newState };
  },
};

// #region Prealoder
let isWindowLoaded = false;
let preloader = gsap.timeline({
  paused: true,
  onComplete: function () {
    hidePreloader();
  },
});

const hidePreloader = () => {
  if (!isWindowLoaded) {
    $(window).on('load', function () {
      $('.page-load').fadeOut('slow', () => {
        $('html,body').removeClass('u-overflow-hidden');
        if (isDesktop) {
          lenis.start();
          lenis.resize();
        }
      });
    });
  } else {
    $('.page-load').fadeOut('slow', () => {
      $('html,body').removeClass('u-overflow-hidden');
      if (isDesktop) {
        lenis.start();
        lenis.resize();
      }
    });
  }
};

// Setup the animation sequence
preloader
  .to('.page-load_logo', { opacity: 1, duration: 0.2 })
  .to('.page-load_t', { width: '100%', duration: 0.2 }, '<')
  .to('.page-load_brand', { opacity: 0, duration: 0.2 }, '<');

$(document).ready(function () {
  $('html,body').addClass('u-overflow-hidden');

  // Start the preloader animation
  preloader.play();

  // If the page is already loaded, complete the preloader immediately
  if (document.readyState === 'complete') {
    preloader.progress(1);
  }
});

// Wait for full page load before hiding preloader
$(window).on('load', function () {
  isWindowLoaded = true;
  preloader.progress(1);
});
// #endregion

$(document).ready(function () {
  // #region HeroAnimation
  function HeroAnimation() {
    let heroSteps = $('.hero_step');
    isDesktop = $(window).width() > 991;

    if (isDesktop) {
      $('.nav_logo').addClass('white');
    }

    // Functions
    function flipPhone() {
      // SETUP ELEMENTS
      let zoneEl = $("[js-scrollflip-element='zone']"),
        targetEl = $("[js-scrollflip-element='target']").first();

      gsap.registerPlugin(ScrollTrigger, Flip);

      // SETUP TIMELINE
      let tl;
      if (tl) {
        tl.kill();
        gsap.set(targetEl, { clearProps: 'all' });
      }
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: $('.hero_step').eq(2),
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        },
      });
      zoneEl.each(function (index) {
        let nextZoneEl = zoneEl.eq(index + 1);
        if (nextZoneEl.length) {
          let nextZoneDistance = nextZoneEl.offset().top + nextZoneEl.innerHeight() / 2;
          let thisZoneDistance = $(this).offset().top + $(this).innerHeight() / 2;
          let zoneDifference = nextZoneDistance - thisZoneDistance;
          tl.add(
            Flip.fit(targetEl[0], nextZoneEl[0], {
              duration: zoneDifference,
              ease: 'power2.inOut',
            })
          );
        }
      });
    }

    // 00
    const step00 = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(0),
          start: isDesktop ? 'top top-8px' : '75% top',
          end: 'center top',
          invalidateOnRefresh: true,
          scrub: isDesktop ? 1 : false,
          onEnter: () => {
            NavManager.updateNav({
              ...NavManager.currentState,
              isDark: true,
            });
          },
          onLeaveBack: () => {
            NavManager.updateNav({
              ...NavManager.currentState,
              isDark: false,
            });
          },
        },
      });
      if (isDesktop) {
        tl.fromTo($('.container.cc-nav'), { maxWidth: '100%' }, { maxWidth: '113.2rem' });
      }
    };

    // 01
    const step01 = () => {
      let heroVisual = $('.hp-hero_visual');
      let heroPhone = $('.hp-hero_phone');
      let heroVideo = $('.hp-hero_phone-video');
      let headerStats = $('.hp-devices_stats');
      let scrollButton = $('.lp-scroll-btn');

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(0),
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onEnterBack: () => {
            NavManager.updateNav({
              isDark: false,
              isFixed: false,
              isPushed: false,
              logoWhite: true,
            });
          },
          onLeave: () => {
            adjustImages();
            NavManager.updateNav({
              isDark: true,
              isFixed: true,
              isPushed: true,
              logoWhite: false,
            });
          },
        },
      });

      if (isDesktop) {
        tl.to(heroVisual, { width: '200%' });
      } else {
        tl.to(heroVisual, { height: '200%', paddingTop: '0%' });
        tl.fromTo(
          heroVisual,
          { borderTopLeftRadius: '1.6rem', borderTopRightRadius: '1.6rem' },
          { borderTopLeftRadius: '0rem', borderTopRightRadius: '0rem' },
          '<'
        );
      }
      tl.to(heroPhone, { rotate: -90, y: '-4rem' }, '<');
      tl.to(heroVideo, { rotate: 90 }, '<');
      tl.to(headerStats, { opacity: 1, duration: 0.5 }, '<');
      tl.to(scrollButton, { opacity: 1, duration: 0.5 }, '<');
      tl.to($('.hp-steps_head'), { opacity: 1, duration: 0.5 }, '<');
    };

    const step01_01 = () => {
      let contentToHide = $('[data-hero-hide]');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(0),
          start: '100 top',
          toggleActions: 'play none none reverse',
        },
      });
      tl.to(contentToHide, { opacity: 0 }, '<');
    };

    // 02
    const dataStepText = $('[data-step-text]');
    const dataStepAnimation = (attr) => {
      gsap.to(dataStepText, {
        yPercent: 50,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          dataStepText.text(dataStepText.attr(attr));
          gsap.to(dataStepText, { yPercent: 0, opacity: 1 });
        },
      });
    };
    const revealStepVideo = (index) => {
      let stepsVideo = $('.hp-steps_phone-video');
      let tl = gsap.timeline();
      tl.to(stepsVideo, { opacity: 0, duration: 0.2 });
      tl.to(stepsVideo.eq(index), { opacity: 1, duration: 0.2 });
      return tl;
    };
    const step02 = () => {
      let section = $('.cc-hp-steps');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(1),
          start: 'top top',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.set(section, { opacity: 0, pointerEvents: 'none' });
      if (isDesktop) {
        lenis.resize();
      }

      tl.to(section, { pointerEvents: 'auto', opacity: 1, duration: 0, delay: 0.2 });
    };
    const step02_00 = () => {
      let section = $('.cc-hp-steps');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(1),
          start: 'top top',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            trackVirtualPageview('/see', 'see');
          },
        },
      });

      tl.fromTo(
        [$('.hp-steps_head'), $('.hp-steps_content')],
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.3 },
        '<'
      );
    };
    const step02_01 = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(1),
          start: 'top top',
          end: '33% top',
          toggleActions: 'play none none reverse',
          toggleClass: { targets: $('.hp-steps_head-item').eq(0), className: 'active' },
          onEnterBack: () => {
            dataStepAnimation('data-paragraph-01');
            revealStepVideo(0);
          },
        },
      });
    };
    const step02_02 = () => {
      let heroPhone = $('.hp-steps_visual-inner');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(1),
          start: '33% top',
          end: '66% top',
          toggleActions: 'play none none reverse',
          toggleClass: { targets: $('.hp-steps_head-item').eq(1), className: 'active' },
          onEnter: () => {
            trackVirtualPageview('/know', 'know');
            dataStepAnimation('data-paragraph-02');
            revealStepVideo(1);
          },
          onEnterBack: () => {
            dataStepAnimation('data-paragraph-02');
            revealStepVideo(1);
          },
        },
      });
    };
    const step02_03 = () => {
      let heroPhone = $('.hp-steps_visual-inner');
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(1),
          start: '66% top',
          end: 'bottom center',
          toggleActions: 'play none none none',
          onLeaveBack: () => {
            $('.hp-steps_head-item').eq(2).removeClass('active');
            $('.section.cc-hp-steps').removeClass('cc-fullscreen');
            $('.nav').addClass('pushed');
          },
          onEnter: () => {
            $('.hp-steps_head-item').eq(2).addClass('active');
            $('.section.cc-hp-steps').addClass('cc-fullscreen');
            $('.nav').removeClass('pushed');
            dataStepAnimation('data-paragraph-03');
            revealStepVideo(2);
            trackVirtualPageview('/manage', 'manage');

            // Videos Step 3 In syn
            $(document).ready(function () {
              // Find all video elements whose parent has the [data-exclude] attribute
              var videos = $('video').filter(function () {
                return $(this).parent().is('[data-exclude]');
              });

              var loadedCount = 0;

              // Attach an event listener for the canplaythrough event to each video
              videos.each(function () {
                $(this).on('canplaythrough', function () {
                  loadedCount++;
                  if (loadedCount === videos.length) {
                    // All videos are loaded, play them in sync
                    videos.each(function () {
                      this.play();
                    });
                  }
                });

                // Load the video
                this.load();
              });
            });
          },
          onLeave: () => {
            if (isDesktop) {
              flipPhone();
            }
          },
        },
      });
    };

    // 03
    const step03_00 = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSteps.eq(2),
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      tl.to($('[data-steps-ui]'), { opacity: 0 }, '<');
    };
    const step03 = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $('.section.cc-hp-devices'),
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to($('.hp-devices_desktop'), { opacity: 1 });
      if (!isDesktop) {
        tl.to($('.hp-devices_phone'), { opacity: 1 });
      }
    };

    // 04
    const step04 = () => {
      let stepContent = $('[data-devices-content]');

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepContent,
          start: isDesktop ? 'top center' : 'center bottom',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            trackVirtualPageview('/anytime', 'anytime');
          },
        },
      });

      tl.fromTo($('[data-devices-ui]'), { opacity: 0 }, { opacity: 1, stagger: 0.2 });

      // Headline Loop
      let currentIndex = 0;
      function animateText() {
        let words = ['Anytime', 'Anywhere'];

        if (currentIndex < words.length) {
          const textElement = $('[data-devices-ui] h2');
          textElement.text(words[currentIndex]);

          let tl8 = gsap.timeline({
            scrollTrigger: {
              trigger: stepContent,
              start: isDesktop ? 'top center' : 'center bottom',
              toggleActions: 'play pause resume pause',
            },
            onComplete: () => {
              // Increment to next word or loop to start
              currentIndex = (currentIndex + 1) % words.length;
              animateText(); // Restart animation with new word
            },
          });

          // Initial animation from 100% bottom to 0%
          tl8.fromTo(
            textElement,
            {
              y: '50%',
              opacity: 0,
            },
            {
              y: '0%',
              opacity: 1,
              duration: 2,
              ease: 'expo.out',
            }
          );
        }
      }
      animateText();
    };

    // Dark Menu
    const darkMenu = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $('.hp-types_wall'),
          start: 'top top',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            $('.nav').removeClass('dark');
          },
          onLeaveBack: () => {
            $('.nav').addClass('dark');
          },
        },
      });
    };

    // main
    let main = gsap.timeline();

    main.add(step00);
    main.add(step01);
    main.add(step01_01);
    main.add(step02);
    main.add(step02_00);
    main.add(step02_01);
    main.add(step02_02);
    main.add(step02_03);
    main.add(step03_00);
    main.add(step03);
    main.add(step04);
    main.add(darkMenu);
  }

  // Init
  HeroAnimation();

  // #endregion

  // #region Types Animation
  function typePocket() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $('[data-types-pocket]'),
        start: 'center bottom',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    tl.fromTo(
      [$('.hp-types_visual-overlay'), $('[data-types-pocket] h2')],
      { opacity: 0, yPercent: 50 },
      { opacity: 1, yPercent: 0, stagger: 0.3 }
    );
  }

  // Init
  typePocket();

  // Extra calls for the GTM events
  $('.hp-types_wall').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%',
        onEnter: () => {
          trackVirtualPageview('/yourfactory', 'yourfactory');
        },
      },
    });
  });

  $('#hp-cases').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%',
        onEnter: () => {
          trackVirtualPageview('/usecases', 'usecases');
        },
      },
    });
  });

  $('#hp-testimonials').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%',
        onEnter: () => {
          trackVirtualPageview('/testimonials', 'testimonials');
        },
      },
    });
  });

  $('#hp-michal').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%',
        onEnter: () => {
          trackVirtualPageview('/meetmichal', 'meetmichal');
        },
      },
    });
  });

  $('#get-in-countrol-cta').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%',
        onEnter: () => {
          trackVirtualPageview('/getincontrol', 'getincontrol');
        },
      },
    });
  });

  // #endregion

  // #region Swiper
  const swiper = new Swiper('.hp-testimonials_slider', {
    // Optional parameters
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoHeight: true,
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-arrow.next',
      prevEl: '.swiper-arrow.prev',
    },
  });
  // #endregion

  // #region Helpers

  // ___ Match the size of hero and following image
  function adjustImages() {
    var img1Width = $('.hp-hero_phone').outerWidth();
    var img1Height = $('.hp-hero_phone').height();

    // Set the width of the second image to the height of the first image and vice versa
    $('.hp-steps_visual').css({
      width: img1Height,
      height: img1Width,
    });
  }

  adjustImages();

  $(window).resize(adjustImages);

  // ___ Refresh the page on resize
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  var initialWidth = $(window).width();

  $(window).on(
    'resize',
    debounce(function () {
      // Get the current width
      var currentWidth = $(window).width();

      // If we are under 991 we want to reload the page only if the width changes (not height)
      if (currentWidth <= 991) {
        if (currentWidth !== initialWidth) {
          location.reload();
        }
      } else {
        // If we are above 991, just reload the page regardless of width or height changes
        location.reload();
      }
    }, 300)
  );

  // ___ Dark Sections on Homepage
  const $nav = $('.nav');
  const $target = $('.u-bg-black').add('.footer');

  if ($nav.length && $target.length) {
    $target.each(function () {
      ScrollTrigger.create({
        trigger: $(this),
        start: isDesktop ? 'top 100px' : 'top 70px',
        end: isDesktop ? 'bottom 100px' : 'bottom 70px',
        onEnter: () => $nav.addClass('dark'),
        onEnterBack: () => $nav.addClass('dark'),
        onLeave: () => $nav.removeClass('dark'),
        onLeaveBack: () => $nav.removeClass('dark'),
      });
    });
  }

  // Ensure .dark is never stuck on nav at the top of the page
  $(window).on('scroll', function () {
    if (window.scrollY === 0) {
      $('.nav').removeClass('dark');
    }
  });

  // #endregion
});
