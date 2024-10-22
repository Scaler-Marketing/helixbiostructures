import { setLinesWrapper } from "../modules/setLinesWrapper";

export function setTeamMembers() {
  const team = document.querySelectorAll('.team-member-item');

  if (!team) {
    return;
  }

  team.forEach((member) => {
    const trigger = member.querySelector(".team-member"),
      modal = member.querySelector(".team-member_modal");
    
    if (!trigger || !modal) {
      return;
    }

    const close = modal.querySelector(".team-member_modal-close"),
      videoThumb = modal.querySelector(".team-member_video-trigger"),
      videoClose = modal.querySelector(".team-member_video-close");

    const tl = setModal(modal);
    const videoTl = setVideoModal(modal);

    let player;
    console.log(
      typeof Vimeo !== "undefined",
      modal.dataset.video,
      isVimeoEmbedUrl(modal.dataset.video)
    );
    if (typeof Vimeo !== "undefined" && isVimeoEmbedUrl(modal.dataset.video)) {
      player = new Vimeo.Player(modal.querySelector("iframe"));
      videoTl.eventCallback("onComplete", () => {
        player.play();
      });
      videoTl.eventCallback("onReverseComplete", () => {
        player.setCurrentTime(0);
      });
    }

    trigger.addEventListener('click', () => openModal(tl));
    close.addEventListener('click', () => closeModal(tl));

    videoThumb.addEventListener("click", () => {
      openModal(videoTl);
    });
    videoClose.addEventListener("click", () => {
      if (player) {
        player.pause();
      }
      closeModal(videoTl);
    });

    const modalCloseCircles = close.querySelectorAll('svg circle'),
      videoCloseCircles = videoClose.querySelectorAll('svg circle');
    
    close.addEventListener('mouseenter', () => {
      gsap.fromTo(modalCloseCircles, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.01,
        stagger: {
          from: "random",
          each: 0.05
        },
        ease: "none"
      })
    });

    videoClose.addEventListener('mouseenter', () => {
      gsap.fromTo(
        videoCloseCircles,
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
    })
  });
}

function setModal(modal) {
  const imgWrapper = modal.querySelector(".team-member_modal-img"),
    contentWrapper = modal.querySelector(".team-member_modal-content"),
    content = contentWrapper.querySelectorAll(".text-rich-text > *"),
    backdrop = modal.querySelector(".team-member_modal-backdrop"),
    videoThumb = modal.querySelector(".team-member_video-trigger")
    modalCloseCircles = modal.querySelectorAll(".team-member_modal-close svg circle");

  gsap.set(imgWrapper, { height: 0 });
  gsap.set(contentWrapper, { height: 0 });
  gsap.set(backdrop, { display: 'none', opacity: 0 });
  gsap.set(modalCloseCircles, { opacity: 0 });
  gsap.set(modal, { visibility: "hidden", backdropFilter: "blur(0px)" });

  if (videoThumb && modal.dataset.video) {
    gsap.set(videoThumb, { clipPath: "inset(50%)" });  
  }

  // Split all words on the brand core section
  content.forEach((l) => {
    const staggerTextEls = new SplitType(l, {
      types: "lines",
      tagName: "span",
    });
  
    setLinesWrapper(staggerTextEls.lines, () => {
      gsap.set(staggerTextEls.lines, { yPercent: 100 });
    });
  })

  const tl = gsap.timeline({paused: true});

  tl
    .set(backdrop, {
      display: "block",
    })
    .to(modal, {
      visibility: "visible",
      backdropFilter: "blur(24px)",
      duration: 0.5,
      // ease: "expo.inOut",
    }, 0)
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
      imgWrapper,
      {
        height: "auto",
        duration: 1,
        ease: "expo.inOut",
      },
      0.1
    )
    .to(
      contentWrapper,
      {
        height: "auto",
        duration: 1,
        ease: "expo.inOut",
      },
      0.2
    )
    .to(
      modalCloseCircles,
      {
        opacity: 1,
        duration: 0.01,
        stagger: {
          from: "random",
          each: 0.05,
        },
        ease: "none",
      },
      0.2
    )
    .to(
      contentWrapper.querySelectorAll(".text-rich-text .line"),
      {
        yPercent: 0,
        // duration: 1,
        stagger: 0.01,
        ease: "expo.inOut",
      },
      0.5
    );
    
  if (videoThumb && modal.dataset.video) {
    tl.to(
      videoThumb,
      {
        clipPath: "inset(0%)",
        duration: 0.5,
        ease: "expo.inOut",
      },
      0.5
    );
  }
  
  return tl;
}

function setVideoModal(modal) {
  const videoEl = modal.querySelector(".team-member_video-el"),
    backdrop = modal.querySelector(".team-member_video-el-backdrop"),
    videoPlayer = modal.querySelector(".team-member_video-el-inner"),
    videoClose = modal.querySelector(".team-member_video-close");

  gsap.set(videoEl, { visibility: "hidden", backdropFilter: "blur(0px)" });
  gsap.set(backdrop, { display: 'none', opacity: 0 });
  gsap.set(videoPlayer, { clipPath: "inset(50%)" });  
  gsap.set(videoClose, { scale: 0 });


  const tl = gsap.timeline({paused: true});

  tl
    .set(backdrop, {
      display: "block",
    })
    .to(videoEl, {
      visibility: "visible",
      backdropFilter: "blur(24px)",
      duration: 0.5,
      // ease: "expo.inOut",
    }, 0)
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

function isVimeoEmbedUrl(url) {
  const vimeoEmbedPattern =
    /^https:\/\/player\.vimeo\.com\/video\/\d+([?#].*)?$/;
  return vimeoEmbedPattern.test(url);
}