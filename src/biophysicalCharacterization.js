function initMethodsList() {
  const sections = document.querySelectorAll("[data-bio-char-section]");

  if (!sections) {
    return;
  }

  sections.forEach((section) => {
    const id = section.dataset.bioCharSection;

    if (!id) {
      return;
    }

    const element = document.querySelector(`[data-bio-char-img="${id}"]`);

    if (!element) {
      return;
    }

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      element,
      {
        clipPath:
          "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)",
      },
      {
        clipPath:
          "polygon(100% 0%, 60% 0%, 0% 60%, 0% 100%, 40% 100%, 100% 40%)",
        duration: 1,
        ease: "expo.inOut",
      }
    );

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "25% bottom",
        end: "75% top",
        onEnter: () => {
          tl.play();
        },
        onEnterBack: () => {
          tl.play();
        },
        onLeave: () => {
          tl.reverse();
        },
        onLeaveBack: () => {
          tl.reverse();
        },
      },
    });
  });
}

initMethodsList();