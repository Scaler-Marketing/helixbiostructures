function initAccordions() {
  const accordions = document.querySelectorAll(".accordion-list");

  if (!accordions) {
    return;
  }

  accordions.forEach((accordion) => initAccordion(accordion));
}

function initAccordion(accordion) {
  const items = accordion.querySelectorAll(".accordion-item");

  if (!items) {
    return;
  }

  let currentItemIndex = -1;

  items.forEach((item, i) => {
    const trigger = item.querySelector(".accordion-item-trigger"),
      title = trigger.querySelector(".accordion-item-title"),
      wrapper = item.querySelector(".accordion-item-content");
    
    const titleEl = new SplitType(title, {
      types: "chars",
      tagName: "span",
    });

    gsap.set(wrapper, { height: 0 });
    
    trigger.addEventListener("click", (e) => {
      if (currentItemIndex === i) {
        closeAccordion(item, titleEl.chars);
        currentItemIndex = -1;
      } else {
        if (currentItemIndex !== -1) {
          const previousItem = items[currentItemIndex];
          closeAccordion(previousItem, previousItem.querySelectorAll('.accordion-item-title .char'));
        }
        openAccordion(item, titleEl.chars);
        currentItemIndex = i;
      }
    });
  });
}

function openAccordion(item, chars) {
  const trigger = item.querySelector(".accordion-item-trigger"),
    circles = trigger.querySelectorAll(".accordion-item-icon .circle-hide"),
    wrapper = item.querySelector(".accordion-item-content");
  
  gsap.to(chars, {
    yPercent: -100,
    duration: 0.5,
    stagger: 0.01,
    ease: "expo.out"
  });

  gsap.to(circles, {
    scale: 0,
    duration: 0.3,
    ease: "expo.out"
  });

  gsap.to(wrapper, {
    height: "auto",
    duration: .5,
    ease: "expo.inOut"
  });
}

function closeAccordion(item, chars) {
  const trigger = item.querySelector(".accordion-item-trigger"),
    circles = trigger.querySelectorAll(".accordion-item-icon .circle-hide"),
    wrapper = item.querySelector(".accordion-item-content");
  
  gsap.to(chars, {
    yPercent: 0,
    duration: 0.5,
    stagger: 0.01,
    ease: "expo.out"
  });

  gsap.to(circles, {
    scale: 1,
    duration: 0.3,
    ease: "expo.out"
  });

  gsap.to(wrapper, {
    height: "0",
    duration: .5,
    ease: "expo.inOut"
  });
}

initAccordions();