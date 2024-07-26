import { setLinesWrapper } from "../modules/setLinesWrapper";

// Link timelines to scroll position
function createHomeIntroText(triggerElement, words, isLast) {
  if (!isLast) {
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
          end: "30% top",
          markers: true,
          pin: false,
        },
      }
    );
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
          start: "80% bottom",
          end: "bottom bottom",
          markers: true,
          pin: false,
        },
      }
    );
  } else {
    const lines = triggerElement.querySelectorAll('.intro-text');
    const tl = gsap.timeline({paused: true});
    lines.forEach((line, i) => {
      if (i === lines.length - 1) {
        gsap.set(line.querySelectorAll('.line'), { yPercent: 0 });
        tl
          .fromTo(line, {
            height: 0,
          },
          {
            height: 'auto',
            duration: 1,
            delay: 2,
            ease: 'none'
          });
      } else {
        tl.fromTo(line.querySelectorAll(".line"), {
          yPercent: 100,
        }, {
          yPercent: 0,
          duration: 1,
          ease: "none"
        });
      }
    });

    tl.fromTo(triggerElement.querySelector('.button'), {
      yPercent: 105,
    }, {
      yPercent: 0,
      duration: 1
    });

    gsap.fromTo(
      tl,
      {
        progress: 0,
      },
      {
        progress: 1,
        scrollTrigger: {
          trigger: triggerElement,
          scrub: true,
          start: "top top",
          end: "30% top",
          markers: true,
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
