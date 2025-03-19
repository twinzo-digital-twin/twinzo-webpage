"use strict";(()=>{var a=$(window).width()>991,p=(T,y)=>{window.dataLayer.some(_=>_.virtualPageTitle===y)||window.dataLayer.push({event:"virtualPageView",virtualPageURL:T,virtualPageTitle:y})},D=!1,P=gsap.timeline({defaults:{duration:.5},paused:!0,repeat:1,onComplete:function(){q()}}),q=()=>{$(".page-load").fadeOut("slow",()=>{$("html,body").removeClass("u-overflow-hidden"),a&&(lenis.start(),lenis.resize())})};P.to(".page-load_logo",{opacity:1,stagger:.2}).to(".page-load_t",{width:"100%"}).to(".page-load_logo",{opacity:1},"<").to(".page-load_brand",{opacity:0});$(document).ready(function(){sessionStorage.getItem("preloader")?q():($("html,body").addClass("u-overflow-hidden"),P.play(),sessionStorage.setItem("preloader","true"))});$(window).on("load",function(){D=!0});$(document).ready(function(){function T(){let t=$(".hero_step");a=$(window).width()>991,a&&$(".nav_logo").addClass("white");function l(){let e=$("[js-scrollflip-element='zone']"),r=$("[js-scrollflip-element='target']").first();gsap.registerPlugin(ScrollTrigger,Flip);let o;o&&(o.kill(),gsap.set(r,{clearProps:"all"})),o=gsap.timeline({scrollTrigger:{trigger:$(".hero_step").eq(2),start:"top center",end:"bottom top",scrub:!0}}),e.each(function(i){let h=e.eq(i+1);if(h.length){let w=h.offset().top+h.innerHeight()/2,x=$(this).offset().top+$(this).innerHeight()/2,H=w-x;o.add(Flip.fit(r[0],h[0],{duration:H,ease:"power2.inOut"}))}})}let c=()=>{let e=gsap.timeline({scrollTrigger:{trigger:t.eq(0),start:a?"top top-8px":"75% top",end:"center top",invalidateOnRefresh:!0,scrub:a?1:!1,onEnter:()=>{$(".nav").addClass("dark")},onLeaveBack:()=>{$(".nav").removeClass("dark")}}});a&&e.fromTo($(".container.cc-nav"),{maxWidth:"100%"},{maxWidth:"113.2rem"})},u=()=>{let e=$(".hp-hero_visual"),r=$(".hp-hero_phone"),o=$(".hp-hero_phone-video"),i=gsap.timeline({scrollTrigger:{trigger:t.eq(0),start:"top top",end:"bottom top",scrub:1,onEnterBack:()=>{a&&$(".nav").css("opacity","0"),setTimeout(()=>{$(".nav").removeClass("fixed"),$(".nav_logo").addClass("white")},200),setTimeout(()=>{$(".nav").removeClass("pushed"),$(".nav").css("opacity","1")},300)},onLeave:()=>{a&&$(".nav").css("opacity","0"),b(),$(".nav").addClass("pushed"),setTimeout(()=>{$(".nav").addClass("fixed"),$(".nav_logo").removeClass("white"),$(".nav").css("opacity","1")},300)}}});a?i.to(e,{width:"200%"}):(i.to(e,{height:"200%",paddingTop:"0%"}),i.fromTo(e,{borderTopLeftRadius:"1.6rem",borderTopRightRadius:"1.6rem"},{borderTopLeftRadius:"0rem",borderTopRightRadius:"0rem"},"<")),i.to(r,{rotate:-90,y:"-4rem"},"<"),i.to(o,{rotate:90},"<")},m=()=>{let e=$("[data-hero-hide]");gsap.timeline({scrollTrigger:{trigger:t.eq(0),start:"100 top",toggleActions:"play none none reverse"}}).to(e,{opacity:0},"<")},g=$("[data-step-text]"),v=e=>{gsap.to(g,{yPercent:50,opacity:0,duration:.3,onComplete:()=>{g.text(g.attr(e)),gsap.to(g,{yPercent:0,opacity:1})}})},n=e=>{let r=$(".hp-steps_phone-video"),o=gsap.timeline();return o.to(r,{opacity:0,duration:.2}),o.to(r.eq(e),{opacity:1,duration:.2}),o},d=()=>{let e=$(".cc-hp-steps"),r=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"top top",toggleActions:"play none none reverse"}});gsap.set(e,{opacity:0,pointerEvents:"none"}),a&&lenis.resize(),r.to(e,{pointerEvents:"auto",opacity:1,duration:0,delay:.2})},C=()=>{let e=$(".cc-hp-steps");gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"top top",toggleActions:"play none none reverse",onEnter:()=>{p("/see","see")}}}).fromTo([$(".hp-steps_head"),$(".hp-steps_content")],{opacity:0},{opacity:1,duration:.5,delay:.3},"<")},k=()=>{let e=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"top top",end:"33% top",toggleActions:"play none none reverse",toggleClass:{targets:$(".hp-steps_head-item").eq(0),className:"active"},onEnterBack:()=>{v("data-paragraph-01"),n(0)}}})},S=()=>{let e=$(".hp-steps_visual-inner"),r=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"33% top",end:"66% top",toggleActions:"play none none reverse",toggleClass:{targets:$(".hp-steps_head-item").eq(1),className:"active"},onEnter:()=>{p("/know","know"),v("data-paragraph-02"),n(1)},onEnterBack:()=>{v("data-paragraph-02"),n(1)}}})},R=()=>{let e=$(".hp-steps_visual-inner"),r=gsap.timeline({scrollTrigger:{trigger:t.eq(1),start:"66% top",end:"bottom center",toggleActions:"play none none none",onLeaveBack:()=>{$(".hp-steps_head-item").eq(2).removeClass("active"),$(".section.cc-hp-steps").removeClass("cc-fullscreen"),$(".nav").addClass("pushed")},onEnter:()=>{$(".hp-steps_head-item").eq(2).addClass("active"),$(".section.cc-hp-steps").addClass("cc-fullscreen"),$(".nav").removeClass("pushed"),v("data-paragraph-03"),n(2),p("/manage","manage"),$(document).ready(function(){var o=$("video").filter(function(){return $(this).parent().is("[data-exclude]")}),i=0;o.each(function(){$(this).on("canplaythrough",function(){i++,i===o.length&&o.each(function(){this.play()})}),this.load()})})},onLeave:()=>{a&&l()}}})},B=()=>{gsap.timeline({scrollTrigger:{trigger:t.eq(2),start:"top top",end:"bottom top",scrub:1}}).to($("[data-steps-ui]"),{opacity:0},"<")},z=()=>{let e=gsap.timeline({scrollTrigger:{trigger:$(".section.cc-hp-devices"),start:"top center",toggleActions:"play none none reverse"}});e.to($(".hp-devices_desktop"),{opacity:1}),a||e.to($(".hp-devices_phone"),{opacity:1})},V=()=>{let e=$("[data-devices-content]");gsap.timeline({scrollTrigger:{trigger:e,start:a?"top center":"center bottom",toggleActions:"play none none reverse",onEnter:()=>{p("/anytime","anytime")}}}).fromTo($("[data-devices-ui]"),{opacity:0},{opacity:1,stagger:.2});let o=0;function i(){let h=["Anytime","Anywhere"];if(o<h.length){let w=$("[data-devices-ui] h2");w.text(h[o]),gsap.timeline({scrollTrigger:{trigger:e,start:a?"top center":"center bottom",toggleActions:"play pause resume pause"},onComplete:()=>{o=(o+1)%h.length,i()}}).fromTo(w,{y:"50%",opacity:0},{y:"0%",opacity:1,duration:2,ease:"expo.out"})}}i()},W=()=>{let e=gsap.timeline({scrollTrigger:{trigger:$(".hp-types_wall"),start:"top top",toggleActions:"play none none reverse",onEnter:()=>{$(".nav").removeClass("dark")},onLeaveBack:()=>{$(".nav").addClass("dark")}}})},s=gsap.timeline();s.add(c),s.add(u),s.add(m),s.add(d),s.add(C),s.add(k),s.add(S),s.add(R),s.add(B),s.add(z),s.add(V),s.add(W)}T();function y(){let t=$(".hp-types_wall"),l=t.find("h2"),c=l.attr("data-headline-text").split(","),u=$(".hp-types_visual .hp-types_phone-video"),m=[["/yourfactory","yourfactory"],["/warehouse","/warehouse"]],g=n=>{let d=gsap.timeline();return d.to(l,{yPercent:50,opacity:0,duration:.3,onComplete:()=>{if(m[n]){let[C,k]=m[n];p(C,k)}}}),d.to(u,{opacity:0,duration:.3},"<"),d.to(l,{text:c[n],duration:0}),d.to(l,{yPercent:0,opacity:1}),d.to(u[n],{opacity:1},"<"),d},v=gsap.timeline({scrollTrigger:{trigger:t,start:"top top",end:"bottom bottom",scrub:1}});for(let n=1;n<c.length;n++)v.add(g(n));ScrollTrigger.create({trigger:t,start:"top top",end:"bottom bottom"})}function _(){gsap.timeline({scrollTrigger:{trigger:$("[data-types-pocket]"),start:"center bottom",end:"bottom bottom",scrub:1}}).fromTo([$(".hp-types_visual-overlay"),$("[data-types-pocket] h2")],{opacity:0,yPercent:50},{opacity:1,yPercent:0,stagger:.3})}y(),_(),$(".hp-types_wall").each(function(){let t=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top 80%",onEnter:()=>{p("/yourfactory","yourfactory")}}})}),$("#hp-cases").each(function(){let t=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top 80%",onEnter:()=>{p("/usecases","usecases")}}})}),$("#hp-testimonials").each(function(){let t=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top 80%",onEnter:()=>{p("/testimonials","testimonials")}}})}),$("#hp-michal").each(function(){let t=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top 80%",onEnter:()=>{p("/meetmichal","meetmichal")}}})}),$("#get-in-countrol-cta").each(function(){let t=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top 80%",onEnter:()=>{p("/getincontrol","getincontrol")}}})});let I=new Swiper(".hp-testimonials_slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossFade:!0},autoHeight:!0,loop:!0,navigation:{nextEl:".swiper-arrow.next",prevEl:".swiper-arrow.prev"}});function b(){var t=$(".hp-hero_phone").outerWidth(),l=$(".hp-hero_phone").height();$(".hp-steps_visual").css({width:l,height:t})}b(),$(window).resize(b);function A(t,l){let c;return function(){let u=this,m=arguments,g=function(){c=null,t.apply(u,m)};clearTimeout(c),c=setTimeout(g,l)}}var L=$(window).width();$(window).on("resize",A(function(){var t=$(window).width();t<=991?t!==L&&location.reload():location.reload()},300));let f=$(".nav"),E=$(".u-bg-black").add(".footer");f.length&&E.length&&E.each(function(){ScrollTrigger.create({trigger:$(this),start:a?"top 100px":"top 70px",end:a?"bottom 100px":"bottom 70px",onEnter:()=>f.addClass("dark"),onEnterBack:()=>f.addClass("dark"),onLeave:()=>f.removeClass("dark"),onLeaveBack:()=>f.removeClass("dark")})})});})();
