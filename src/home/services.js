import { createSVGGrid } from "../modules/createSVGGrid";
import { setLinesWrapper } from "../modules/setLinesWrapper";

export function initSectionScroll() {
  const wrapper = document.querySelector(".section.list-scroll"),
    sections = wrapper.querySelectorAll(".section-list-scroll_inner");

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
  const squaresVideo = maskVideo.querySelectorAll("rect");

  if (!isFirst) {
    gsap.set(squaresTitle, { opacity: 0 });
    gsap.set(squaresVideo, { opacity: 0 });
    gsap.set(descriptionLines, { yPercent: 105 });
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
        ease: "power4.inOut",
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
      },
      0
    )
    .to(
      button,
      {
        yPercent: 0,
        duration: 0.5,
        overwrite: "auto",
        ease: "power4.inOut",
      },
      0
    )
    .to(
      squaresTitle,
      {
        opacity: 0,
        duration: 0.01,
        overwrite: "auto",
        stagger: {
          from: "random",
          each: 0.01,
        },
        ease: "power4.inOut",
      },
      0.5
    )
    .to(
      descriptionLines,
      {
        yPercent: -105,
        stagger: 0.02,
        duration: 0.5,
        overwrite: "auto",
        ease: "power4.inOut",
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
      ease: "power4.out",
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
      ease: "power4.out",
    }); 
  
  gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top center",
      end: "bottom center",
      scrub: true,
      fastScrollEnd: 500,
      preventOverlaps: "home-services",
      pin: false,
      // markers: true,
      onEnter: () => {
        if (!isFirst) {
          tlContent.play();
          tlVideo.play();

          anchorLink.classList.add("active");
        }
      },
      onEnterBack: () => {
        if (!isLast) {
          tlContent.progress(1).reverse();
          tlVideo.progress(1).reverse();
          
          anchorLink.classList.add("active");
        }
      },
      onLeave: () => {
        if (!isLast) {
          tlContent.seek("out").play();
          tlVideo.seek("out").play();

          anchorLink.classList.remove("active");
        }
      },
      onLeaveBack: () => {
        if (!isFirst) {
          tlContent.seek("out").reverse();
          tlVideo.seek("out").reverse();
        
          anchorLink.classList.remove("active");
        }
      },
    },
  });
}
