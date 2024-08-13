import { createSVGGrid } from "../modules/createSVGGrid";
import { setLinesWrapper } from "../modules/setLinesWrapper";

export function initServicesSectionScroll() {
  const wrapper = document.querySelector(".section.list-scroll"),
    sections = wrapper.querySelectorAll(".sticky-wrapper"),
    anchors = wrapper.querySelectorAll(".section-nav-item"),
    numbers = wrapper.querySelector(".scroll-list-numbers-inner"),
    numbersLength = numbers.querySelectorAll('div').length;

  if (!sections) {
    return;
  }

  let currentIndex = 0;

  sections.forEach((section, i) => {
    // const id = section.querySelector('.section-anchor').id;
    const title = section.querySelector("h2"),
      description = section.querySelector("p");

    let descriptionLines;

    const maskEl = createSVGGrid(title, 10);
    const descriptionEls = new SplitType(description, {
      types: "lines",
      tagName: "span",
    });

    setLinesWrapper(descriptionEls.lines, () => {
      descriptionLines = description.querySelectorAll(".line");
    });

    setListSectionScroll(section, i === 0, i === sections.length - 1, maskEl, descriptionLines, () => {
      console.log('numbersCallback', i, currentIndex);
      if (currentIndex !== i) {
        gsap.to(numbers, {
          yPercent: Number((100 / numbersLength).toFixed(2)) * -i,
          duration: 1,
          ease: "expo.out",
        });

        currentIndex = i;
      }
    });
  });
}

function setListSectionScroll(
  trigger,
  isFirst,
  isLast,
  titleMaskEl,
  descriptionLines,
  numbersCallback
) {
  const squaresTitle = titleMaskEl.querySelectorAll("rect");
  const squaresTitleTiming = squaresTitle.length * 0.01;

  if (!isFirst) {    
    gsap.set(squaresTitle, { opacity: 0 });
    gsap.set(descriptionLines, { yPercent: 100 });
  } else {
    gsap.set(squaresTitle, { opacity: 1 });
  }
  const tlIn = gsap.timeline({ paused: true });
  const tlOut = gsap.timeline({ paused: true });

  if (!isFirst) {
    tlIn
      .to(
        squaresTitle,
        {
          opacity: 1,
          duration: 0.01,
          stagger: {
            from: "random",
            each: 0.01,
          },
          ease: "bounce.out",
        },
        0
      )
      .to(
        descriptionLines,
        {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.5,
          ease: "power4.inOut",
        },
        // `-=${squaresVideoTiming}`
        0
      );
  }

  tlOut
    .to(squaresTitle, {
      opacity: 0,
      duration: 0.01,
      stagger: {
        from: "random",
        each: 0.01,
      },
      ease: "bounce.out",
    })
    .to(
      descriptionLines,
      {
        yPercent: -100,
        stagger: 0.02,
        duration: 0.5,
        ease: "power4.inOut",
      },
      0
    );
  
  let start, end;

  if (isFirst) {
    start = "top top";
    end = "50% top";
  } else if (isLast) {
    start = "50% top";
    end = "bottom bottom";
  } else {
    start = "33.33% top";
    end = "66.66% top";
  }

  gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      // markers: true,
      scrub: true,
      pin: false,
      onEnter: () => {
        // gsap.to(
        //   squaresVideo,
        //   {
        //     opacity: 1,
        //     duration: 0.005,
        //     stagger: {
        //       from: "random",
        //       each: 0.005,
        //     },
        //     ease: "bounce.out",
        //     immediateRender: true,
        //   });
        if (!isFirst) {
          tlIn.play();
          numbersCallback();        
        }
      },
      onEnterBack: () => {
        tlOut.reverse();
        numbersCallback();
        // gsap.to(squaresVideo, {
        //   opacity: 1,
        //   duration: 0.005,
        //   stagger: {
        //     from: "random",
        //     each: 0.005,
        //   },
        //   ease: "bounce.out",
        //   immediateRender: true,
        // });        
      },
      onLeave: () => {
        if (!isLast) {
          tlOut.play();
          numbersCallback();
          // gsap.to(squaresVideo, {
          //   opacity: 0,
          //   duration: 0.005,
          //   stagger: {
          //     from: "random",
          //     each: 0.005,
          //   },
          //   ease: "bounce.out",
          //   immediateRender: true,
          // });          
        }
      },
      onLeaveBack: () => {
        if (!isFirst) {
          tlIn.reverse();
          numbersCallback();
          // gsap.to(squaresVideo, {
          //   opacity: 0,
          //   duration: 0.005,
          //   stagger: {
          //     from: "random",
          //     each: 0.005,
          //   },
          //   ease: "bounce.out",
          //   immediateRender: true,
          // });          
        }
      }
    },
  });
}
