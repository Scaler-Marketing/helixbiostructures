function initMethodsList() {
  const triggers = document.querySelectorAll(
    ".bio-char-methods_list .bio-char-method_item"
  );

  if (!triggers) {
    return;
  }

  triggers.forEach((trigger, i) => {
    const id = trigger.dataset.id;
    const img = document.querySelector(`.bio-char-method_bg[data-id="${id}"]`),
      details = trigger.querySelector(".bio-char-method_details");

    gsap.set(details, {
      opacity: 0.3,
      boxShadow: "inset 0 0 0 1px rgba(75,94,234,0)",
    });

    gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "center bottom",
        end: "bottom center",
        scrub: true,
        pin: false,
        markers: false,
        onEnter: () => {
          gsap.to(
            details,
            {
              opacity: 1,
              boxShadow: "inset 0 0 0 1px rgba(75,94,234,1)",
              duration: 1,
              ease: "expo.out"
            }
          );
        },
        onEnterBack: () => {
          gsap.to(
            details,
            {
              opacity: 1,
              boxShadow: "inset 0 0 0 1px rgba(75,94,234,1)",
              duration: 1,
              ease: "expo.out",
            }
          );
        },
        onLeave: () => {
          gsap.to(
            details,
            {
              opacity: 0.3,
              boxShadow: "inset 0 0 0 1px rgba(75,94,234,0)",
              duration: 1,
              ease: "expo.out"
            }
          );
        },
        onLeaveBack: () => {
          gsap.to(
            details,
            {
              opacity: 0.3,
              boxShadow: "inset 0 0 0 1px rgba(75,94,234,0)",
              duration: 1,
              ease: "expo.out"
            }
          );
        },
      },
    });

    if (!img || i === 0) {
      return;
    }

    gsap.set(img, {opacity: 0});

    gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "center bottom",
        end: "bottom center",
        scrub: true,
        pin: false,
        markers: false,
        onEnter: () => {
          gsap.to(img, {
            opacity: 1,
            duration: 1,
            overwrite: "auto",
            immediateRender: true,
            ease: "expo.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(img, {
            opacity: 0,
            duration: 1,
            overwrite: "auto",
            immediateRender: true,
            ease: "expo.out",
          });
        },
      },
    });
  });
}

if (window.innerWidth > 768) {
  initMethodsList();    
}