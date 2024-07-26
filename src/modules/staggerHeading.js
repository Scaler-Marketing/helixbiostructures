import { createSVGGrid } from "./createSVGGrid";

// Link timelines to scroll position
function createScrollTrigger(triggerElement, start, end, withScroll) {
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
        stagger: {
          amount: 0.3,
          from: "random",
          ease: "power2.inOut"
        },
        ease: "power4.Out",
      });
    };

    gsap.timeline({ scrollTrigger: trigger });
  } else {
    trigger.end = end;
    gsap
      .timeline({
        scrollTrigger: trigger,
      })
      .to(words, {
        yPercent: 0,
        stagger: 0.02,
        ease: "none",
      });
  }
}

export function setStaggerHeading() {
  const blocks = document.querySelectorAll("[stagger-heading]");

  blocks.forEach((el) => {
    const maskEl = createSVGGrid(el, 10);
    // const wrapper = document.createElement("span");
    // wrapper.classList.add("line-wrapper");
    // line.parentNode.insertBefore(wrapper, line);
    // wrapper.appendChild(line);

    const startVal = el.dataset.startPos || "top top",
      endVal = el.dataset.endPos || "bottom center",
      withScrollTrigger = el.dataset.withScroll || false;
    // let tl = gsap.timeline({ paused: true });
    createScrollTrigger(maskEl, startVal, endVal, withScrollTrigger);
  });
}
