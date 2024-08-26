export function setImageMasks() {
  const imageMasks = document.querySelectorAll('.image-mask');

  if (!imageMasks) {
    return;
  }

  imageMasks.forEach(el => {
    if (el.classList.contains('diamond')) {
      setDiamondMask(el);
    }
    if (el.classList.contains('hexagon')) {
      setHexagonMask(el);
    }
    if (el.classList.contains('bubbles')) {
      setBubblesMask(el);
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
      once: true,
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

function setHexagonMask(el) {
  const start = el.dataset.startPos || "center bottom";
  gsap.set(el, {
    clipPath: "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)",
  });
  gsap.timeline({
    scrollTrigger: {
      trigger: el,
      scrub: true,
      start,
      once: true,
      onEnter: () => {
        gsap.fromTo(
          el,
          {
            clipPath:
              "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)",
          },
          {
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            duration: 1,
            ease: "expo.out",
          }
        );
      },
    },
  });
}

function setBubblesMask(el) {
  const start = el.dataset.startPos || "center bottom";
  const mask = el.querySelector(".svg-mask");
  const maskId = "mask-" + Math.random().toString(36).substr(2, 9);

  console.log(mask, mask.querySelector('mask'));

  mask.querySelector('clipPath').id = maskId;
  el.style.clipPath = `url(#${maskId})`;

  const path = mask.querySelector('path');

  gsap.set(path, {
    d: "M1,0.501 C1,0.777,0.776,1,0.5,1 C0.224,1,0,0.777,0,0.501 C0,0.225,0.224,0.001,0.5,0.001 C0.617,0.001,0.725,0.041,0.81,0.109 C0.834,0.126,0.855,0.147,0.874,0.17 C0.953,0.258,1,0.374,1,0.501",
  });
  gsap.timeline({
    scrollTrigger: {
      trigger: el,
      scrub: true,
      start,
      once: true,
      onEnter: () => {
        gsap.fromTo(
          path,
          {
            d: "M1,0.501 C1,0.777,0.776,1,0.5,1 C0.224,1,0,0.777,0,0.501 C0,0.225,0.224,0.001,0.5,0.001 C0.617,0.001,0.725,0.041,0.81,0.109 C0.834,0.126,0.855,0.147,0.874,0.17 C0.953,0.258,1,0.374,1,0.501",
          },
          {
            d: "M0.957,0.212 C0.957,0.299,0.899,0.373,0.814,0.406 C0.826,0.436,0.832,0.468,0.832,0.501 C0.832,0.533,0.826,0.563,0.816,0.592 C0.826,0.59,0.837,0.589,0.847,0.589 C0.932,0.589,1,0.649,1,0.723 C1,0.797,0.932,0.858,0.847,0.858 C0.769,0.858,0.705,0.806,0.696,0.739 C0.64,0.775,0.572,0.796,0.498,0.796 C0.479,0.796,0.46,0.795,0.441,0.792 C0.443,0.802,0.444,0.812,0.444,0.823 C0.444,0.921,0.354,1,0.243,1 C0.131,1,0.041,0.921,0.041,0.823 C0.041,0.735,0.113,0.663,0.207,0.648 C0.179,0.605,0.163,0.555,0.163,0.501 C0.163,0.466,0.171,0.431,0.184,0.399 C0.177,0.4,0.17,0.401,0.163,0.401 C0.073,0.401,0,0.336,0,0.257 C0,0.177,0.073,0.113,0.163,0.113 C0.25,0.113,0.321,0.173,0.326,0.248 C0.37,0.225,0.421,0.21,0.475,0.207 C0.478,0.092,0.585,0,0.716,0 C0.849,0,0.957,0.095,0.957,0.212",
            duration: 0.1,
            stagger: 0.1,
            ease: "expo.out",
          }
        );
      },
    },
  });
}