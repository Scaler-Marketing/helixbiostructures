import { initServicesSlider } from "./services/slider";
import { initServicesSectionScroll } from "./services/services";

document.fonts.ready.then(() => {
  initServicesSlider();
  initServicesSectionScroll();
});
