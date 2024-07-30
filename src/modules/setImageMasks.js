export function setImageMasks() {
  const imageMasks = document.querySelectorAll('.image-mask');

  if (!imageMasks) {
    return;
  }

  imageMasks.forEach(el => {
    if (el.classList.contains('diamond')) {
      setDiamondMask(el);
    }
  });
}

function setDiamondMask(el) {
  const start = el.dataset.startPos || "center bottom";
  gsap.set(el, {
    clipPath: "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)",
  });
  gsap.timeline({
    scrollTrigger: {
      trigger: el,
      scrub: true,
      start,
      onEnter: () => {
        gsap.fromTo(
          el,
          {
            clipPath: "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)",
          },
          {
            clipPath: "polygon(100% 0%, 60% 0%, 0% 60%, 0% 100%, 40% 100%, 100% 40%)",
            duration: 1,
            ease: "expo.out",
          }
        );
      },
    },
  });
}