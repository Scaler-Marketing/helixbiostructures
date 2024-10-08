function initMethodsList() {
  const triggers = document.querySelectorAll(
    ".bio-char-methods_list .bio-char-method_item"
  );

  if (!triggers) {
    return;
  }

  console.log(triggers);

  triggers.forEach((trigger, i) => {
    const id = trigger.dataset.id;
    const img = document.querySelector(`.bio-char-method_bg[data-id="${id}"]`);
    console.log(trigger, id);

    if (!img || i === 0) {
      return;
    }
    console.log(img);

    gsap.fromTo(img, {
      opacity: 0
    }, {
      opacity: 1,
      scrollTrigger: {
        trigger,
        start: "bottom bottom",
        end: "center center",
        scrub: true,
        pin: false,
        markers: false,
      }
    });
  });
}

initMethodsList();