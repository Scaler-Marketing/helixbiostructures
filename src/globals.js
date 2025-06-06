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

window.addEventListener("beforeunload", () => {
  // console.log("beforeunload");
  setLoadingStates();
});

window.addEventListener("popstate", () => {
  // console.log("popstate");
  setLoadingStates();
});

document.addEventListener("pageshow", (event) => {
  // console.log("pageshow", event);
  // Check if the page was restored from the bfcache
  if (event.persisted) {
    // Re-run your loading animation
    setLoadingStates();
  }
});

// wait until DOM is ready (html and svg markup)
document.addEventListener("DOMContentLoaded", function() {
  initMenus();
  initButtonStates();
  playVideoOnScroll();
  // setTransparentVideo();
  setImageMasks();
  setStaggerElements();
  initFormSubmit();
  initContactForm();
  setVideosModal();
  setLoadingStates();
});

setProteinStore();

document.fonts.ready.then(() => {
  setStaggerText();
  setStaggerHeading();
});