import { setStaggerHeading } from "./modules/staggerHeading";
import { setStaggerText } from "./modules/staggerText";
import { initButtonStates } from "./modules/buttonStates";
import { playVideoOnScroll } from "./modules/playVideoOnScroll";
import { initMenus } from "./modules/menus";

initMenus();
setStaggerHeading();
setStaggerText();
initButtonStates();
playVideoOnScroll();