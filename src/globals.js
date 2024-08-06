import { setLoadingStates } from "./modules/setLoadingStates";
import { setStaggerHeading } from "./modules/staggerHeading";
import { setStaggerText } from "./modules/staggerText";
import { initButtonStates } from "./modules/buttonStates";
import { playVideoOnScroll } from "./modules/playVideoOnScroll";
import { initMenus } from "./modules/menus";
import { setImageMasks } from "./modules/setImageMasks";
import { setStaggerElements } from "./modules/staggerElements";

initMenus();
setLoadingStates();
setStaggerHeading();
setStaggerText();
initButtonStates();
playVideoOnScroll();
setImageMasks();
setStaggerElements();