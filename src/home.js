import { setHomeIntroText } from "./home/homeIntroText";
import { initSectionScroll } from "./home/services";
import { initNewsSlider } from "./home/newsSlider";

document.fonts.ready.then(() => {
  setHomeIntroText();
  initSectionScroll();
});
initNewsSlider();