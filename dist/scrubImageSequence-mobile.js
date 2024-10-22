(() => {
    let scrubWrappers = gsap.utils.toArray("[scrub-wrapper]"),
        clientWidth = document.documentElement.clientWidth,
        windowHeight = window.innerHeight,
        frameCounter = 0,
        totalFrames = 0;

    function processScrubWrappers() {
        scrubWrappers.forEach(function(wrapper) {
            let prefix = wrapper.dataset.prefix || null,
                suffix = wrapper.dataset.suffix || null,
                frameCount = wrapper.dataset.framecount || 0,
                canvas = wrapper.querySelector("canvas");

            if (canvas && prefix && suffix && frameCount) {
                frameCounter += Number(frameCount);
                totalFrames += Number(frameCount);

                // Always load the mobile frames, regardless of screen size
                loadImages(wrapper, canvas, prefix, suffix, frameCount, "mobile");
            }
        });
    }

    function loadImages(wrapper, canvas, prefix, suffix, frameCount, deviceType) {
        let context = canvas.getContext("2d");
        canvas.width = clientWidth;
        canvas.height = windowHeight;

        let images = [];
        for (let i = 0; i < frameCount; i++) {
            let img = new Image(),
                imgPath = `${prefix}${deviceType}/${(i + 1).toString().padStart(3, "0")}${suffix}`;

            img.onload = function() {
                imageLoaded(imgPath);
                if (frameCounter === totalFrames - 1) {
                    initializeScrollTrigger(wrapper, images, context, canvas);
                }
            };

            img.onerror = function() {
                imageLoaded(imgPath);
            };

            img.src = imgPath;
            images.push(img);
        }
    }

    function imageLoaded(imgPath) {
        if (--frameCounter === 0) {
            setTimeout(function() {
                lenis.resize();
            }, 500);
        }
    }

    function renderImage(images, frame, context, canvas) {
        let img = images[frame.frame];
        context.clearRect(0, 0, canvas.width, canvas.height);

        let scale = Math.max(canvas.width / img.width, canvas.height / img.height),
            imgWidth = img.width * scale,
            imgHeight = img.height * scale,
            offsetX = (canvas.width / 2) - (imgWidth / 2),
            offsetY = (canvas.height / 2) - (imgHeight / 2);

        context.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
    }

    function initializeScrollTrigger(wrapper, images, context, canvas) {
        let frameData = { frame: 0 };

        wrapper.querySelectorAll("[frames-play]").forEach(function(trigger) {
            let startFrame = Number(trigger.dataset.start),
                endFrame = Number(trigger.dataset.end),
                startPos = trigger.dataset.startPos || "top top",
                endPos = trigger.dataset.endPos || "bottom bottom",
                scrollData = { frame: 0 };

            gsap.timeline({
                onUpdate: function() {
                    renderImage(images, scrollData, context, canvas);
                },
                scrollTrigger: {
                    trigger: trigger,
                    pin: false,
                    scrub: 1,
                    start: startPos,
                    end: endPos,
                    markers: false
                }
            }).fromTo(scrollData, { frame: startFrame - 1 }, {
                frame: endFrame - 1,
                snap: "frame",
                ease: "none",
                duration: 1
            }, 0);
        });

        renderImage(images, frameData, context, canvas);

        window.addEventListener("resize", function() {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = window.innerHeight;
            renderImage(images, frameData, context, canvas);
        });
    }

    // Process scrub wrappers for both desktop and mobile breakpoints
    processScrubWrappers();
})();