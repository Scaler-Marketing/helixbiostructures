export function initButtonStates() {
  const buttons = document.querySelectorAll(".button");

  if (!buttons) {
    return;
  }

  buttons.forEach((button) => {
    const buttonBg = button.querySelector(".button-bg");
    const buttonLabel = button.querySelector('.button-label-inner');
    let buttonLabelChars;

    if (buttonLabel) {
      buttonLabelChars = new SplitType(
        buttonLabel,
        {
          types: "chars",
          tagName: "span",
        }
      );
    }

    gsap.set(buttonBg, { yPercent: 100 });
    button.addEventListener("mouseenter", () => {
      gsap.to(buttonBg, {
        yPercent: 0,
        duration: 0.3,
        ease: "expo.out",
      });
      if (buttonLabel && buttonLabelChars) {
        gsap.to(buttonLabelChars.chars, {
          yPercent: -100,
          stagger: 0.01,
          duration: 0.3,
          ease: "expo.out",
          immediateRender: true,
        });
      }

      const circles = button.querySelectorAll("svg circle");
      if (circles) {
        gsap.fromTo(
          button.querySelectorAll("svg circle"),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.01,
            stagger: {
              from: "random",
              each: 0.1,
            },
          }
        );
      }
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(buttonBg, {
        yPercent: 100,
        duration: 0.3,
        ease: "expo.out",
      });

      if (buttonLabel && buttonLabelChars) {
        gsap.set(buttonLabelChars.chars, { yPercent: 0 });
      }
    });
  });
}
