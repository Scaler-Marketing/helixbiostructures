// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7vXoQ":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "7381faf90d8ce6f6";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"9qcUd":[function(require,module,exports) {
var _setLoadingStates = require("./modules/setLoadingStates");
var _staggerHeading = require("./modules/staggerHeading");
var _staggerText = require("./modules/staggerText");
var _buttonStates = require("./modules/buttonStates");
var _playVideoOnScroll = require("./modules/playVideoOnScroll");
var _menus = require("./modules/menus");
var _setImageMasks = require("./modules/setImageMasks");
var _staggerElements = require("./modules/staggerElements");
(0, _menus.initMenus)();
(0, _setLoadingStates.setLoadingStates)();
(0, _buttonStates.initButtonStates)();
(0, _playVideoOnScroll.playVideoOnScroll)();
(0, _playVideoOnScroll.setTransparentVideo)();
(0, _setImageMasks.setImageMasks)();
(0, _staggerElements.setStaggerElements)();
document.fonts.ready.then(()=>{
    (0, _staggerText.setStaggerText)();
    (0, _staggerHeading.setStaggerHeading)();
});

},{"./modules/setLoadingStates":"10fje","./modules/staggerHeading":"kL2X7","./modules/staggerText":"h1EYx","./modules/buttonStates":"lezKo","./modules/playVideoOnScroll":"gWHEb","./modules/menus":"drhda","./modules/setImageMasks":"4hIA7","./modules/staggerElements":"aJF8f"}],"10fje":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setLoadingStates", ()=>setLoadingStates);
function setLoadingStates() {
    const loading = document.querySelector(".loading");
    if (!loading) return;
    const squares = loading.querySelectorAll("svg rect");
    gsap.to(squares, {
        opacity: 0,
        duration: 0.01,
        stagger: {
            from: "random",
            each: 0.01
        },
        ease: "none",
        immediateRender: true,
        onComplete: ()=>{
            loading.style.display = "none";
        }
    });
    // Loading animation
    const links = document.querySelectorAll("a");
    links.forEach((l)=>{
        l.addEventListener("click", (e)=>{
            e.preventDefault();
            const href = l.href;
            const url = new URL(href);
            if (window.location.origin === url.origin && window.location.pathname !== url.pathname) {
                e.preventDefault();
                loading.style.display = "flex";
                gsap.to(squares, {
                    opacity: 1,
                    duration: 0.005,
                    stagger: {
                        from: "random",
                        each: 0.005
                    },
                    immediateRender: true
                });
                setTimeout(()=>{
                    window.location.href = href;
                }, 500);
            }
        });
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"kL2X7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setStaggerHeading", ()=>setStaggerHeading);
var _createSVGGrid = require("./createSVGGrid");
// Link timelines to scroll position
function createScrollTrigger(triggerElement, start, end, delay, withScroll) {
    const squares = triggerElement.querySelectorAll("rect");
    gsap.set(squares, {
        opacity: 0
    });
    const trigger = {
        trigger: triggerElement,
        scrub: true,
        start
    };
    if (!withScroll) {
        trigger.onEnter = ()=>{
            gsap.to(squares, {
                opacity: 1,
                delay: delay,
                duration: 0.01,
                stagger: {
                    each: 0.01,
                    from: "random"
                },
                ease: "bounce.out"
            });
        };
        gsap.timeline({
            scrollTrigger: trigger
        });
    } else {
        trigger.end = end;
        gsap.timeline({
            scrollTrigger: trigger
        }).to(squares, {
            opacity: 1,
            duration: 0.01,
            stagger: {
                each: 0.01,
                from: "random"
            },
            ease: "none"
        });
    }
}
function setStaggerHeading() {
    const blocks = document.querySelectorAll("[stagger-heading]");
    blocks.forEach((el)=>{
        const maskEl = (0, _createSVGGrid.createSVGGrid)(el, 10);
        el.classList.add("init");
        const startVal = el.dataset.startPos || "center bottom", endVal = el.dataset.endPos || "bottom center", delay = el.dataset.delay || 0, withScrollTrigger = el.dataset.withScroll || false;
        createScrollTrigger(maskEl, startVal, endVal, delay, withScrollTrigger);
    });
}

},{"./createSVGGrid":"8Spds","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8Spds":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createSVGGrid", ()=>createSVGGrid);
function createSVGGrid(container, squaresPerRow, fill, onlyEmbed) {
    if (!container) {
        console.error("Container not found");
        return;
    }
    // Get the container's dimensions
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const responsiveSquares = window.innerWidth <= 991 ? squaresPerRow / 2 : squaresPerRow;
    // Calculate the size of each square
    const squareSize = parseInt(containerWidth / responsiveSquares);
    // Calculate the number of squares per column
    const squaresPerColumn = Math.ceil(containerHeight / squareSize);
    // Create a unique ID for the mask
    const maskId = "mask-" + Math.random().toString(36).substr(2, 9);
    if (!onlyEmbed) {
        // Create SVG content
        let svgContent = `
                <svg viewBox="0 0 ${containerWidth} ${containerHeight}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                    <defs>
                        <mask id="${maskId}">
                            ${Array.from({
            length: squaresPerColumn
        }).map((_, row)=>Array.from({
                length: responsiveSquares
            }).map((_, col)=>{
                const x = col * squareSize;
                const y = row * squareSize;
                return `<rect x="${x}" y="${y}" width="${squareSize + 1}" height="${squareSize + 1}" fill="${fill ? fill : "#000000"}"/>`;
            }).join("")).join("")}
                        </mask>
                    </defs>
                </svg>`;
        // Create wrapper for the SVG and mask
        const maskContainer = document.createElement("div");
        maskContainer.className = "mask-container";
        maskContainer.style.maskImage = `url(#${maskId})`;
        // Append SVG to maskContainer
        maskContainer.innerHTML = svgContent;
        container.parentNode.insertBefore(maskContainer, container);
        maskContainer.appendChild(container);
        return maskContainer.querySelector("svg");
    } else {
        // Create SVG content
        let svgContent = `
                <svg viewBox="0 0 ${containerWidth} ${containerHeight}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                            ${Array.from({
            length: squaresPerColumn
        }).map((_, row)=>Array.from({
                length: squaresPerRow
            }).map((_, col)=>{
                const x = col * squareSize;
                const y = row * squareSize;
                return `<rect x="${x}" y="${y}" width="${squareSize + 1}" height="${squareSize + 1}" fill="${fill ? fill : "#000000"}"/>`;
            }).join("")).join("")}
                </svg>`;
        container.insertAdjacentHTML("beforeend", svgContent);
        return svgContent;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h1EYx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setStaggerText", ()=>setStaggerText);
var _setLinesWrapper = require("./setLinesWrapper");
// Link timelines to scroll position
function createScrollTrigger(triggerElement, elements, start, end, stagger, delay, withScroll) {
    const trigger = {
        trigger: triggerElement,
        scrub: true,
        start
    };
    if (!withScroll) {
        trigger.onEnter = ()=>{
            gsap.to(elements, {
                yPercent: 0,
                stagger: stagger,
                ease: "power4.out",
                delay: Number(delay)
            });
        };
        gsap.timeline({
            scrollTrigger: trigger
        });
    } else {
        trigger.end = end;
        gsap.timeline({
            scrollTrigger: trigger
        }).to(words, {
            yPercent: 0,
            stagger: stagger,
            ease: "none"
        });
    }
}
function setStaggerText() {
    // Split all words on the brand core section
    const staggerTextEls = new SplitType("[stagger-text]", {
        types: "lines",
        tagName: "span"
    });
    (0, _setLinesWrapper.setLinesWrapper)(staggerTextEls.lines, ()=>{
        gsap.set("[stagger-text] .line", {
            yPercent: 100
        });
    });
    const textBlocks = document.querySelectorAll("[stagger-text]");
    textBlocks.forEach((el)=>{
        el.classList.add("init");
        const words1 = el.querySelectorAll(".line"), startVal = el.dataset.startPos || "center bottom", endVal = el.dataset.endPos || "bottom center", stagger = el.dataset.stagger || 0.05, delay = el.dataset.delay || 0, withScrollTrigger = el.dataset.withScroll || false;
        // let tl = gsap.timeline({ paused: true });
        createScrollTrigger(el, words1, startVal, endVal, stagger, delay, withScrollTrigger);
    });
}

},{"./setLinesWrapper":"hPUmk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hPUmk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setLinesWrapper", ()=>setLinesWrapper);
function setLinesWrapper(lines, callback) {
    // Wrap each line in a .line-wrapper span
    lines.forEach((line)=>{
        const wrapper = document.createElement("span");
        wrapper.classList.add("line-wrapper");
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
    });
    if (typeof callback === "function") callback();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lezKo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initButtonStates", ()=>initButtonStates);
function initButtonStates() {
    const buttons = document.querySelectorAll(".button");
    if (!buttons) return;
    buttons.forEach((button)=>{
        const buttonBg = button.querySelector(".button-bg");
        const buttonLabel = button.querySelector(".button-label-inner");
        const isRounded = button.classList.contains("is-giga");
        let buttonLabelChars;
        if (buttonLabel) buttonLabelChars = new SplitType(buttonLabel, {
            types: "chars",
            tagName: "span"
        });
        if (buttonBg) {
            if (isRounded) gsap.set(buttonBg, {
                scale: 0
            });
            else gsap.set(buttonBg, {
                yPercent: 100
            });
        }
        button.addEventListener("mouseenter", ()=>{
            if (buttonBg) {
                const animation = {
                    duration: 0.3,
                    ease: "expo.out"
                };
                if (!isRounded) animation.yPercent = 0;
                else animation.scale = 1;
                gsap.to(buttonBg, animation);
            }
            if (buttonLabel && buttonLabelChars) gsap.to(buttonLabelChars.chars, {
                yPercent: -100,
                stagger: 0.01,
                duration: 0.3,
                ease: "expo.out",
                immediateRender: true
            });
            const circles = button.querySelectorAll("svg circle");
            if (circles) gsap.fromTo(button.querySelectorAll("svg circle"), {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.01,
                stagger: {
                    from: "random",
                    each: 0.1
                }
            });
        });
        button.addEventListener("mouseleave", ()=>{
            if (buttonBg) {
                const animation = {
                    duration: 0.3,
                    ease: "expo.out"
                };
                if (!isRounded) animation.yPercent = 100;
                else animation.scale = 0;
                gsap.to(buttonBg, animation);
            }
            if (buttonLabel && buttonLabelChars) gsap.set(buttonLabelChars.chars, {
                yPercent: 0
            });
        });
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gWHEb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "playVideoOnScroll", ()=>playVideoOnScroll);
parcelHelpers.export(exports, "setTransparentVideo", ()=>setTransparentVideo);
function playVideoOnScroll() {
    const videos = document.querySelectorAll("video[data-play-onscroll]");
    if (!videos) return;
    videos.forEach((video)=>{
        const start = video.dataset.start || "top bottom";
        const pauseOutside = video.dataset.pauseOutside === "true";
        const rewind = video.dataset.rewind === "true";
        const loop = video.dataset.loop === "true";
        video.pause();
        if (loop) video.loop = true;
        let settings = {
            trigger: video,
            start: start,
            onEnter: ()=>{
                video.play();
            }
        };
        if (pauseOutside) {
            settings.onLeave = ()=>{
                pauseOrRewind(video, rewind);
            };
            settings.onLeaveBack = ()=>{
                pauseOrRewind(video, rewind);
            };
            settings.onEnterBack = ()=>{
                console.log("play video");
                video.play();
            };
        } else settings.once = true;
        ScrollTrigger.create(settings);
    });
}
function pauseOrRewind(video, rewind) {
    video.pause();
    if (rewind) video.currentTime = 0;
}
// Function to check if the browser is Safari
function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function setTransparentVideo() {
    const videos = document.querySelectorAll("video.transparent-video");
    if (!videos) return;
    videos.forEach((video)=>{
        const webM = video.querySelector('source[type="video/webm"]');
        const mp4 = video.querySelector('source[type="video/mp4"]');
        let formatFound;
        if (isSafari()) {
            if (webM) webM.remove();
            mp4.src = mp4.dataset.src;
            formatFound = true;
        } else {
            if (mp4) mp4.remove();
            webM.src = webM.dataset.src;
            formatFound = true;
        }
        if (formatFound) video.load();
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"drhda":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initMenus", ()=>initMenus);
var _getHeight = require("./getHeight");
function initMenus() {
    let mm = gsap.matchMedia();
    // add a media query. When it matches, the associated function will run
    mm.add("(min-width: 992px)", ()=>{
        const nav = document.querySelector(".header .nav"), dropdowns = nav.querySelectorAll(".nav-dropdown-trigger-wrapper"), dropdownEl = nav.querySelector(".nav-dropdown-el.desktop"), dropdownInner = dropdownEl.querySelector(".nav-dropdown-el-inner");
        gsap.set(dropdownInner.querySelectorAll("[data-menu]"), {
            display: "none"
        });
        gsap.set(dropdownInner, {
            height: "0rem"
        });
        let isHover = false;
        let currentMenu;
        dropdowns.forEach((dropdown)=>{
            const id = dropdown.dataset.menu;
            const bg = dropdown.querySelector(".button-bg");
            // const iconClosed = dropdown.querySelector(".nav-dropdown-icon.closed");
            const iconOpen = dropdown.querySelector(".nav-dropdown-icon.open");
            if (!id) return;
            const dropdownChars = new SplitType(dropdown.querySelector(".button-label-inner"), {
                types: "chars",
                tagName: "span"
            });
            gsap.set(bg, {
                yPercent: 100
            });
            gsap.set(iconOpen.querySelectorAll("circle"), {
                opacity: 0
            });
            dropdown.addEventListener("mouseenter", (e)=>{
                if (currentMenu === id) return;
                if (currentMenu) {
                    const previousActiveEl = nav.querySelector(`.nav-dropdown-trigger-wrapper[data-menu="${currentMenu}"]`);
                    setOffState(previousActiveEl);
                }
                isHover = true;
                currentMenu = id;
                setOnState(dropdown);
                // Logic for dropdown menu
                const activeMenu = dropdownInner.querySelector(`[data-menu="${id}"]`);
                dropdownEl.classList.add("active");
                gsap.set(dropdownInner.querySelectorAll("[data-menu]"), {
                    display: "none"
                });
                gsap.set(activeMenu, {
                    display: "grid"
                });
                const activeHeight = (0, _getHeight.getElementHeightInRem)(activeMenu);
                gsap.to(dropdownInner, {
                    height: `${activeHeight}rem`,
                    duration: 0.3,
                    ease: "expo.out"
                });
            });
            nav.addEventListener("mouseleave", (e)=>{
                isHover = false;
                currentMenu = null;
                setAllOffStates(dropdowns);
                if (!isMouseOverElement(nav, e)) gsap.to(dropdownInner, {
                    height: `0rem`,
                    duration: 0.3,
                    ease: "expo.out",
                    onComplete: ()=>{
                        gsap.set(dropdownInner.querySelectorAll("[data-menu]"), {
                            display: "none"
                        });
                        dropdownEl.classList.remove("active");
                    }
                });
            });
        // return () => { // optional
        //   // custom cleanup code here (runs when it STOPS matching)
        // };
        });
    });
    mm.add("(max-width: 991px)", ()=>{
        const nav = document.querySelector(".header .nav"), mobileTrigger = document.querySelector(".mobile-trigger"), mobileOverlay = document.querySelector(".submenu-overlay"), dropdowns = nav.querySelectorAll(".nav-dropdown-trigger-wrapper");
        // dropdownEl = nav.querySelector(".nav-dropdown-el.desktop"),
        // dropdownInner = dropdownEl.querySelector(".nav-dropdown-el-inner");
        gsap.set(nav, {
            height: 0
        });
        gsap.set(mobileOverlay, {
            opacity: 0,
            backdropFilter: "blur(0px)"
        });
        const mobileTriggerTl = gsap.timeline({
            paused: true
        });
        mobileTriggerTl.to(mobileTrigger.querySelectorAll(".circle-menu"), {
            scale: 0,
            duration: 0.2
        }).fromTo(mobileTrigger.querySelectorAll(".circle-close"), {
            scale: 0
        }, {
            scale: 1,
            duration: 0.2
        }, 0);
        mobileTrigger.addEventListener("click", ()=>{
            if (mobileTrigger.classList.contains("active")) {
                mobileTriggerTl.reverse();
                gsap.to(nav, {
                    height: 0,
                    ease: "expo.out"
                });
                setAllDropdownOffStates(dropdowns);
                gsap.to(mobileOverlay, {
                    opacity: 0,
                    backdropFilter: "blur(0px)",
                    duration: 0.5,
                    ease: "expo.out",
                    onComplete: ()=>{
                        gsap.set(mobileOverlay, {
                            display: "none"
                        });
                    }
                });
            } else {
                mobileTriggerTl.play();
                gsap.to(nav, {
                    height: "auto",
                    ease: "expo.out"
                });
                gsap.set(mobileOverlay, {
                    display: "block"
                });
                gsap.to(mobileOverlay, {
                    opacity: 1,
                    backdropFilter: "blur(24px)",
                    duration: 0.5,
                    ease: "expo.out"
                });
            }
            mobileTrigger.classList.toggle("active");
        });
        let currentMenu;
        dropdowns.forEach((dropdown)=>{
            const id = dropdown.dataset.menu;
            const bg = dropdown.querySelector(".button-bg");
            const dropdownInner = dropdown.querySelector(".nav-dropdown-el.mobile");
            // const iconClosed = dropdown.querySelector(".nav-dropdown-icon.closed");
            const iconOpen = dropdown.querySelector(".nav-dropdown-icon.open");
            if (!id) return;
            const dropdownChars = new SplitType(dropdown.querySelector(".button-label-inner"), {
                types: "chars",
                tagName: "span"
            });
            gsap.set(bg, {
                yPercent: 100
            });
            gsap.set(iconOpen.querySelectorAll("circle"), {
                opacity: 0
            });
            dropdown.addEventListener("click", ()=>{
                if (currentMenu === id) {
                    setDropdownOffState(dropdown);
                    currentMenu = null;
                } else {
                    if (currentMenu) {
                        const previousActiveEl = nav.querySelector(`.nav-dropdown-trigger-wrapper[data-menu="${currentMenu}"]`);
                        setDropdownOffState(previousActiveEl);
                    }
                    currentMenu = id;
                    setDropdownOnState(dropdown);
                }
            });
        });
    });
// // later, if we need to revert all the animations/ScrollTriggers...
// mm.revert();
}
function isMouseOverElement(element, event) {
    // Check if the mouse is over the specified element or its descendants
    return element.contains(event.relatedTarget);
}
function setOnState(el) {
    gsap.to(el.querySelectorAll(".char"), {
        yPercent: -100,
        stagger: 0.01,
        duration: 0.3,
        ease: "expo.out",
        immediateRender: true
    });
    gsap.to(el.querySelector(".button-bg"), {
        yPercent: 0,
        duration: 0.3,
        ease: "expo.out"
    });
    gsap.to(el.querySelectorAll(".closed circle"), {
        opacity: 0,
        duration: 0.01,
        stagger: {
            each: 0.1
        }
    });
    gsap.to(el.querySelectorAll(".open circle"), {
        opacity: 1,
        duration: 0.01,
        stagger: {
            each: 0.1
        }
    });
}
function setOffState(el) {
    gsap.set(el.querySelectorAll(".char"), {
        yPercent: 0
    });
    gsap.to(el.querySelector(".button-bg"), {
        yPercent: 100,
        duration: 0.3,
        ease: "expo.out"
    });
    gsap.to(el.querySelectorAll(".closed circle"), {
        opacity: 1,
        duration: 0.01,
        stagger: {
            each: 0.1
        }
    });
    gsap.to(el.querySelectorAll(".open circle"), {
        opacity: 0,
        duration: 0.01,
        stagger: {
            each: 0.1
        }
    });
}
function setAllOffStates(dropdowns) {
    dropdowns.forEach((el)=>setOffState(el));
}
function setDropdownOffState(dropdown) {
    const dropdownInner = dropdown.querySelector(".nav-dropdown-el.mobile");
    dropdownInner.classList.remove("active");
    gsap.to(dropdownInner, {
        height: "0rem",
        duration: 0.3,
        ease: "expo.out"
    });
    setOffState(dropdown);
}
function setAllDropdownOffStates(dropdowns) {
    dropdowns.forEach((el)=>setDropdownOffState(el));
}
function setDropdownOnState(dropdown) {
    // Logic for dropdown menu
    const activeMenu = dropdown.querySelector(`[data-menu]`);
    const dropdownInner = dropdown.querySelector(".nav-dropdown-el.mobile");
    dropdownInner.classList.add("active");
    const activeHeight = (0, _getHeight.getElementHeightInRem)(activeMenu);
    gsap.to(dropdownInner, {
        height: `${activeHeight + 0.25}rem`,
        duration: 0.3,
        ease: "expo.out"
    });
    setOnState(dropdown);
}

},{"./getHeight":"1eyAq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1eyAq":[function(require,module,exports) {
/**
 * Converts a length value from any CSS unit to pixels.
 * @param {string} value - The length value as a string (e.g., "2rem", "50px").
 * @returns {number} - The length value in pixels.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Calculates the height of an element in rem units.
 * @param {HTMLElement} element - The target element.
 * @returns {number} - The height of the element in rem units.
 */ parcelHelpers.export(exports, "getElementHeightInRem", ()=>getElementHeightInRem);
function convertToPixels(value) {
    // Create a temporary element to use the browser's rendering to convert the value to pixels
    const tempElement = document.createElement("div");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.width = value;
    document.body.appendChild(tempElement);
    const pixelValue = parseFloat(window.getComputedStyle(tempElement).width);
    document.body.removeChild(tempElement);
    return pixelValue;
}
function getElementHeightInRem(element) {
    if (!element) throw new Error("Element is required");
    // Get the computed style of the element
    const computedStyle = window.getComputedStyle(element);
    // Get the height of the element in pixels
    const heightInPixels = parseFloat(computedStyle.height);
    // Get the font size of the root element (html) in rem units and convert it to pixels
    const rootFontSizeInRem = window.getComputedStyle(document.documentElement).fontSize;
    const rootFontSizeInPixels = convertToPixels(rootFontSizeInRem);
    // Calculate height in rem units
    const heightInRem = heightInPixels / rootFontSizeInPixels;
    return heightInRem;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4hIA7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setImageMasks", ()=>setImageMasks);
function setImageMasks() {
    const imageMasks = document.querySelectorAll(".image-mask");
    if (!imageMasks) return;
    imageMasks.forEach((el)=>{
        if (el.classList.contains("diamond")) setDiamondMask(el);
        if (el.classList.contains("hexagon")) setHexagonMask(el);
        if (el.classList.contains("bubbles")) setBubblesMask(el);
    });
}
function setDiamondMask(el) {
    const start = el.dataset.startPos || "center bottom";
    gsap.set(el, {
        clipPath: "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)"
    });
    gsap.timeline({
        scrollTrigger: {
            trigger: el,
            scrub: true,
            start,
            once: true,
            onEnter: ()=>{
                gsap.fromTo(el, {
                    clipPath: "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)"
                }, {
                    clipPath: "polygon(100% 0%, 60% 0%, 0% 60%, 0% 100%, 40% 100%, 100% 40%)",
                    duration: 1,
                    ease: "expo.out"
                });
            }
        }
    });
}
function setHexagonMask(el) {
    const start = el.dataset.startPos || "center bottom";
    gsap.set(el, {
        clipPath: "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)"
    });
    gsap.timeline({
        scrollTrigger: {
            trigger: el,
            scrub: true,
            start,
            once: true,
            onEnter: ()=>{
                gsap.fromTo(el, {
                    clipPath: "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)"
                }, {
                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                    duration: 1,
                    ease: "expo.out"
                });
            }
        }
    });
}
function setBubblesMask(el) {
    const start = el.dataset.startPos || "center bottom";
    const mask = el.querySelector(".svg-mask");
    const maskId = "mask-" + Math.random().toString(36).substr(2, 9);
    console.log(mask, mask.querySelector("mask"));
    mask.querySelector("clipPath").id = maskId;
    el.style.clipPath = `url(#${maskId})`;
    const path = mask.querySelector("path");
    gsap.set(path, {
        d: "M1,0.501 C1,0.777,0.776,1,0.5,1 C0.224,1,0,0.777,0,0.501 C0,0.225,0.224,0.001,0.5,0.001 C0.617,0.001,0.725,0.041,0.81,0.109 C0.834,0.126,0.855,0.147,0.874,0.17 C0.953,0.258,1,0.374,1,0.501"
    });
    gsap.timeline({
        scrollTrigger: {
            trigger: el,
            scrub: true,
            start,
            once: true,
            onEnter: ()=>{
                gsap.fromTo(path, {
                    d: "M1,0.501 C1,0.777,0.776,1,0.5,1 C0.224,1,0,0.777,0,0.501 C0,0.225,0.224,0.001,0.5,0.001 C0.617,0.001,0.725,0.041,0.81,0.109 C0.834,0.126,0.855,0.147,0.874,0.17 C0.953,0.258,1,0.374,1,0.501"
                }, {
                    d: "M0.957,0.212 C0.957,0.299,0.899,0.373,0.814,0.406 C0.826,0.436,0.832,0.468,0.832,0.501 C0.832,0.533,0.826,0.563,0.816,0.592 C0.826,0.59,0.837,0.589,0.847,0.589 C0.932,0.589,1,0.649,1,0.723 C1,0.797,0.932,0.858,0.847,0.858 C0.769,0.858,0.705,0.806,0.696,0.739 C0.64,0.775,0.572,0.796,0.498,0.796 C0.479,0.796,0.46,0.795,0.441,0.792 C0.443,0.802,0.444,0.812,0.444,0.823 C0.444,0.921,0.354,1,0.243,1 C0.131,1,0.041,0.921,0.041,0.823 C0.041,0.735,0.113,0.663,0.207,0.648 C0.179,0.605,0.163,0.555,0.163,0.501 C0.163,0.466,0.171,0.431,0.184,0.399 C0.177,0.4,0.17,0.401,0.163,0.401 C0.073,0.401,0,0.336,0,0.257 C0,0.177,0.073,0.113,0.163,0.113 C0.25,0.113,0.321,0.173,0.326,0.248 C0.37,0.225,0.421,0.21,0.475,0.207 C0.478,0.092,0.585,0,0.716,0 C0.849,0,0.957,0.095,0.957,0.212",
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "expo.out"
                });
            }
        }
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aJF8f":[function(require,module,exports) {
// Link timelines to scroll position
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setStaggerElements", ()=>setStaggerElements);
function createScrollList(triggerElement, elements, start, stagger, delay) {
    gsap.set(elements, {
        yPercent: 100,
        opacity: 0
    });
    gsap.timeline({
        scrollTrigger: {
            trigger: triggerElement,
            scrub: true,
            start,
            onEnter: ()=>{
                gsap.to(elements, {
                    yPercent: 0,
                    opacity: 1,
                    stagger,
                    ease: "power4.out",
                    delay: Number(delay)
                });
            }
        }
    });
}
function setStaggerElements() {
    const list = document.querySelectorAll("[stagger-list]");
    if (!list) return;
    list.forEach((el)=>{
        const elements = el.querySelectorAll("[stagger-el]"), startVal = el.dataset.startPos || "top top", stagger = el.dataset.stagger || 0.05, delay = el.dataset.delay || 0;
        if (!elements) return;
        createScrollList(el, elements, startVal, stagger, delay);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["7vXoQ","9qcUd"], "9qcUd", "parcelRequire5744")

//# sourceMappingURL=globals.js.map
