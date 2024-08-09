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
    video.pause();

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
    const webM = video.querySelector('source[type="video/webm"]');
    const mp4 = video.querySelector('source[type="video/mp4"]');
    let formatFound;
    if (isSafari()) {
      if (webM) {
        webM.remove();
      }
      mp4.src = mp4.dataset.src;
      formatFound = true;
    } else {
      if (mp4) {
        mp4.remove();
      }
      
      webM.src = webM.dataset.src;
      formatFound = true;
    }

    if (formatFound) {
      video.load();
    }
  });
}