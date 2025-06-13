export function setVideosModal() {
  const items = document.querySelectorAll(".video-player-full");

  if (!items) {
    return;
  }

  items.forEach((item) => {
    const trigger = item.querySelector(".video-player-full_trigger"),
      modal = item.querySelector(".video-player-full_modal");

    if (!trigger || !modal) {
      return;
    }

    const close = modal.querySelector(".video-player-full_modal-close");
    const tl = setVideoModal(modal);

    let player;
    if (typeof Vimeo !== "undefined") {
      player = new Vimeo.Player(modal.querySelector('iframe'));
      tl.eventCallback("onComplete", () => {
        player.play();
      });
      tl.eventCallback("onReverseComplete", () => {
        player.setCurrentTime(0);
      });
    }
    
    trigger.addEventListener("click", () => {
      openModal(tl)
    });
    close.addEventListener("click", () => {
      if (player) {
        player.pause();
      }
      closeModal(tl)
    });

    const modalCloseCircles = close.querySelectorAll("svg circle");

    close.addEventListener("mouseenter", () => {
      gsap.fromTo(
        modalCloseCircles,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.01,
          stagger: {
            from: "random",
            each: 0.05,
          },
          ease: "none",
        }
      );
    });

  });
}

function setVideoModal(modal) {
  const videoPlayer = modal.querySelector(".video-player-full_video");
  const videoClose = modal.querySelector(".video-player-full_modal-close");
  const backdrop = modal.querySelector(".video-player-full_modal-backdrop");

  gsap.set(modal, { visibility: "hidden", backdropFilter: "blur(0px)" });
  gsap.set(videoClose, { scale: 0 });
  gsap.set(videoPlayer, { clipPath: "inset(50%)" });

  const tl = gsap.timeline({ paused: true });

  tl.set(backdrop, {
    display: "block",
  })
    .to(
      modal,
      {
        visibility: "visible",
        backdropFilter: "blur(24px)",
        duration: 0.5,
        // ease: "expo.inOut",
      },
      0
    )
    .to(
      backdrop,
      {
        opacity: 0.8,
        duration: 0.5,
        ease: "expo.inOut",
      },
      0
    )
    .to(
      videoPlayer,
      {
        clipPath: "inset(0%)",
        duration: 1,
        ease: "expo.inOut",
      },
      0.2
    )
    .to(
      videoClose,
      {
        scale: 1,
        duration: 0.5,
        ease: "expo.inOut",
      },
      0.4
    );

  return tl;
}

async function openModal(tl) {
  tl.play();
}

function closeModal(tl) {
  tl.reverse();
}
