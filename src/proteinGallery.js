function initProteinGallery(store) {
  const items = document.querySelectorAll(".protein-gallery_item");

  if (!items) {
    return;
  }

  let currentItemIndex = -1;

  items.forEach((item, i) => {
    const trigger = item.querySelector(".protein-gallery_item-trigger"),
      wrapper = item.querySelector(".protein-gallery_inner-wrapper"),
      quantity = item.querySelector(".protein-purchase_quantity-number"),
      plus = item.querySelector(".protein_purchase-quantity-button.plus"),
      minus = item.querySelector(".protein_purchase-quantity-button.minus"),
      name = item.querySelector(".protein-gallery_item-name"),
      addtoPurchaseForm = item.querySelector(".protein-purchase .button");

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

    addtoPurchaseForm.addEventListener("click", () => {
      console.log(name, name.innerText, quantity.value )
      store.addItem(name.innerText, quantity.value);
    });

    plus.addEventListener("click", (e) => {
      e.preventDefault();
      quantity.value = parseFloat(Number(quantity.value) + 0.1).toFixed(1);
    });
    minus.addEventListener("click", (e) => {
      e.preventDefault();

      if (Number(quantity.value) > 0) {
        quantity.value = parseFloat(Number(quantity.value) - 0.1).toFixed(1);

      }
    });
  });
}

function openItem(item) {
  const trigger = item.querySelector(".protein-gallery_item-trigger"),
    circles = trigger.querySelectorAll(".circle-hide"),
    row = item.querySelector(".protein-gallery_row"),
    wrapper = item.querySelector(".protein-gallery_item-inner-wrapper");

  item.classList.add("active");

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
  const active = document.querySelector(".protein-gallery_item.active");

  if (!active) {
    return;
  }

  closeItem(active, true);
  currentItemIndex = -1;
}

document.addEventListener("alpine:init", () => {
  initProteinGallery(Alpine.store("purchaseForm"));
});

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
