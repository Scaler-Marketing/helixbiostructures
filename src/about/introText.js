import { setLinesWrapper } from "../modules/setLinesWrapper";

// Link timelines to scroll position
function createIntroText(triggerElement, index, amount) {
  const isFirst = index === 0;
  const isLast = index === amount - 1;

  // Split all words on the brand core section
  const aboutIntroText = new SplitType(triggerElement.querySelectorAll(".intro-text"), {
    types: isLast ? "words" : "lines",
    tagName: "span",
  });

  setLinesWrapper(isLast ? aboutIntroText.words : aboutIntroText.lines, () => {
    if (isLast) {
      gsap.set(".intro-text .word", { yPercent: 100 });
    } else {
      gsap.set(".intro-text .line", { yPercent: 100 });
    }
  });

  const words = isLast ? aboutIntroText.words : aboutIntroText.lines;

    gsap.fromTo(
      words,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: triggerElement,
          scrub: true,
          start: "top top",
          end: "20% top",
          // markers: true,
          pin: false,
        },
      }
    );

  if (!isLast) {
    gsap.fromTo(
      words,
      {
        yPercent: 0,
      },
      {
        yPercent: -100,
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: {
          trigger: triggerElement,
          scrub: true,
          start: "90% bottom",
          end: "bottom bottom",
          // markers: true,
          pin: false,
        },
      }
    );
  }
}

export function setAboutIntroText() {
  const sections = document.querySelectorAll(".intro-sequence .sticky-wrapper");

  // document
  //   .querySelector(".section.home-hero .bg-canvas-el")
  //   .classList.add("init");

  sections.forEach((section, i) => {
    createIntroText(section, i, sections.length);
  });
}
