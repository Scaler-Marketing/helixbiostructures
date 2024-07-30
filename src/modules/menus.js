import { getElementHeightInRem } from "./getHeight";

export function initMenus() {
  const nav = document.querySelector('.header .nav'),
    dropdowns = nav.querySelectorAll('.nav-dropdown-trigger-wrapper'),
    dropdownEl = nav.querySelector('.nav-dropdown-el'),
    dropdownInner = nav.querySelector('.nav-dropdown-el-inner');
  
  gsap.set(dropdownInner.querySelectorAll('[data-menu]'), { display: 'none' });
  gsap.set(dropdownInner, { height: '0rem' });
  let isHover = false;

  dropdowns.forEach((dropdown) => {
    const id = dropdown.dataset.menu;

    if (!id) {
      return;
    }

    dropdown.addEventListener('mouseenter', (e) => {
      isHover = true;
      const activeMenu = dropdownInner.querySelector(`[data-menu="${id}"]`);

      dropdownEl.classList.add('active');
      gsap.set(dropdownInner.querySelectorAll("[data-menu]"), {
        display: "none",
      });
      gsap.set(activeMenu, { display: "grid" });

      const activeHeight = getElementHeightInRem(activeMenu);
      gsap.to(dropdownInner, {
        height: `${activeHeight}rem`,
        duration: 0.3,
        ease: "expo.out"
      });

    });

    nav.addEventListener('mouseleave', (e) => {
      if (!isMouseOverElement(nav, e)) {
        gsap.to(dropdownInner, {
          height: `0rem`,
          duration: 0.3,
          ease: "expo.out",
          onComplete: () => {
            gsap.set(dropdownInner.querySelectorAll("[data-menu]"), { display: "none" });
            dropdownEl.classList.remove("active");
          }
        });
      }
    })    
  });
}

function isMouseOverElement(element, event) {
  // Check if the mouse is over the specified element or its descendants
  return element.contains(event.relatedTarget);
}