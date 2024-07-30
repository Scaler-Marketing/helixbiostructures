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

/**
 * Converts a length value from any CSS unit to pixels.
 * @param {string} value - The length value as a string (e.g., "2rem", "50px").
 * @returns {number} - The length value in pixels.
 */
function convertToPixels(value) {
    // Create a temporary element to use the browser's rendering to convert the value to pixels
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.width = value;
    document.body.appendChild(tempElement);
    const pixelValue = parseFloat(window.getComputedStyle(tempElement).width);
    document.body.removeChild(tempElement);
    return pixelValue;
}

/**
 * Calculates the height of an element in rem units.
 * @param {HTMLElement} element - The target element.
 * @returns {number} - The height of the element in rem units.
 */
function getElementHeightInRem(element) {
    if (!element) {
        throw new Error('Element is required');
    }

    // Get the computed style of the element
    const computedStyle = window.getComputedStyle(element);

    // Get the height of the element in pixels
    const heightInPixels = parseFloat(computedStyle.height);

    // Get the font size of the root element (html) in rem units and convert it to pixels
    const rootFontSizeInRem = window.getComputedStyle(document.documentElement).fontSize;
    const rootFontSizeInPixels = convertToPixels(rootFontSizeInRem);

    // Calculate height in rem units
    const heightInRem = heightInPixels / rootFontSizeInPixels;

    return heightInRem;
}