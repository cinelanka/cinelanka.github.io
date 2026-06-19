// cinelanka-bg-video.js
// 100% SAFE / ADDITIVE. Does NOT touch, edit, or delete index.html.
// Adds a cinematic film-reel-style background video, fixed behind all
// page content, with balanced overlay so movies stay clearly visible.

(function () {
  function safe(fn, label) {
    try { fn(); } catch (e) { console.error("cinelanka-bg-video [" + label + "]:", e); }
  }

  var YOUTUBE_VIDEO_ID = "f_7JcXeQOdM"; // Creative Commons film reel loop

  function injectBackgroundVideo() {
    if (document.getElementById("cl-bg-video-wrap")) return;

    var wrap = document.createElement("div");
    wrap.id = "cl-bg-video-wrap";
    wrap.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;" +
      "z-index:-1;overflow:hidden;pointer-events:none;background:#09090b;";

    var clipper = document.createElement("div");
    clipper.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none;";

    var iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube.com/embed/" + YOUTUBE_VIDEO_ID +
      "?autoplay=1&mute=1&loop=1&playlist=" + YOUTUBE_VIDEO_ID +
      "&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1";
    iframe.title = "Background";
    iframe.setAttribute("allow", "autoplay; encrypted-media");
    iframe.setAttribute("tabindex", "-1");
    iframe.style.cssText =
      "position:absolute;top:50%;left:50%;" +
      "width:100vw;height:177.78vw;min-height:100vh;min-width:177.78vh;" +
      "transform:translate(-50%,-50%) scale(1.3);border:none;pointer-events:none;";

    var overlay = document.createElement("div");
    overlay.style.cssText =
      "position:absolute;inset:0;" +
      "background:linear-gradient(180deg,rgba(9,9,11,0.55) 0%,rgba(9,9,11,0.6) 50%,rgba(9,9,11,0.75) 100%);";

    var clickBlocker = document.createElement("div");
    clickBlocker.style.cssText = "position:absolute;inset:0;z-index:5;background:transparent;";

    clipper.appendChild(iframe);
    wrap.appendChild(clipper);
    wrap.appendChild(overlay);
    wrap.appendChild(clickBlocker);
    document.body.appendChild(wrap);

    document.body.style.background = "transparent";
  }

  // Also make the main content containers' solid backgrounds slightly
  // transparent so the video shows through site sections too, not just
  // the very edges. This only adjusts inline style (a visual tweak),
  // never removes or restructures any element.
  function makeMainBgTransparent() {
    var bgEl = document.querySelector(".navbar");
    if (bgEl && bgEl.getAttribute("data-bg-tweaked") !== "1") {
      bgEl.setAttribute("data-bg-tweaked", "1");
      bgEl.style.background = "rgba(9,9,11,0.7)";
    }
  }

  function start() {
    safe(injectBackgroundVideo, "inject-video");
    setInterval(function () { safe(makeMainBgTransparent, "navbar-bg"); }, 1500);
  }

  if (document.readyState === "complete") {
    setTimeout(start, 800);
  } else {
    window.addEventListener("load", function () { setTimeout(start, 800); });
  }
})();