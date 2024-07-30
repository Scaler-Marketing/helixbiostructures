export function initButtonStates() {
  const buttons = document.querySelectorAll(".button");

  if (!buttons) {
    return;
  }

  buttons.forEach((button) => {
    const buttonBg = button.querySelector(".button-bg");
    const buttonLabel = button.querySelector('.button-label-inner');
    const isRounded = button.classList.contains('is-giga');
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

    if (buttonBg) {
      console.log(isRounded);
      if (isRounded) {
        gsap.set(buttonBg, { scale: 0 });
      } else {
        gsap.set(buttonBg, { yPercent: 100 });
      }
    }
    button.addEventListener("mouseenter", () => {
      if (buttonBg) {
        const animation = {
          duration: 0.3,
          ease: "expo.out",
        };

        if (!isRounded) {
          animation.yPercent = 0;
        } else {
          animation.scale = 1;
        }

        gsap.to(buttonBg, animation);
      }
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
      if (buttonBg) {
        const animation = {
          duration: 0.3,
          ease: "expo.out",
        };

        if (!isRounded) {
          animation.yPercent = 100;
        } else {
          animation.scale = 0;
        }

        gsap.to(buttonBg, animation);
      }

      if (buttonLabel && buttonLabelChars) {
        gsap.set(buttonLabelChars.chars, { yPercent: 0 });
      }
    });
  });
}
