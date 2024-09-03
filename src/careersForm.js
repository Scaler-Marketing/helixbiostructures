import { getElementHeightInRem } from "./modules/getHeight";

function initCareersForm() {
  const formWrapper = document.querySelector('.careers-form_wrapper'),
    formScroll = document.querySelector('.section.careers-content');

  if (!formWrapper || !formScroll) {
    return;
  }

  const formCta = formWrapper.querySelector('.careers-form_cta'),
    formCtaHeight = getElementHeightInRem(formCta);
    ctaTrigger = formCta.querySelector('.button'),
    form = formWrapper.querySelector('.careers-form'),
    formClose = formWrapper.querySelector('.careers-form_close'),
    formCloseCircles = formClose.querySelectorAll('circle'),
    formInner = formWrapper.querySelector('.careers-form_inner'),
    backdrop = formWrapper.querySelector('.careers-form_backdrop');
  
  gsap.set(formInner, { height: `${formCtaHeight}rem`, opacity: 0, visibility: "hidden" });
  gsap.set(form, { visibility: "hidden", opacity: 0 });
  gsap.set(backdrop, { opacity: 0, backdropFilter: "blur(0px)" });
  gsap.set(formClose, { visibility: "hidden" });
  gsap.set(formCloseCircles, { opacity: 0 });

  let isFormActive = false;
  
  const tl = gsap.timeline({ paused: true });

  tl.set(form, { visibility: "visible" })
    .to(
      formCta,
      {
        opacity: 0,
        duration: 0.5,
        ease: "expo.inOut",
      },
      0
    )
    .to(
      backdrop,
      {
        display: "block",
        opacity: 1,
        backdropFilter: "blur(24px)",
        duration: 0.5,
        ease: "expo.inOut",
      },
      0
    )
    .to(
      formInner,
      {
        height: "auto",
        duration: 0.5,
        ease: "expo.inOut",
      },
      0
    )
    .to(
      form,
      {
        opacity: 1,
        duration: 0.5,
        ease: "expo.inOut",
      },
      0
    )
    .set(formClose, { visibility: "visible" })
    .to(
      formCloseCircles,
      {
        opacity: 1,
        duration: 0.01,
        stagger: {
          each: 0.05,
          from: "random",
        },
        ease: "expo.inOut",
      },
      0.5
    )
    .set(formCta, { visibility: "hidden" });
  
  ctaTrigger.addEventListener('click', () => {
    tl.play();
    isFormActive = true;
  });

  formClose.addEventListener('click', () => {
    tl.reverse();
    isFormActive = false;
  });

  formClose.addEventListener('mouseover', () => {
    gsap.fromTo(
      formCloseCircles,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.01,
        stagger: {
          each: 0.05,
          from: "random",
        },
        ease: "none",
      }
    );
  });

  // ScrollTrigger to show / hide form

  gsap.timeline({
    scrollTrigger: {
      trigger: formScroll,
      start: "top center",
      end: "bottom center",
      scrub: true,
      pin: false,
      onEnter: () => {
        gsap.to(formInner, {
          visibility: "visible",
          opacity: 1,
          duration: 0.5,
          ease: "expo.inOut",
        });
      },
      onEnterBack: () => {
        gsap.to(formInner, {
          visibility: "visible",
          opacity: 1,
          duration: 0.5,
          ease: "expo.inOut",
        });
      },
      onLeave: () => {
        if (isFormActive) {
          tl.reverse();
        }
        gsap.to(formInner, {
          opacity: 0,
          duration: 0.5,
          ease: "expo.inOut",
          onComplete: () => {
            gsap.set(formInner, { visibility: "hidden" });
          }
        });
      },
      onLeaveBack: () => {
        if (isFormActive) {
          tl.reverse();
        }
        gsap.to(formInner, {
          opacity: 0,
          duration: 0.5,
          ease: "expo.inOut",
          onComplete: () => {
            gsap.set(formInner, { visibility: "hidden" });
          },
        });
      },
    }
  })
}

document.fonts.ready.then(() => {
  initCareersForm();
});
