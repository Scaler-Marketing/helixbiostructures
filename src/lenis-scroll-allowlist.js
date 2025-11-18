/**
 * lenis-scroll-allowlist.js
 *
 * Drop this script into your Webflow project (e.g. inside an Embed or custom code block)
 * after Lenis has been initialized. Once loaded, call:
 *
 *   window.enableLenisScrollZones(['modalPanel', 'sidebarDrawer'], { lenis });
 *
 * Any element ids you pass in will gain native scrolling without fighting Lenis'
 * smooth scrolling, so users can scroll inside modals/drawers without needing to
 * click elsewhere first. Add more ids to the array any time you need.
 */
(function registerLenisScrollAllowlist(global) {
  const DEFAULT_OPTIONS = {
    lenis: global.lenis || null,
    pauseLenis: true,
    allowWheel: true,
    allowTouch: true,
    warnOnMissing: true,
  };

  const PRESET_SCROLL_ZONE_IDS = global.LENIS_SCROLL_ZONE_IDS ||
    global.LenisScrollAllowlistConfig?.ids || ["sliding-contact-form"];
  const AUTO_INIT_ENABLED = global.LenisScrollAllowlistConfig?.autoInit ?? true;

  function markScrollableZones(ids = [], options = {}) {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    if (!Array.isArray(ids) || ids.length === 0) {
      console.warn("[lenis-scroll-allowlist] Please pass an array of ids");
      return () => {};
    }

    const attachedListeners = [];

    ids.forEach((id) => {
      const el =
        typeof id === "string" ? global.document?.getElementById(id) : id;
      if (!el) {
        if (opts.warnOnMissing) {
          console.warn(
            `[lenis-scroll-allowlist] Element with id "${id}" not found`
          );
        }
        return;
      }

      el.setAttribute("data-lenis-prevent", "");
      if (opts.allowWheel) {
        el.setAttribute("data-lenis-prevent-wheel", "");
      }
      if (opts.allowTouch) {
        el.setAttribute("data-lenis-prevent-touch", "");
      }

      if (
        opts.pauseLenis &&
        opts.lenis &&
        typeof opts.lenis.stop === "function"
      ) {
        let hoverDepth = 0;

        const handleEnter = () => {
          hoverDepth += 1;
          opts.lenis.stop();
        };

        const handleLeave = () => {
          hoverDepth = Math.max(hoverDepth - 1, 0);
          if (hoverDepth === 0 && typeof opts.lenis.start === "function") {
            opts.lenis.start();
          }
        };

        el.addEventListener("pointerenter", handleEnter);
        el.addEventListener("pointerleave", handleLeave);
        el.addEventListener("focusin", handleEnter);
        el.addEventListener("focusout", handleLeave);

        attachedListeners.push({
          element: el,
          handlers: [
            ["pointerenter", handleEnter],
            ["pointerleave", handleLeave],
            ["focusin", handleEnter],
            ["focusout", handleLeave],
          ],
        });
      }
    });

    return function cleanup() {
      attachedListeners.forEach(({ element, handlers }) => {
        handlers.forEach(([event, handler]) => {
          element.removeEventListener(event, handler);
        });
      });
    };
  }

  global.enableLenisScrollZones = markScrollableZones;

  function autoInitPresetZones() {
    if (
      !AUTO_INIT_ENABLED ||
      !Array.isArray(PRESET_SCROLL_ZONE_IDS) ||
      PRESET_SCROLL_ZONE_IDS.length === 0
    ) {
      return;
    }

    const presetOptions = {
      ...(global.LenisScrollAllowlistConfig?.options || {}),
      lenis:
        global.LenisScrollAllowlistConfig?.lenis ||
        DEFAULT_OPTIONS.lenis ||
        global.lenis ||
        null,
    };

    markScrollableZones(PRESET_SCROLL_ZONE_IDS, presetOptions);
  }

  if (global.document) {
    if (global.document.readyState === "loading") {
      global.document.addEventListener(
        "DOMContentLoaded",
        autoInitPresetZones,
        {
          once: true,
        }
      );
    } else {
      autoInitPresetZones();
    }
  } else {
    autoInitPresetZones();
  }
})(typeof window !== "undefined" ? window : globalThis);
