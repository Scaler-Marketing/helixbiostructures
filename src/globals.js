import { setLoadingStates } from "./modules/setLoadingStates";
import { setStaggerHeading } from "./modules/staggerHeading";
import { setStaggerText } from "./modules/staggerText";
import { initButtonStates } from "./modules/buttonStates";
import { playVideoOnScroll, setTransparentVideo } from "./modules/playVideoOnScroll";
import { initMenus } from "./modules/menus";
import { setImageMasks } from "./modules/setImageMasks";
import { setStaggerElements } from "./modules/staggerElements";
import { initFormSubmit } from "./modules/formSubmit";
import { initContactForm } from "./modules/contactForm";
import { setVideosModal } from "./modules/videoModal";
import { setProteinStore } from "./modules/proteinCart";


// wait until DOM is ready (html and svg markup)
document.addEventListener("DOMContentLoaded", function() {
  setLoadingStates();
  initMenus();
  initButtonStates();
  playVideoOnScroll();
  // setTransparentVideo();
  setImageMasks();
  setStaggerElements();
  initFormSubmit();
  initContactForm();
  setVideosModal();
});

setProteinStore();

document.fonts.ready.then(() => {
  setStaggerText();
  setStaggerHeading();
});