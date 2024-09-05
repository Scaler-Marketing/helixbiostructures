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

initMenus();
setLoadingStates();
initButtonStates();
playVideoOnScroll();
setTransparentVideo();
setImageMasks();
setStaggerElements();
initFormSubmit();
initContactForm();

document.fonts.ready.then(() => {
  setStaggerText();
  setStaggerHeading();
});