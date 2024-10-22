import { getElementHeightInRem } from "./getHeight";

function getStoreItems() {
  const purchaseStore = localStorage.getItem("helix_protein_purchase_list");
  if (purchaseStore) {
    return JSON.parse(purchaseStore);
  } else {
    setStoreItems([]);
    return [];
  }
}

function setStoreItems(list) {
  localStorage.setItem("helix_protein_purchase_list", JSON.stringify(list));
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

export function setProteinStore() {
  document.addEventListener("alpine:init", () => {
    Alpine.store("purchaseForm", {
      isOpen: false,
      list: [],
      init() {
        const list = getStoreItems();
        this.list = list;
      },
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

        setStoreItems(this.list);
      },
      removeItem(index) {
        this.list.splice(index, 1);
        setStoreItems(this.list);
      },
      addQuantity(item) {
        const itemIndex = this.list.findIndex((el) => el.name === item.name);

        if (itemIndex === -1) {
          return;
        }

        this.list[itemIndex].quantity = parseFloat(
          Number(this.list[itemIndex].quantity) + 0.1
        ).toFixed(1);
        setStoreItems(this.list);
      },
      subtractQuantity(item) {
        const itemIndex = this.list.findIndex((el) => el.name === item.name);

        if (itemIndex === -1) {
          return;
        }

        if (this.list[itemIndex].quantity > 0) {
          this.list[itemIndex].quantity = parseFloat(
            Number(this.list[itemIndex].quantity) - 0.1
          ).toFixed(1);
        }
        setStoreItems(this.list);
      },
      purchaseListFormatted() {
        return this.list
          .map((item) => `${item.name} (${item.quantity}mg)`)
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

    initPurchaseForm(Alpine.store("purchaseForm"));
  });
}
