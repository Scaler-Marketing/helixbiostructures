export function initServicesSlider() {
  if (!document.querySelector(".news-slider")) {
    return;
  }

  const sliders = document.querySelectorAll(".news-slider");

  sliders.forEach((s) => {
    const slider = new Swiper(s, {
      slidesPerView: "auto",
      navigation: {
        nextEl: s.querySelector(".slider-controls .button.next"),
        prevEl: s.querySelector(".slider-controls .button.prev"),
      },
    });

    // gsap logic
    const slides = s.querySelectorAll(".services-card");
    gsap.set(slides, {
      y: "3rem",
      opacity: 0,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: s,
        start: "25% bottom",
        onEnter: () => {
          gsap.to(slides, {
            y: "0rem",
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "expo.out",
          });
        },
      },
    });

    slides.forEach((slide) => {
      const video = slide.querySelector("video");
      video.pause();
      video.currentTime = 0;

      // let previewTimeout = null;

      slide.addEventListener("mouseenter", () => {
        startPreview(video);
        // previewTimeout = setTimeout(() => stopPreview(video), 4000);
      });

      slide.addEventListener("mouseleave", () => {
        // clearTimeout(previewTimeout);
        // previewTimeout = null;
        stopPreview(video);
      });
    });
  });
}

function startPreview(video) {
  video.muted = true;
  video.currentTime = 1;
  video.play();
}

function stopPreview(video) {
  video.currentTime = 0;
  video.pause();
}
