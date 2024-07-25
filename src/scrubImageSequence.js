// Scrub animation ================================================ //
const sections = gsap.utils.toArray("[scrub-wrapper]");
const width = document.documentElement.clientWidth;
const height = window.innerHeight;

var mm = gsap.matchMedia();

// Image sequence play on scroll =====================================//

var allImagesCount = 0;
var totalCount = 0;

// Initialize for each section
function initSections() {
  sections.forEach(function (section) {
    var prefix = section.dataset.prefix || null;
    var suffix = section.dataset.suffix || null;
    var frames = section.dataset.framecount || 0;
    var canvas = section.querySelector("canvas");
    if (!canvas || !prefix || !suffix || !frames) {
      return;
    }

    var device = width >= 768 ? "desktop" : "mobile";

    allImagesCount += Number(frames);
    totalCount += Number(frames);
    initCanvas(section, canvas, prefix, suffix, frames, device);
  });
}

mm.add("(min-width: 768px)", () => {
  // desktop
  initSections();
});

mm.add("(max-width: 767px)", () => {
  // mobile
  initSections();
});

//var $loadingNum = $('.loading-number');
//var $loadingProgress = $('.loading-number-progress');
function updateImageSequenceCount(file) {
  allImagesCount--;

  var updatedPercent = 100 - Math.round((allImagesCount * 100) / totalCount);
  //$loadingNum.text(updatedPercent + '%');
  //$loadingProgress.css('transform', 'translate3d(' + updatedPercent +'%, 0,0)');
  // console.log(updatedPercent);

  if (allImagesCount === 0) {
    //$('.loading-disable').click();
    setTimeout(function () {
      lenis.resize();
    }, 500);
  }
}

// Initialize animation on canvas for each section. This loads
// the image sequence and make sure to load the right image based
// on scroll position.
function initCanvas(section, canvas, prefix, suffix, frames, device) {
  var context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  var frameCount = frames;
  var currentFrame = function (index) {
    return `${prefix}${device}/${(index + 1)
      .toString()
      .padStart(3, "0")}${suffix}`;
  };

  var images = [];
  // loads all images for this sequence and checks if we loaded everything
  // for this page.
  for (var i = 0; i < frameCount; i++) {
    var img = new Image();
    var imgSrc = currentFrame(i);

    img.onload = function () {
      updateImageSequenceCount(imgSrc);
      if (allImagesCount === 0) {
        initCanvasAnimations(section, images, context, canvas);
      }
    };
    img.onerror = function () {
      updateImageSequenceCount(imgSrc);
    };
    img.src = imgSrc;
    images.push(img);
  }
}

function initCanvasAnimations(section, images, context, canvas) {
  var sequence = {
    frame: 0,
  };

  var blocks = section.querySelectorAll("[frames-play]");

  blocks.forEach(function (block) {
    var start = Number(block.dataset.start),
      end = Number(block.dataset.end),
      posStart = block.dataset.startPos || "top top",
      posEnd = block.dataset.endPos || "bottom bottom";

    var blockSequence = {
      frame: 0,
    };

    // Initializes timeline for scroll animation.
    gsap
      .timeline({
        onUpdate: function () {
          render(images, blockSequence, context, canvas);
        },
        scrollTrigger: {
          trigger: block,
          pin: false,
          scrub: 1,
          start: posStart,
          end: posEnd,
          markers: false,
        },
      })
      .fromTo(
        blockSequence,
        {
          frame: start - 1,
        },
        {
          frame: end - 1,
          snap: "frame",
          ease: "none",
          duration: 1,
        },
        0
      );
  });

  render(images, sequence, context, canvas);

  window.addEventListener("resize", function () {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = window.innerHeight;
    render(images, sequence, context, canvas);
  });
}

// Makes sure that the canvas is responsive, and updates the current
// painted image depending on the scroll position.
function render(images, sequence, context, canvas) {
  var img = images[sequence.frame];
  // console.log(sequence.frame);
  context.clearRect(0, 0, canvas.width, canvas.height);

  var loadedImageWidth = img.width;
  var loadedImageHeight = img.height;

  // get the scale
  // it is the min of the 2 ratios
  var scaleFactor = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  // Finding the new width and height based on the scale factor
  var newWidth = img.width * scaleFactor;
  var newHeight = img.height * scaleFactor;

  //console.log(img.width, img.height, scaleFactor, newWidth, newHeight);

  // get the top left position of the image
  // in order to center the image within the canvas
  var x = canvas.width / 2 - newWidth / 2;
  var y = canvas.height / 2 - newHeight / 2;

  // When drawing the image, we have to scale down the image
  // width and height in order to fit within the canvas
  context.drawImage(img, x, y, newWidth, newHeight);
}
