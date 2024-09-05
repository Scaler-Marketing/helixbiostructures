export function initContactForm() {
  const formWrapper = document.querySelector('.contact-form_wrapper'),
    formTrigger = document.querySelectorAll('[data-contact-open]');

  if (!formWrapper || !formTrigger) {
    return;
  }

  const form = formWrapper.querySelector('.contact-form_inner'),
    formClose = formWrapper.querySelector('.contact-form_close'),
    formCloseCircles = formClose.querySelectorAll('circle'),
    backdrop = formWrapper.querySelector('.contact-form_backdrop');
  
  // gsap.set(formWrapper, { display: "none" });
  gsap.set(form, { width: 0 });
  gsap.set(backdrop, { opacity: 0, backdropFilter: "blur(0px)" });
  gsap.set(formClose, { visibility: "hidden" });
  gsap.set(formCloseCircles, { opacity: 0 });

  let isFormActive = false;
  
  const tl = gsap.timeline({ paused: true });

  tl.set(formWrapper, { display: "flex" })
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
      form,
      {
        width: "auto",
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
    );
  
  formTrigger.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      tl.play();
    });
  });

  formClose.addEventListener('click', () => {
    tl.reverse();
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
}