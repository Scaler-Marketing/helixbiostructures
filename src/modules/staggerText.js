import { setLinesWrapper } from "./setLinesWrapper";

// Link timelines to scroll position
function createScrollTrigger(triggerElement, elements, start, end, withScroll) {
  const trigger = {
    trigger: triggerElement,
    scrub: true,
    start,
  };

  if (!withScroll) {
    trigger.onEnter = () => {
      gsap.to(elements, {
        yPercent: 0,
        stagger: 0.02,
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

export function setStaggerText() {
  // Split all words on the brand core section
  const staggerTextEls = new SplitType("[stagger-text]", {
    types: "lines, words",
    tagName: "span",
  });

  setLinesWrapper(staggerTextEls.lines, () => {
    gsap.set("[stagger-text] .word", { yPercent: 100 });
  });

  const textBlocks = document.querySelectorAll("[stagger-text]");

  textBlocks.forEach((el) => {
    const words = el.querySelectorAll(".word"),
      startVal = el.dataset.startPos || "top top",
      endVal = el.dataset.endPos || "bottom center",
      withScrollTrigger = el.dataset.withScroll || false;
    // let tl = gsap.timeline({ paused: true });
    createScrollTrigger(el, words, startVal, endVal, withScrollTrigger);
  });
}
