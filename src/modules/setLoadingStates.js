export function setLoadingStates() {
  const loading = document.querySelector(".loading");
  if (!loading) {
    return;
  }

  const squares = loading.querySelectorAll("svg rect");

  gsap.to(squares, {
    opacity: 0,
    duration: 0.01,
    stagger: {
      from: "random",
      each: 0.01,
    },
    ease: "none",
    immediateRender: true,
    onComplete: () => {
      loading.style.display = "none";
    }
  });

  // Loading animation
  const links = document.querySelectorAll("a");
  links.forEach((l) => {
    l.addEventListener("click", (e) => {
      // e.preventDefault();
      const href = l.href;
      const url = new URL(href);

      if (
        window.location.origin === url.origin &&
        window.location.pathname !== url.pathname &&
        l.target !== "_blank"
      ) {
        e.preventDefault();

        loading.style.display = "flex";
        gsap.to(squares, {
          opacity: 1,
          duration: 0.005,
          stagger: {
            from: "random",
            each: 0.005,
          },
          immediateRender: true,
        });

        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }
    });
  });
}
