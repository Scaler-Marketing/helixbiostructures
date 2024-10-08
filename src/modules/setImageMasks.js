export function setImageMasks() {
  const imageMasks = document.querySelectorAll("[image-mask]");

  if (!imageMasks) {
    return;
  }

  imageMasks.forEach((el) => {
    const type = el.getAttribute("image-mask");
    if (type === "diamond") {
      setDiamondMask(el);
    }
    if (type === "hexagon") {
      setHexagonMask(el);
    }
    if (type === "bubbles") {
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
            clipPath:
              "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)",
          },
          {
            clipPath:
              "polygon(100% 0%, 60% 0%, 0% 60%, 0% 100%, 40% 100%, 100% 40%)",
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

  console.log(mask, mask.querySelector("mask"));

  mask.querySelector("clipPath").id = maskId;
  el.style.clipPath = `url(#${maskId})`;

  const path = mask.querySelector("path");

  gsap.set(path, {
    d: "M1,0.5 C1,0.557,0.991,0.611,0.973,0.662 C0.966,0.683,0.957,0.704,0.947,0.724 C0.928,0.763,0.903,0.799,0.874,0.831 C0.842,0.868,0.804,0.9,0.761,0.926 C0.727,0.948,0.689,0.965,0.65,0.977 C0.602,0.992,0.552,1,0.5,1 C0.462,1,0.425,0.996,0.389,0.988 C0.376,0.985,0.363,0.981,0.35,0.977 C0.311,0.965,0.273,0.948,0.239,0.926 C0.187,0.895,0.142,0.854,0.105,0.807 C0.072,0.764,0.045,0.715,0.027,0.662 C0.009,0.611,0,0.557,0,0.5 C0,0.46,0.005,0.42,0.014,0.382 C0.018,0.367,0.022,0.352,0.027,0.338 C0.048,0.275,0.082,0.217,0.126,0.169 C0.158,0.132,0.196,0.1,0.239,0.074 C0.255,0.064,0.272,0.055,0.289,0.047 C0.353,0.017,0.425,0,0.5,0 C0.535,0,0.57,0.004,0.603,0.011 C0.68,0.027,0.75,0.06,0.81,0.107 C0.834,0.125,0.855,0.146,0.874,0.169 C0.918,0.217,0.952,0.275,0.973,0.338 C0.985,0.373,0.993,0.41,0.997,0.449 C0.999,0.466,1,0.483,1,0.5",
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
            morphSVG: {
              shape:
                "M1,0.5 C1,0.557,0.991,0.611,0.973,0.662 C0.966,0.683,0.957,0.704,0.947,0.724 C0.928,0.763,0.903,0.799,0.874,0.831 C0.842,0.868,0.804,0.9,0.761,0.926 C0.727,0.948,0.689,0.965,0.65,0.977 C0.602,0.992,0.552,1,0.5,1 C0.462,1,0.425,0.996,0.389,0.988 C0.376,0.985,0.363,0.981,0.35,0.977 C0.311,0.965,0.273,0.948,0.239,0.926 C0.187,0.895,0.142,0.854,0.105,0.807 C0.072,0.764,0.045,0.715,0.027,0.662 C0.009,0.611,0,0.557,0,0.5 C0,0.46,0.005,0.42,0.014,0.382 C0.018,0.367,0.022,0.352,0.027,0.338 C0.048,0.275,0.082,0.217,0.126,0.169 C0.158,0.132,0.196,0.1,0.239,0.074 C0.255,0.064,0.272,0.055,0.289,0.047 C0.353,0.017,0.425,0,0.5,0 C0.535,0,0.57,0.004,0.603,0.011 C0.68,0.027,0.75,0.06,0.81,0.107 C0.834,0.125,0.855,0.146,0.874,0.169 C0.918,0.217,0.952,0.275,0.973,0.338 C0.985,0.373,0.993,0.41,0.997,0.449 C0.999,0.466,1,0.483,1,0.5",
              type: "rotational",
            },
          },
          {
            morphSVG: {
              shape:
                "M1,0.212 C1,0.314,0.928,0.399,0.832,0.42 C0.838,0.446,0.842,0.473,0.842,0.501 C0.842,0.533,0.837,0.564,0.829,0.593 C0.841,0.59,0.853,0.588,0.866,0.588 C0.94,0.588,1,0.648,1,0.722 C1,0.796,0.94,0.856,0.866,0.856 C0.801,0.856,0.747,0.811,0.735,0.75 C0.673,0.809,0.59,0.844,0.499,0.844 C0.447,0.844,0.398,0.833,0.354,0.812 C0.354,0.816,0.354,0.819,0.354,0.823 C0.354,0.921,0.275,1,0.177,1 C0.079,1,0,0.921,0,0.823 C0,0.725,0.079,0.646,0.177,0.646 C0.181,0.646,0.185,0.646,0.189,0.646 C0.169,0.602,0.157,0.553,0.157,0.501 C0.157,0.465,0.163,0.43,0.173,0.397 C0.163,0.399,0.154,0.4,0.144,0.4 C0.064,0.4,0,0.336,0,0.256 C0,0.177,0.064,0.113,0.144,0.113 C0.215,0.113,0.274,0.165,0.285,0.233 C0.344,0.185,0.418,0.157,0.499,0.157 C0.527,0.157,0.555,0.16,0.581,0.167 C0.601,0.071,0.686,0,0.788,0 C0.905,0,1,0.095,1,0.212",
              type: "rotational",
            },
            duration: 0.5,
            // ease: "expo.out",
          }
        );
      },
    },
  });
}
