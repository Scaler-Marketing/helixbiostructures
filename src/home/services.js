import { createSVGGrid } from "../modules/createSVGGrid";
import { setLinesWrapper } from "../modules/setLinesWrapper";

export function initSectionScroll() {
  const wrapper = document.querySelector('.section.list-scroll'),
    sections = wrapper.querySelectorAll('.sticky-wrapper'),
    anchors = wrapper.querySelectorAll('.section-nav-item');
  
  if (!sections) {
    return;
  }
  
  sections.forEach((section) => {
    const id = section.attributes.id,
      title = section.querySelector("h2"),
      description = section.querySelector("p"),
      button = section.querySelector(".button"),
      anchorLink = wrapper.querySelector(
        `.section-nav-item[data-target="${id}"]`
      );
    
    let descriptionLines;

    const maskEl = createSVGGrid(title, 10);
    // Split all words on the brand core section
    const descriptionEls = new SplitType(description, {
      types: "lines",
      tagName: "span",
    });

    setLinesWrapper(descriptionEls.lines, () => {
      descriptionLines = description.querySelectorAll(".line");
      gsap.set(descriptionLines, { yPercent: 100 });
    });

    gsap.set(button, { yPercent: 100 });

    setListSectionScroll(section, maskEl, descriptionLines, button, anchorLink);
  });

}

function setListSectionScroll(trigger, titleMaskEl, descriptionLines, button, anchorLink) {
  const squares = titleMaskEl.querySelectorAll("rect");

  gsap.set(squares, { fill: "#000000" });
  const tl = gsap.timeline({ paused: true });

  tl.addLabel('in')
    .to(
    squares,
    {
      fill: "#ffffff",
      stagger: {
        from: "random",
        duration: 0.5,
      },
      ease: "bounce.out",
    }
  ).to(
    descriptionLines,
    {
      yPercent: 0,
      stagger: 0.02,
      duration: 0.5,
      ease: "power4.out"
    },
    "-=0.5"
  ).to(
    button,
    {
      yPercent: 0,
      duration: 0.5,
      ease: "power4.out"
    },
    "-=0.5"
  );

  tl.addLabel('out')
    .to(squares, {
    fill: "#000",
    stagger: {
      duration: 0.5,
      from: "random",
    },
    ease: "bounce.out",
  })
    .to(
      descriptionLines,
      {
        yPercent: -100,
        stagger: 0.02,
        duration: 0.5,
        ease: "power4.out",
      },
      "-=0.5"
    )
    .to(
      button,
      {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.out",
      },
      "-=0.5"
  );
  
  tl.addLabel('end');

  tl.addPause("out");

  gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onEnter: () => {
        console.log('onEnter');
        tl.seek('in').play();
      },
      onEnterBack: () => {
        console.log('onEnterBack')
        tl.seek('end').reverse();
      },
      onLeave: () => {
        console.log("OnLeave");
        tl.seek('out').play();
      },
      onLeaveBack: () => {
        console.log("OnLeaveBack");
        tl.seek('end').reverse();
      }
    }
  });
}