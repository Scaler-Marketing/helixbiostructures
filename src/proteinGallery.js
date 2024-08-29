function initProteinGallery() {
  const items = document.querySelectorAll(".protein-gallery_item");

  if (!items) {
    return;
  }

  let currentItemIndex = -1;

  items.forEach((item, i) => {
    const trigger = item.querySelector(".protein-gallery_item-trigger"),
      wrapper = item.querySelector(".protein-gallery_inner-wrapper");
    
    gsap.set(wrapper, { height: 0 });

    trigger.addEventListener("click", (e) => {
      if (currentItemIndex === i) {
        closeItem(item);
        currentItemIndex = -1;
      } else {
        if (currentItemIndex !== -1) {
          const previousItem = items[currentItemIndex];
          closeItem(previousItem);
        }
        openItem(item);
        currentItemIndex = i;
      }
    });
  });
}

function openItem(item) {
  const trigger = item.querySelector(".protein-gallery_item-trigger"),
    circles = trigger.querySelectorAll(".circle-hide"),
    row = item.querySelector(".protein-gallery_row"),
    wrapper = item.querySelector(".protein-gallery_item-inner-wrapper");
  
  item.classList.add('active');

  const tl = gsap.timeline();

  tl.to(
    row,
    {
      opacity: 0,
      duration: 0.5,
      ease: "expo.out",
    },
    0
  );

  tl.to(
    circles,
    {
      scale: 0,
      duration: 0.3,
      ease: "expo.out",
    },
    0
  );

  tl.to(
    wrapper,
    {
      visibility: "visible",
      duration: 0,
    },
    0
  );

  tl.to(
    wrapper,
    {
      height: "auto",
      opacity: 1,
      duration: 0.5,
      ease: "expo.out",
    },
    0
  );
}

function closeItem(item, noTransition) {
  const trigger = item.querySelector(".protein-gallery_item-trigger"),
    circles = trigger.querySelectorAll(".circle-hide"),
    row = item.querySelector(".protein-gallery_row"),
    wrapper = item.querySelector(".protein-gallery_item-inner-wrapper");
  
  item.classList.remove("active");

  if (noTransition) {
    gsap.set(circles, { scale: 1 });
    gsap.set(wrapper, { height: "0", opacity: 0, visibility: "hidden" });
    gsap.set(row, { opacity: 1 });
  } else {

    const tl = gsap.timeline();
  
    tl.to(
      circles,
      {
        scale: 1,
        duration: 0.3,
        ease: "expo.out",
      },
      0
    );
  
    tl.to(
      wrapper,
      {
        height: "0",
        opacity: 0,
        duration: 0.5,
        ease: "expo.out",
      },
      0
    );
  
    tl.to(
      wrapper,
      {
        visibility: "hidden",
        duration: 0,
      },
      0.5
    );
  
    tl.to(
      row,
      {
        opacity: 1,
        duration: 0.5,
        ease: "expo.out",
      },
      0
    );
  }
}

function resetProteinGallery() {
  const active = document.querySelector('.protein-gallery_item.active');

  if (!active) {
    return;
  }

  closeItem(active, true);
  currentItemIndex = -1;
}

initProteinGallery();

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  "cmsfilter",
  (filterInstances) => {
    // console.log("cmsfilter Successfully loaded!");

    // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
    const [filterInstance] = filterInstances;

    // The `renderitems` event runs whenever the list renders items after filtering.
    filterInstance.listInstance.on("renderitems", (renderedItems) => {
      resetProteinGallery();
      // console.log(renderedItems);
    });
  },
]);