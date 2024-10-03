import { setLinesWrapper } from "./modules/setLinesWrapper";

function initBulletLists() {
  const items = document.querySelectorAll(".bullet-list_item");

  if (!items) {
    return;
  }

  items.forEach((item) => {
    const bullet = item.querySelector(".bullet-list_icon"),
      text = item.querySelector(".text-rich-text p");
    
    gsap.set(bullet, { scale: 0 });

    const lines = new SplitType(text, {
      types: "lines",
      tagName: "span",
    });
    setLinesWrapper(lines.lines, () => {
      gsap.set(lines.lines, { yPercent: 100 });
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        scrub: true,
        start: "center bottom",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            bullet,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: "expo.out",
            }
          );
          gsap.fromTo(
            lines.lines,
            { yPercent: 100 },
            {
              yPercent: 0,
              stagger: 0.05,
              ease: "power4.out",
            }
          );
        },
      },
    });
  });
}

document.fonts.ready.then(() => {
  initBulletLists();
});
