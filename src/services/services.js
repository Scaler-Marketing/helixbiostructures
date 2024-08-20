import { createSVGGrid } from "../modules/createSVGGrid";
import { setLinesWrapper } from "../modules/setLinesWrapper";

export function initServicesSectionScroll() {
  const wrapper = document.querySelector(".section.list-scroll"),
    sections = wrapper.querySelectorAll(".sticky-wrapper"),
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

  sections.forEach((section, i) => {
    const id = section.querySelector('.section-anchor').id;
    const title = section.querySelector(".section-scroll-title > *"),
      descriptionEl = section.querySelector(".section-scroll-description"),
      descriptionType = descriptionEl.classList.contains("is-masked") ? 'html': 'text',
      anchorLink = wrapper.querySelector(
        `.section-nav-item[data-target="${id}"]`
      );

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
      trigger: section,
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
      gsap.set(description.el, { yPercent: 100 });
    }

  } else {
    if (titleMaskEl) {
      gsap.set(squaresTitle, { opacity: 1 });
    }
    if (description.type === "html") {
      gsap.set(squaresDescription, { opacity: 1 });
    }
  }
  const tlIn = gsap.timeline({ paused: true });
  const tlOut = gsap.timeline({ paused: true });

  if (!isFirst) {
    if (titleMaskEl) {
      tlIn.to(
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
      );
    }

    if (description.type === "html") {
      tlIn.to(
        squaresDescription,
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
      );
    }

    if (description.type === "text" && description.el) {
      tlIn.to(
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

  if (titleMaskEl) {
    tlOut.to(squaresTitle, {
      opacity: 0,
      duration: 0.01,
      stagger: {
        from: "random",
        each: 0.01,
      },
      ease: "bounce.out",
    });
  }

  if (description.type === "html") {
    tlOut.to(squaresDescription, {
      opacity: 0,
      duration: 0.01,
      stagger: {
        from: "random",
        each: 0.01,
      },
      ease: "bounce.out",
    });
  }

  if (description.type === "text" && description.el) {
    tlOut.to(
      description.el,
      {
        yPercent: -100,
        stagger: 0.02,
        duration: 0.5,
        ease: "power4.inOut",
      },
      0
    );
  }

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
        if (!isFirst) {
          tlIn.play();
          if (typeof onComplete === 'function') {
            onComplete();
          }
        }

        if (anchorLink) {
          anchorLink.classList.add("active");
        }
      },
      onEnterBack: () => {
        tlOut.reverse();
        onComplete();
        if (anchorLink) {
          anchorLink.classList.add("active");
        }
      },
      onLeave: () => {
        if (!isLast) {
          tlOut.play();
          if (typeof onComplete === "function") {
            onComplete();
          }
        }
        if (anchorLink) {
          anchorLink.classList.remove("active");
        }
      },
      onLeaveBack: () => {
        if (!isFirst) {
          tlIn.reverse();
          if (typeof onComplete === "function") {
            onComplete();
          }
        }
        if (anchorLink) {
          anchorLink.classList.remove("active");
        }
      },
    },
  });
}
