import { createSVGGrid } from "../modules/createSVGGrid.js";
import { setLinesWrapper } from "../modules/setLinesWrapper.js";

export function initServicesSectionScroll() {
  const wrapper = document.querySelector(".section.list-scroll"),
    sections = wrapper.querySelectorAll(".section-list-scroll_inner"),
    spacers = wrapper.querySelectorAll(".section-anchor"),
    anchorLinks = wrapper.querySelectorAll(".section-nav-item"),
    numbers = wrapper.querySelector(".scroll-list-numbers-inner"),
    numbersLength = numbers ? numbers.querySelectorAll("div").length : null;

  if (!sections) {
    return;
  }

  let currentIndex = 0;

  function updateNumbers(i) {
      if (currentIndex !== i) {
        gsap.to(numbers, {
          yPercent: Number((100 / numbersLength).toFixed(2)) * -i,
          duration: 1,
          ease: "expo.out",
        });

        currentIndex = i;
      }
  }
    // console.log(anchorLinks);

  sections.forEach((section, i) => {
    const id = section.dataset.section || null;
    const trigger = spacers[i];
    const title = section.querySelector(".section-scroll-title > *"),
      descriptionEl = section.querySelector(".section-scroll-description"),
      descriptionType = descriptionEl.classList.contains("is-masked") ? 'html' : 'text';
    
    let anchorLink;

    if (anchorLinks) {
      anchorLink = id ? wrapper.querySelector(
        `.section-nav-item[data-target="${id}"]`
      ) : anchorLinks[i];
    }

    let titleMaskEl, description;

    if (title && descriptionType !== 'html') {
      titleMaskEl = createSVGGrid(title, 10);
    }

    if (descriptionType === 'html') {
      description = createSVGGrid(descriptionEl.querySelector('div'), 10);
    } else {
      descriptionInner = descriptionEl.querySelector("p");
      if (descriptionInner) {
        const descriptionEls = new SplitType(descriptionInner, {
          types: "lines",
          tagName: "span",
        });

        setLinesWrapper(descriptionEls.lines, () => {
          description = descriptionInner.querySelectorAll(".line");
        });
      }
    }

    setListSectionScroll({
      trigger: trigger,
      isFirst: i === 0,
      isLast: i === sections.length - 1,
      titleMaskEl,
      description: {
        type: descriptionType,
        el: description,
      },
      anchorLink,
      onComplete: () => {
        if (numbers) {
          updateNumbers(i);
        }
      },
    });
  });
}

function setListSectionScroll(settings) {
  const {
    trigger,
    isFirst,
    isLast,
    titleMaskEl,
    description,
    anchorLink,
    onComplete,
  } = settings;
  
  let squaresTitle, squaresDescription;

  if (titleMaskEl) {
    squaresTitle = titleMaskEl.querySelectorAll("rect");
  }
  if (description.type === "html") {
    squaresDescription = description.el.querySelectorAll("rect");
  }

  if (!isFirst) {
    if (titleMaskEl) {
      gsap.set(squaresTitle, { opacity: 0 });
    }

    if (description.type === "html") {
      gsap.set(squaresDescription, { opacity: 0 });
    } else {
      gsap.set(description.el, { yPercent: 105 });
    }

  } else {
    if (titleMaskEl) {
      gsap.set(squaresTitle, { opacity: 1 });
    }
    if (description.type === "html") {
      gsap.set(squaresDescription, { opacity: 1 });
    }

    if (anchorLink) {
      anchorLink.classList.add("active");
    }
  }
  const tl = gsap.timeline({ paused: true });

  if (!isFirst) {
    if (titleMaskEl) {
      tl.to(
        squaresTitle,
        {
          opacity: 1,
          duration: 0.01,
          stagger: {
            from: "random",
            each: 0.01,
          },
          ease: "power4.inOut",
        },
        0
      );
    }

    if (description.type === "html") {
      tl.to(
        squaresDescription,
        {
          opacity: 1,
          duration: 0.005,
          stagger: {
            from: "random",
            each: 0.005,
          },
          ease: "power4.inOut",
        },
        0
      );
    }

    if (description.type === "text" && description.el) {
      tl.to(
        description.el,
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
  }

  if (description.type === "html") {
    tl.addPause(0.5);
    tl.addLabel('out', 0.5);
  }  

  if (titleMaskEl) {
    tl.to(squaresTitle, {
      opacity: 0,
      duration: 0.01,
      stagger: {
        from: "random",
        each: 0.01,
      },
      ease: "power4.inOut",
    }, 0.5);
  }

  if (description.type === "html") {
    tl.to(squaresDescription, {
      opacity: 0,
      duration: 0.005,
      stagger: {
        from: "random",
        each: 0.005,
      },
      ease: "power4.inOut",
    }, 0.5);
  }

  if (description.type === "text" && description.el) {
    tl.to(
      description.el,
      {
        yPercent: -105,
        stagger: 0.02,
        duration: 0.5,
        ease: "power4.inOut",
      },
      0.5
    );
  }

  if (description.type !== "html") {
    tl.addPause(0.5);
    tl.addLabel("out", 0.5);
  }  

  gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top center",
      end: "bottom center",
      scrub: true,
      fastScrollEnd: 500,
      preventOverlaps: "scroll-list",
      pin: false,
      // markers: true,
      onEnter: () => {
        if (!isFirst) {
          tl.play();
          if (typeof onComplete === 'function') {
            onComplete();
          }

          if (anchorLink) {
            anchorLink.classList.add("active");
          }
        }
      },
      onEnterBack: () => {
        if (!isLast) {
          tl.progress(1).reverse();
          if (typeof onComplete === "function") {
            onComplete();
          }

          if (anchorLink) {
            anchorLink.classList.add("active");
          }
        }
      },
      onLeave: () => {
        if (!isLast) {
          tl.seek("out").play();
          if (typeof onComplete === "function") {
            onComplete();
          }

          if (anchorLink) {
            anchorLink.classList.remove("active");
          }
        }
      },
      onLeaveBack: () => {
        if (!isFirst) {
          tl.seek("out").reverse();
          if (typeof onComplete === "function") {
            onComplete();
          }

          if (anchorLink) {
            anchorLink.classList.remove("active");
          }
        }
      },
    },
  });
}
