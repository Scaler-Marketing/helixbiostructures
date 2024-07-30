import { getElementHeightInRem } from "./getHeight";

export function initMenus() {
  const nav = document.querySelector(".header .nav"),
    dropdowns = nav.querySelectorAll(".nav-dropdown-trigger-wrapper"),
    dropdownEl = nav.querySelector(".nav-dropdown-el"),
    dropdownInner = nav.querySelector(".nav-dropdown-el-inner");

  gsap.set(dropdownInner.querySelectorAll("[data-menu]"), { display: "none" });
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
  });
}

function isMouseOverElement(element, event) {
  // Check if the mouse is over the specified element or its descendants
  return element.contains(event.relatedTarget);
}

function setOnState(el) {
  gsap.to(el.querySelectorAll('.char'), {
    yPercent: -100,
    stagger: 0.01,
    duration: 0.3,
    ease: "expo.out",
    immediateRender: true,
  });

  gsap.to(el.querySelector('.button-bg'), {
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
  dropdowns.forEach(el => setOffState(el));
}