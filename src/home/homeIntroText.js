import { setLinesWrapper } from "../modules/setLinesWrapper";

// Link timelines to scroll position
function createHomeIntroText(triggerElement, words, isLast) {
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
        end: "40% top",
        markers: false,
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
          start: "60% top",
          end: "bottom top",
          markers: false,
          pin: false,
        },
      }
    );
  }
}

export function setHomeIntroText() {
  // Split all words on the brand core section
  const homeIntroText = new SplitType(".intro-text", {
    types: "lines",
    tagName: "span",
  });

  setLinesWrapper(homeIntroText.lines, () => {
    gsap.set(".intro-text .line", { yPercent: 100 });
  });

  const sections = document.querySelectorAll(".intro-sequence .sticky-wrapper");

  sections.forEach((section, i) => {
    const words = section.querySelectorAll(".line");
    const isLast = i === sections.length - 1;
    createHomeIntroText(section, words, isLast);
  });
}