var e,r,t,n,o;r={},t={},null==(n=(e=globalThis).parcelRequire5744)&&((n=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,n.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){t[e]=r},e.parcelRequire5744=n),(0,n.register)("2rxJM",function(e,r){function t(e,r){e.forEach(e=>{let r=document.createElement("span");r.classList.add("line-wrapper"),e.parentNode.insertBefore(r,e),r.appendChild(e)}),"function"==typeof r&&r()}Object.defineProperty(e.exports,"setLinesWrapper",{get:()=>t,set:void 0,enumerable:!0,configurable:!0})}),o=n("2rxJM"),document.fonts.ready.then(()=>{!function(){let e=document.querySelectorAll(".intro-sequence .sticky-wrapper");e.forEach((r,t)=>{!function(e,r,t){let n=r===t-1,i=new SplitType(e.querySelectorAll(".intro-text"),{types:n?"words":"lines",tagName:"span"});(0,o.setLinesWrapper)(n?i.words:i.lines,()=>{n?gsap.set(".intro-text .word",{yPercent:100}):gsap.set(".intro-text .line",{yPercent:100})});let s=n?i.words:i.lines;gsap.fromTo(s,{yPercent:100},{yPercent:0,stagger:.1,scrollTrigger:{trigger:e,scrub:!0,start:"top top",end:"30% top",pin:!1}}),n||gsap.fromTo(s,{yPercent:0},{yPercent:-100,stagger:.1,immediateRender:!1,scrollTrigger:{trigger:e,scrub:!0,start:"80% bottom",end:"bottom bottom",pin:!1}})}(r,t,e.length)})}()});
//# sourceMappingURL=about.js.map