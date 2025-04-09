"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/about.js
  var horizontalRow = $('[horizontal-scroll="row"]');
  var horizontalItem = $('[horizontal-scroll="item"]');
  var horizontalSection = $('[horizontal-scroll="section"]');
  var moveDistance;
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: horizontalSection,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      scrub: 1
    }
  });
  tl.to(horizontalRow, {
    x: () => -moveDistance,
    duration: 1
  });
  function calculateScroll() {
    let scrollResistance = 1;
    let moveAmount = horizontalItem.length;
    let minHeight = scrollResistance * horizontalItem.outerWidth() * horizontalItem.length;
    horizontalSection.css("height", "200vh");
    moveDistance = horizontalRow.outerWidth() - $(window).width();
    horizontalSection.css("min-height", minHeight + "px");
  }
  calculateScroll();
  window.onresize = function() {
    calculateScroll();
  };
  $(document).ready(function() {
    let horizontalTl;
    let horizontalRow2 = $('[horizontal-scroll="row"]');
    let horizontalItem2 = $('[horizontal-scroll="item"]');
    let horizontalSection2 = $('[horizontal-scroll="section"]');
    function isMobile() {
      return window.innerWidth <= 991;
    }
    function setupHorizontalScroll() {
      if (isMobile()) {
        if (horizontalTl) {
          console.log("kill");
          horizontalTl.kill();
          ScrollTrigger.getById("horizontalScroll")?.kill();
          gsap.set(horizontalRow2, {
            clearProps: "all"
          });
          gsap.set(horizontalSection2, {
            height: "auto",
            minHeight: "none"
          });
        }
      } else {
        let calculateScroll3 = function() {
          let scrollResistance = 1;
          let minHeight = scrollResistance * horizontalItem2.outerWidth() * horizontalItem2.length;
          horizontalSection2.css("height", "200vh");
          moveDistance2 = horizontalRow2.outerWidth() - $(window).width();
          console.log(moveDistance2);
          horizontalSection2.css("min-height", minHeight + "px");
        };
        var calculateScroll2 = calculateScroll3;
        let moveDistance2;
        horizontalTl = gsap.timeline({
          scrollTrigger: {
            id: "horizontalScroll",
            // Add an ID to the ScrollTrigger
            trigger: horizontalSection2,
            start: "top top",
            end: "bottom bottom",
            invalidateOnRefresh: true,
            scrub: 1
          }
        });
        horizontalTl.to(horizontalRow2, {
          x: () => -moveDistance2,
          duration: 1
        });
        calculateScroll3();
      }
    }
    setupHorizontalScroll();
    $(window).resize(setupHorizontalScroll);
  });
})();
//# sourceMappingURL=about.js.map
