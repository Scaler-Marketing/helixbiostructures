!function(){let e=document.querySelectorAll("[data-bio-char-section]");e&&e.forEach(e=>{let t=e.dataset.bioCharSection;if(!t)return;let o=document.querySelector(`[data-bio-char-img="${t}"]`);if(!o)return;let r=gsap.timeline({paused:!0});r.fromTo(o,{clipPath:"polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)"},{clipPath:"polygon(100% 0%, 60% 0%, 0% 60%, 0% 100%, 40% 100%, 100% 40%)",duration:1,ease:"expo.inOut"}),gsap.timeline({scrollTrigger:{trigger:e,start:"25% bottom",end:"75% top",onEnter:()=>{r.play()},onEnterBack:()=>{r.play()},onLeave:()=>{r.reverse()},onLeaveBack:()=>{r.reverse()}}})})}();
//# sourceMappingURL=biophysicalCharacterization.js.map