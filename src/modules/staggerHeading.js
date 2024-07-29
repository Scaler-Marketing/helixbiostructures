import { createSVGGrid } from "./createSVGGrid";

// Link timelines to scroll position
function createScrollTrigger(triggerElement, start, end, delay, withScroll) {
  const squares = triggerElement.querySelectorAll('rect');

  gsap.set(squares, { fill: "#000000" });
  const trigger = {
    trigger: triggerElement,
    scrub: true,
    start,
  };

  if (!withScroll) {
    trigger.onEnter = () => {
      gsap.to(squares, {
        fill: "#ffffff",
        delay: delay,
        duration: 0.01,
        stagger: {
          each: 0.01,
          from: "random",
        },
        ease: "bounce.out"
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
        fill: "#ffffff",
        duration: 0.01,
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
    const startVal = el.dataset.startPos || "top top",
      endVal = el.dataset.endPos || "bottom center",
      delay = el.dataset.delay || 0,
      withScrollTrigger = el.dataset.withScroll || false;
    createScrollTrigger(maskEl, startVal, endVal, delay, withScrollTrigger);
  });
}
