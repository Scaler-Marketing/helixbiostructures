import { getElementHeightInRem } from "./getHeight";

export function initMenus() {
  let mm = gsap.matchMedia();
  // add a media query. When it matches, the associated function will run
  mm.add("(min-width: 992px)", () => {
    const nav = document.querySelector(".header .nav"),
      dropdowns = nav.querySelectorAll(".nav-dropdown-trigger-wrapper"),
      dropdownEl = nav.querySelector(".nav-dropdown-el.desktop"),
      dropdownInner = dropdownEl.querySelector(".nav-dropdown-el-inner");

    gsap.set(dropdownInner.querySelectorAll("[data-menu]"), {
      display: "none",
    });
    gsap.set(dropdownInner, { height: "0rem" });
    let isHover = false;
    let currentMenu;

    dropdowns.forEach((dropdown) => {
      const id = dropdown.dataset.menu;
      const bg = dropdown.querySelector(".button-bg");
      // const iconClosed = dropdown.querySelector(".nav-dropdown-icon.closed");
      const iconOpen = dropdown.querySelector(".nav-dropdown-icon.open");

      if (!id) {
        return;
      }

      const dropdownChars = new SplitType(
        dropdown.querySelector(".button-label-inner"),
        {
          types: "chars",
          tagName: "span",
        }
      );

      gsap.set(bg, { yPercent: 100 });
      gsap.set(iconOpen.querySelectorAll("circle"), { opacity: 0 });

      dropdown.addEventListener("mouseenter", (e) => {
        if (currentMenu === id) {
          return;
        }

        if (currentMenu) {
          const previousActiveEl = nav.querySelector(
            `.nav-dropdown-trigger-wrapper[data-menu="${currentMenu}"]`
          );
          setOffState(previousActiveEl);
        }

        isHover = true;
        currentMenu = id;

        setOnState(dropdown);

        // Logic for dropdown menu
        const activeMenu = dropdownInner.querySelector(`[data-menu="${id}"]`);

        dropdownEl.classList.add("active");
        gsap.set(dropdownInner.querySelectorAll("[data-menu]"), {
          display: "none",
        });
        gsap.set(activeMenu, { display: "grid" });

        const activeHeight = getElementHeightInRem(activeMenu);
        gsap.to(dropdownInner, {
          height: `${activeHeight}rem`,
          duration: 0.3,
          ease: "expo.out",
        });
      });

      nav.addEventListener("mouseleave", (e) => {
        isHover = false;
        currentMenu = null;

        setAllOffStates(dropdowns);

        if (!isMouseOverElement(nav, e)) {
          gsap.to(dropdownInner, {
            height: `0rem`,
            duration: 0.3,
            ease: "expo.out",
            onComplete: () => {
              gsap.set(dropdownInner.querySelectorAll("[data-menu]"), {
                display: "none",
              });
              dropdownEl.classList.remove("active");
            },
          });
        }
      });

      // return () => { // optional
      //   // custom cleanup code here (runs when it STOPS matching)
      // };
    });
  });

  mm.add("(max-width: 991px)", () => {
    console.log("mobile");

    const nav = document.querySelector(".header .nav"),
      mobileTrigger = document.querySelector(".mobile-trigger");
    dropdowns = nav.querySelectorAll(".nav-dropdown-trigger-wrapper"),
    // dropdownEl = nav.querySelector(".nav-dropdown-el.desktop"),
    // dropdownInner = dropdownEl.querySelector(".nav-dropdown-el-inner");

    gsap.set(nav, { height: 0 });    
    const mobileTriggerTl = gsap.timeline({ paused: true });

    mobileTriggerTl
      .to(mobileTrigger.querySelectorAll(".circle-menu"), {
        scale: 0,
        duration: 0.2,
        // ease: "expo.inOut",
      })
      .fromTo(
        mobileTrigger.querySelectorAll(".circle-close"),
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 0.2,
          // ease: "expo.inOut",
        },
        0
      );

    mobileTrigger.addEventListener("click", () => {
      if (mobileTrigger.classList.contains("active")) {
        mobileTriggerTl.reverse();
        gsap.to(nav, {
          height: 0,
          ease: "expo.out",
        });
        setAllDropdownOffStates(dropdowns);        
      } else {
        mobileTriggerTl.play();
        gsap.to(nav, {
          height: "auto",
          ease: "expo.out"
        });
      }

      mobileTrigger.classList.toggle("active");
    });

    let currentMenu;

    dropdowns.forEach((dropdown) => {
      const id = dropdown.dataset.menu;
      const bg = dropdown.querySelector(".button-bg");
      const dropdownInner = dropdown.querySelector('.nav-dropdown-el.mobile');
      // const iconClosed = dropdown.querySelector(".nav-dropdown-icon.closed");
      const iconOpen = dropdown.querySelector(".nav-dropdown-icon.open");

      if (!id) {
        return;
      }

      const dropdownChars = new SplitType(
        dropdown.querySelector(".button-label-inner"),
        {
          types: "chars",
          tagName: "span",
        }
      );

      gsap.set(bg, { yPercent: 100 });
      gsap.set(iconOpen.querySelectorAll("circle"), { opacity: 0 });

      dropdown.addEventListener('click', () => {
        if (currentMenu === id) {
          setDropdownOffState(dropdown);
          currentMenu = null;
        } else {
          if (currentMenu) {
            const previousActiveEl = nav.querySelector(
              `.nav-dropdown-trigger-wrapper[data-menu="${currentMenu}"]`
            );
            setDropdownOffState(previousActiveEl);
          }

          currentMenu = id;

          setDropdownOnState(dropdown);
        }
      });
    });
  });

  // // later, if we need to revert all the animations/ScrollTriggers...
  // mm.revert();
}

function isMouseOverElement(element, event) {
  // Check if the mouse is over the specified element or its descendants
  return element.contains(event.relatedTarget);
}

function setOnState(el) {
  gsap.to(el.querySelectorAll(".char"), {
    yPercent: -100,
    stagger: 0.01,
    duration: 0.3,
    ease: "expo.out",
    immediateRender: true,
  });

  gsap.to(el.querySelector(".button-bg"), {
    yPercent: 0,
    duration: 0.3,
    ease: "expo.out",
  });

  gsap.to(el.querySelectorAll(".closed circle"), {
    opacity: 0,
    duration: 0.01,
    stagger: {
      each: 0.1,
      // from: "random",
    },
  });

  gsap.to(el.querySelectorAll(".open circle"), {
    opacity: 1,
    duration: 0.01,
    stagger: {
      each: 0.1,
      // from: "random",
    },
  });
}

function setOffState(el) {
  gsap.set(el.querySelectorAll(".char"), {
    yPercent: 0,
  });

  gsap.to(el.querySelector(".button-bg"), {
    yPercent: 100,
    duration: 0.3,
    ease: "expo.out",
  });

  gsap.to(el.querySelectorAll(".closed circle"), {
    opacity: 1,
    duration: 0.01,
    stagger: {
      each: 0.1,
      // from: "random",
    },
  });

  gsap.to(el.querySelectorAll(".open circle"), {
    opacity: 0,
    duration: 0.01,
    stagger: {
      each: 0.1,
      // from: "random",
    },
  });
}

function setAllOffStates(dropdowns) {
  dropdowns.forEach((el) => setOffState(el));
}

function setDropdownOffState(dropdown) {
  const dropdownInner = dropdown.querySelector(".nav-dropdown-el.mobile");

  dropdownInner.classList.remove("active");

  gsap.to(dropdownInner, {
    height: "0rem",
    duration: 0.3,
    ease: "expo.out",
  });

  setOffState(dropdown);
}

function setAllDropdownOffStates(dropdowns) {
  dropdowns.forEach((el) => setDropdownOffState(el));
}

function setDropdownOnState(dropdown) {
  // Logic for dropdown menu
  const activeMenu = dropdown.querySelector(`[data-menu]`);
  const dropdownInner = dropdown.querySelector(".nav-dropdown-el.mobile");
  
  dropdownInner.classList.add("active");
  
  const activeHeight = getElementHeightInRem(activeMenu);
  gsap.to(dropdownInner, {
    height: `${(activeHeight + 0.25)}rem`,
    duration: 0.3,
    ease: "expo.out",
  });
  
  setOnState(dropdown);
}