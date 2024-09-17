import { setLinesWrapper } from "./modules/setLinesWrapper";

function initMethodsList() {
  const team = document.querySelectorAll(".bio-char-method-item");

  if (!team) {
    return;
  }

  team.forEach((member) => {
    const trigger = member.querySelector(".bio-char-method"),
      modal = member.querySelector(".bio-char-method_modal");

    if (!trigger || !modal) {
      return;
    }

    const close = modal.querySelector(".bio-char-method_modal-close");
    const tl = setModal(modal);

    trigger.addEventListener("click", () => openModal(tl));
    close.addEventListener("click", () => closeModal(tl));

    const modalCloseCircles = close.querySelectorAll("svg circle");

    close.addEventListener("mouseenter", () => {
      gsap.fromTo(
        modalCloseCircles,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.01,
          stagger: {
            from: "random",
            each: 0.05,
          },
          ease: "none",
        }
      );
    });
  });
}

function setModal(modal) {
  const imgWrapper = modal.querySelector(".bio-char-method_modal-img"),
    contentWrapper = modal.querySelector(".bio-char-method_modal-content"),
    // content = contentWrapper.querySelectorAll(
    //   ".bio-char-method_content h3, .bio-char-method_content p"
    // ),
    backdrop = modal.querySelector(".bio-char-method_modal-backdrop");
  modalCloseCircles = modal.querySelectorAll(
    ".bio-char-method_modal-close svg circle"
  );

  gsap.set(imgWrapper, { height: 0 });
  gsap.set(contentWrapper, { height: 0 });
  gsap.set(backdrop, { display: "none", opacity: 0 });
  gsap.set(modalCloseCircles, { opacity: 0 });
  gsap.set(modal, { visibility: "hidden", backdropFilter: "blur(0px)" });

  // // Split all words on the brand core section
  // content.forEach((l) => {
  //   const staggerTextEls = new SplitType(l, {
  //     types: "lines",
  //     tagName: "span",
  //   });

  //   setLinesWrapper(staggerTextEls.lines, () => {
  //     gsap.set(staggerTextEls.lines, { yPercent: 100 });
  //   });
  // });

  const tl = gsap.timeline({ paused: true });

  tl.set(backdrop, {
    display: "block",
  })
    .to(
      modal,
      {
        visibility: "visible",
        backdropFilter: "blur(24px)",
        duration: 0.5,
        // ease: "expo.inOut",
      },
      0
    )
    .to(
      backdrop,
      {
        opacity: 0.8,
        duration: 0.5,
        ease: "expo.inOut",
      },
      0
    )
    .to(
      imgWrapper,
      {
        height: "auto",
        duration: 1,
        ease: "expo.inOut",
      },
      0.1
    )
    .to(
      contentWrapper,
      {
        height: "auto",
        duration: 1,
        ease: "expo.inOut",
      },
      0.2
    )
    .to(
      modalCloseCircles,
      {
        opacity: 1,
        duration: 0.01,
        stagger: {
          from: "random",
          each: 0.05,
        },
        ease: "none",
      },
      0.2
    );
    // .to(
    //   contentWrapper.querySelectorAll(".bio-char-method_content .line"),
    //   {
    //     yPercent: 0,
    //     // duration: 1,
    //     stagger: 0.01,
    //     ease: "expo.inOut",
    //   },
    //   0.5
    // );
  return tl;
}

async function openModal(tl) {
  tl.play();
}

function closeModal(tl) {
  tl.reverse();
}

initMethodsList();