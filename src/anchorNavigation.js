function initSectionScroll() {
  const sections = document.querySelectorAll(".section-navigation");
  if (!sections) {
    return;
  }

  sections.forEach((section, i) => {
    const items = section.querySelectorAll(".section-nav-item");

    if (!items) {
      return;
    }

    items.forEach((item, i) => {
      const id = item.dataset.target,
        el = document.getElementById(id),
        isFirst = i === 0,
        isLast = i === items.length - 1;
      
      console.log(el);

      if (!el) {
        return;
      }

      if (isFirst) {
        item.classList.add("active");
      }

      let start, end;
      if (isFirst) {
        start = "top center";
        end = "bottom center";
      } else if (isLast) {
        start = "top center";
        end = "bottom center";
      } else {
        start = "top center";
        end = "bottom center";
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          end,
          markers: false,
          scrub: true,
          pin: false,
          onEnter: () => {
            if (!isFirst) {
              item.classList.add("active");
            }
          },
          onEnterBack: () => {
            item.classList.add("active");
          },
          onLeave: () => {
            if (!isLast) {
              item.classList.remove("active");
            }
          },
          onLeaveBack: () => {
            if (!isFirst) {
              item.classList.remove("active");
            }
          },
        },
      });
    });
  });
}

initSectionScroll();
