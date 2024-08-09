export function playVideoOnScroll() {
  const videos = document.querySelectorAll('video[data-play-onscroll]');

  if (!videos) {
    return;
  }

  videos.forEach((video) => {
    const start = video.dataset.start || 'top bottom';
    const pauseOutside = video.dataset.pauseOutside === 'true';
    const rewind = video.dataset.rewind === 'true';
    const loop = video.dataset.loop === 'true';

    if (loop) {
      video.loop = true;
    }
    
    let settings = {
      trigger: video,
      start: start,
      onEnter: () => {
        video.play();
      }
    };

    if (pauseOutside) {
      settings.onLeave = () => { pauseOrRewind(video, rewind) };
      settings.onLeaveBack = () => { pauseOrRewind(video, rewind) };
      settings.onEnterBack = () => { console.log("play video"); video.play() };
    } else {
      settings.once = true;
    }

    ScrollTrigger.create(settings);
  });
}

function pauseOrRewind(video, rewind) {
  video.pause();
  if (rewind) {
    video.currentTime = 0;
  }
}

// Function to check if the browser is Safari
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function setTransparentVideo() {
  const videos = document.querySelectorAll("video.transparent-video");

  if (!videos) {
    return;
  }

  videos.forEach((video) => {
    if (isSafari()) {
      const webM = video.querySelector('source[format="video/webm"]');

      if (webM) {
        webM.remove();
      }
    } else {
      const mp4 = video.querySelector('source[format="video/mp4"]');

      if (mp4) {
        mp4.remove();
      }

    }
  });
}