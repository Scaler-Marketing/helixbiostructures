import { getElementHeightInRem } from "./modules/getHeight";

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
      quantity.value++;
    });
    minus.addEventListener("click", (e) => {
      e.preventDefault();

      if (quantity.value > 0) {
        quantity.value--;
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

function initPurchaseForm(store) {
  const formTrigger = document.querySelector(".purchase-form_trigger"),
    formTriggerHeight = getElementHeightInRem(formTrigger),
    formClose = document.querySelector(".purchase-form_close"),
    formCloseCircles = formClose.querySelectorAll("circle"),
    form = document.querySelector(".purchase-form"),
    formInner = document.querySelector(".purchase-form_inner"),
    backdrop = document.querySelector(".purchase-form_backdrop");
  
  gsap.set(form, { visibility: "hidden", opacity: 0 });
  gsap.set(formInner, { height: `${formTriggerHeight}rem` });
  gsap.set(backdrop, { opacity: 0, backdropFilter: "blur(0px)" });
  gsap.set(formClose, { visibility: "hidden" });
  gsap.set(formCloseCircles, { opacity: 0 });


  const tl = gsap.timeline({ paused: true });

  tl.set(form, { visibility: "visible" })
    .to(
      formTrigger,
      {
        opacity: 0,
        duration: 0.5,
        ease: "expo.inOut",
      },
      0
    )
    .to(
      backdrop,
      {
        display: "block",
        opacity: 1,
        backdropFilter: "blur(24px)",
        duration: 0.5,
        ease: "expo.inOut",
      },
      0
    )
    .to(
      formInner,
      {
        height: "auto",
        duration: 0.5,
        ease: "expo.inOut",
      },
      0
    )
    .to(
      form,
      {
        opacity: 1,
        duration: 0.5,
        ease: "expo.inOut",
      },
      0
    )
    .set(formClose, { visibility: "visible" })
    .to(
      formCloseCircles,
      {
        opacity: 1,
        duration: 0.01,
        stagger: {
          each: 0.05,
          from: "random",
        },
        ease: "expo.inOut",
      },
      0.5
    )
    .set(formTrigger, { visibility: "hidden" });

  formTrigger.addEventListener("click", () => {
    tl.play();
    store.isOpen = true;
  });

  formClose.addEventListener("click", () => {
    tl.reverse();
    store.isOpen = false;
  });

  formClose.addEventListener("mouseover", () => {
    gsap.fromTo(
      formCloseCircles,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.01,
        stagger: {
          each: 0.05,
          from: "random",
        },
        ease: "none",
      }
    );
  });
}

document.addEventListener("alpine:init", () => {
  Alpine.store("purchaseForm", {
    isOpen: false,
    list: [],
    addItem(name, quantity) {
      const itemIndex = this.list.findIndex((el) => el.name === name);

      if (itemIndex === -1) {
        this.list.push({
          name,
          quantity: Number(quantity),
        });
      } else {
        this.list[itemIndex].quantity += Number(quantity);
      }
    },
    removeItem(index) {
      this.list.splice(index, 1);
    },
    addQuantity(item) {
      const itemIndex = this.list.findIndex((el) => el.name === item.name);

      if (itemIndex === -1) {
        return;
      }

      this.list[itemIndex].quantity++;
    },
    subtractQuantity(item) {
      const itemIndex = this.list.findIndex((el) => el.name === item.name);

      if (itemIndex === -1) {
        return;
      }

      if (this.list[itemIndex].quantity > 0) {
        this.list[itemIndex].quantity--;
      }
    },
    purchaseListFormatted() {
      return this.list
        .map((item) => `${item.name} (${item.quantity})`)
        .join("; \n");
    },
    totalItems() {
      if (this.list.length === 1) {
        return `${this.list.length} item`;
      } else {
        return `${this.list.length} items`;
      }
    },
  });

  initProteinGallery(Alpine.store("purchaseForm"));
  initPurchaseForm(Alpine.store("purchaseForm"));
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
