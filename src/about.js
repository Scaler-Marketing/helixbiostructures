import { setAboutIntroText } from "./about/introText";
import { setTeamMembers } from "./about/teamMembers";

document.fonts.ready.then(() => {
  setAboutIntroText();
  setTeamMembers();
});