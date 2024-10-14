import { createSVGGrid } from "../modules/createSVGGrid";
import { setLinesWrapper } from "../modules/setLinesWrapper";

export function initSectionScroll() {
  const wrapper = document.querySelector(".section.list-scroll"),
    parent = wrapper.querySelector('.section-sticky.services'),
    sections = wrapper.querySelectorAll(".section-services_inner");

  if (!sections) {
    return;
  }

  sections.forEach((section, i) => {
    const id = section.dataset.section,
      trigger = document.getElementById(id),
      title = section.querySelector("h2"),
      description = section.querySelector("p"),
      button = section.querySelector(".button"),
      videoBg = wrapper.querySelector(`.section-scroll-video-bg[data-section-id="${id}"] video`),
      anchorLink = wrapper.querySelector(
        `.section-nav-item[data-target="${id}"]`
      );
    
    console.log(id, trigger, title, description, button, videoBg, anchorLink);

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

    let scrollTimeout;

    setListSectionScroll(
      trigger,
      i === 0,
      i === sections.length - 1,
      maskEl,
      maskVideo,
      descriptionLines,
      button,
      anchorLink,
      scrollTimeout
    );
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
  anchorLink,
  scrollTimeout
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
    anchorLink.classList.add("active");
    gsap.set(squaresTitle, { opacity: 1 });
    gsap.set(squaresVideo, { opacity: 1 });
  }
  const tlContent = gsap.timeline({ paused: true });
  const tlVideo = gsap.timeline({ paused: true });

  tlContent
    .to(
      squaresTitle,
      {
        opacity: 1,
        duration: 0.01,
        overwrite: "auto",
        stagger: {
          from: "random",
          each: 0.01,
        },
        ease: "bounce.out",
        // immediateRender: true,
      },
      0
    )
    .to(
      descriptionLines,
      {
        yPercent: 0,
        stagger: 0.02,
        duration: 0.5,
        overwrite: "auto",
        ease: "power4.inOut",
        // immediateRender: true,
      },
      // `-=${squaresVideoTiming}`
      0
    )
    .to(
      button,
      {
        yPercent: 0,
        duration: 0.5,
        overwrite: "auto",
        ease: "power4.inOut",
        // immediateRender: true,
      },
      // "-=0.5"
      0
    )
    .to(squaresTitle, {
      opacity: 0,
      duration: 0.01,
      overwrite: "auto",
      stagger: {
        from: "random",
        each: 0.01,
      },
      ease: "bounce.out",
      // immediateRender: true,
    }, 0.5)
    .to(
      descriptionLines,
      {
        yPercent: -100,
        stagger: 0.02,
        duration: 0.5,
        overwrite: "auto",
        ease: "power4.inOut",
        // immediateRender: true,
      },
      0.5
    )
    .to(
      button,
      {
        yPercent: -105,
        duration: 0.5,
        overwrite: "auto",
        ease: "power4.inOut",
        // immediateRender: true,
      },
      0.5
  );
  
  tlContent.addPause(0.5);
  tlContent.addLabel('out', 0.5);

  tlVideo
    .to(squaresVideo, {
      opacity: 1,
      duration: 0.005,
      overwrite: "auto",
      stagger: {
        from: "random",
        each: 0.005,
      },
      ease: "bounce.out",
      // immediateRender: true,
    })
    .addPause()
    .addLabel('out')
    .to(squaresVideo, {
      opacity: 0,
      duration: 0.005,
      overwrite: "auto",
      stagger: {
        from: "random",
        each: 0.005,
      },
      ease: "bounce.out",
      // immediateRender: true,
    });  
  
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
      start: "top center",
      end: "bottom center",
      // markers: true,
      scrub: true,
      fastScrollEnd: 500,
      preventOverlaps: "home-services",
      pin: false,
      onEnter: () => {
        if (!isFirst) {
          console.log("onEnter", anchorLink);
          tlContent.play();
          tlVideo.play();
          anchorLink.classList.add("active");
        }
      },
      onEnterBack: () => {
        if (!isLast) {
          console.log('onEnterBack', anchorLink);
          tlContent.progress(1).reverse();
          tlVideo.progress(1).reverse();
          
          anchorLink.classList.add("active");
        }
      },
      onLeave: () => {
        if (!isLast) {
            console.log("OnLeave", anchorLink);
            tlContent.seek("out").play();
            tlVideo.seek("out").play();
          anchorLink.classList.remove("active");
        }
      },
      onLeaveBack: () => {
        if (!isFirst) {
            console.log("OnLeaveBack", anchorLink);
            tlContent.seek("out").reverse();
            tlVideo.seek("out").reverse();
            anchorLink.classList.remove("active");
        }
      },
    },
  });
}
