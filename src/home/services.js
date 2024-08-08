import { createSVGGrid } from "../modules/createSVGGrid";
import { setLinesWrapper } from "../modules/setLinesWrapper";

export function initSectionScroll() {
  const wrapper = document.querySelector(".section.list-scroll"),
    sections = wrapper.querySelectorAll(".sticky-wrapper"),
    anchors = wrapper.querySelectorAll(".section-nav-item");

  if (!sections) {
    return;
  }

  sections.forEach((section, i) => {
    const id = section.querySelector('.section-anchor').id,
      title = section.querySelector("h2"),
      description = section.querySelector("p"),
      button = section.querySelector(".button"),
      videoBg = wrapper.querySelector(`.section-scroll-video-bg[data-section-id="${id}"]`),
      anchorLink = wrapper.querySelector(
        `.section-nav-item[data-target="${id}"]`
      );

    let descriptionLines;

    const maskEl = createSVGGrid(title, 10);
    const maskVideo = createSVGGrid(videoBg, 10);
    // Split all words on the brand core section
    const descriptionEls = new SplitType(description, {
      types: "lines",
      tagName: "span",
    });

    setLinesWrapper(descriptionEls.lines, () => {
      descriptionLines = description.querySelectorAll(".line");
    });

    setListSectionScroll(section, i === 0, i === sections.length -1, maskEl, maskVideo, descriptionLines, button, anchorLink);
  });
}

function setListSectionScroll(
  trigger,
  isFirst,
  isLast,
  titleMaskEl,
  maskVideo,
  descriptionLines,
  button,
  anchorLink
) {
  const squaresTitle = titleMaskEl.querySelectorAll("rect");
  const squaresTitleTiming = squaresTitle.length * 0.01;
  const squaresVideo = maskVideo.querySelectorAll("rect");
  const squaresVideoTiming = squaresVideo.length * 0.005;

  if (!isFirst) {    
    gsap.set(squaresTitle, { opacity: 0 });
    gsap.set(squaresVideo, { opacity: 0 });
    gsap.set(descriptionLines, { yPercent: 100 });
    gsap.set(button, { yPercent: 105 });
  } else {
    gsap.set(squaresTitle, { opacity: 1 });
    gsap.set(squaresVideo, { opacity: 0 });
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
      )
      .to(
        button,
        {
          yPercent: 0,
          duration: 0.5,
          ease: "power4.inOut",
        },
        // "-=0.5"
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
    // .to(
    //   squaresVideo,
    //   {
    //     fill: "#000",
    //     duration: 0.005,
    //     stagger: {
    //       from: "random",
    //       each: 0.005,
    //     },
    //     ease: "bounce.out",
    //   },
    //   0
    // )
    .to(
      descriptionLines,
      {
        yPercent: -100,
        stagger: 0.02,
        duration: 0.5,
        ease: "power4.inOut",
      },
    // `-=${squaresVideoTiming}`
      0
    )
    .to(
      button,
      {
        yPercent: -105,
        duration: 0.5,
        ease: "power4.inOut",
      },
      // "-=0.5"
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
        // console.log("onEnter");
        gsap.to(
          squaresVideo,
          {
            opacity: 1,
            duration: 0.005,
            stagger: {
              from: "random",
              each: 0.005,
            },
            ease: "bounce.out",
            immediateRender: true,
          });
        if (!isFirst) {
          tlIn.play();
        }
        anchorLink.classList.add('active');
      },
      onEnterBack: () => {
        // console.log('onEnterBack')
        tlOut.reverse();
        gsap.to(squaresVideo, {
          opacity: 1,
          duration: 0.005,
          stagger: {
            from: "random",
            each: 0.005,
          },
          ease: "bounce.out",
          immediateRender: true,
        });        
        anchorLink.classList.add("active");
      },
      onLeave: () => {
        // console.log("OnLeave");
        if (!isLast) {
          tlOut.play();
          gsap.to(squaresVideo, {
            opacity: 0,
            duration: 0.005,
            stagger: {
              from: "random",
              each: 0.005,
            },
            ease: "bounce.out",
            immediateRender: true,
          });          
          anchorLink.classList.remove("active");
        }
      },
      onLeaveBack: () => {
        // console.log("OnLeaveBack");
        if (!isFirst) {
          tlIn.reverse();
          gsap.to(squaresVideo, {
            opacity: 0,
            duration: 0.005,
            stagger: {
              from: "random",
              each: 0.005,
            },
            ease: "bounce.out",
            immediateRender: true,
          });          
          anchorLink.classList.remove("active");
        }
      }
    },
  });
}
