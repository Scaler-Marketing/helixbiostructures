import { createSVGGrid } from "./createSVGGrid.js";

// Link timelines to scroll position
function createScrollTrigger(triggerElement, start, end, delay, withScroll) {
  const squares = triggerElement.querySelectorAll('rect');

  gsap.set(squares, { opacity: 0 });
  const trigger = {
    trigger: triggerElement,
    scrub: true,
    start,
    fastScrollEnd: 500,
    preventOverlaps: "scroll-headings",
  };

  if (!withScroll) {
    trigger.onEnter = () => {
      gsap.to(squares, {
        opacity: 1,
        delay: delay,
        duration: 0.01,
        overwrite: true,
        stagger: {
          each: 0.01,
          from: "random",
        },
        ease: "bounce.out",
        onComplete: () => {
          gsap.set(triggerElement.parentNode, { maskImage: "none" });
        }
      });
    };

    gsap.timeline({ scrollTrigger: trigger });
  } else {
    trigger.end = end;
    gsap
      .timeline({
        scrollTrigger: trigger,
      })
      .to(squares, {
        opacity: 1,
        duration: 0.01,
        overwrite: true,
        stagger: {
          each: 0.01,
          from: "random",
        },
        ease: "none",
      });
  }
}

export function setStaggerHeading() {
  const blocks = document.querySelectorAll("[stagger-heading]");

  blocks.forEach((el) => {
    const maskEl = createSVGGrid(el, 10);
    el.classList.add('init');
    const startVal = el.dataset.startPos || "center bottom",
      endVal = el.dataset.endPos || "bottom center",
      delay = el.dataset.delay || 0,
      withScrollTrigger = el.dataset.withScroll || false;
    createScrollTrigger(maskEl, startVal, endVal, delay, withScrollTrigger);
  });
}
